import { CONFIG } from '../config/env.js';
import { RAG_SYSTEM_PROMPT, determineAction, getFallbackRAGResponse } from './ragKnowledge.js';
import type { ChatMessage } from '../types/index.js';

interface KeyHealthState {
  key: string;
  preview: string;
  cooldownUntil: number;
  consecutiveFailures: number;
  isPermanentlyDown: boolean;
  lastErrorReason?: string;
}

const maskKey = (key: string): string => {
  if (!key || key.length < 8) return '****';
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
};

const discoverApiKeys = (): string[] => {
  const keys: string[] = [];

  const rawMulti = CONFIG.GEMINI_API_KEYS;
  if (typeof rawMulti === 'string' && rawMulti.trim().length > 0) {
    rawMulti
      .split(/[,\n\r\s]+/)
      .map((k) => k.trim())
      .filter((k) => k.length > 10 && !k.includes('your_gemini_api_key'))
      .forEach((k) => keys.push(k));
  }

  const rawSingle = CONFIG.GEMINI_API_KEY;
  if (typeof rawSingle === 'string' && rawSingle.trim().length > 0) {
    const trimmed = rawSingle.trim();
    if (trimmed.length > 10 && !trimmed.includes('your_gemini_api_key')) {
      keys.push(trimmed);
    }
  }

  for (let i = 1; i <= 10; i++) {
    const val = process.env[`GEMINI_API_KEY_${i}`] || process.env[`VITE_GEMINI_API_KEY_${i}`];
    if (typeof val === 'string' && val.trim().length > 0) {
      const trimmed = val.trim();
      if (trimmed.length > 10 && !trimmed.includes('your_gemini_api_key')) {
        keys.push(trimmed);
      }
    }
  }

  return Array.from(new Set(keys));
};

export class KeyRotationManager {
  private keyStates: KeyHealthState[] = [];
  private activeIndex: number = 0;

  constructor() {
    this.initPool();
  }

  public initPool() {
    const rawKeys = discoverApiKeys();
    this.keyStates = rawKeys.map((key) => ({
      key,
      preview: maskKey(key),
      cooldownUntil: 0,
      consecutiveFailures: 0,
      isPermanentlyDown: false
    }));

    if (this.keyStates.length > 0) {
      console.log(
        `[Backend AI Rotator] Initialized pool with ${this.keyStates.length} keys. Active key: [${this.activeIndex + 1}/${this.keyStates.length}] (${this.keyStates[this.activeIndex].preview})`
      );
    } else {
      console.log('[Backend AI Rotator] No Gemini API keys found. Server will operate in resilient RAG mode.');
    }
  }

  public getPoolSize(): number {
    return this.keyStates.length;
  }

  public getExecutableKeyQueue(): KeyHealthState[] {
    if (this.keyStates.length === 0) return [];

    const now = Date.now();
    let candidates = this.keyStates.filter((k) => !k.isPermanentlyDown);
    if (candidates.length === 0) {
      this.keyStates.forEach((k) => {
        k.isPermanentlyDown = false;
        k.cooldownUntil = 0;
      });
      candidates = [...this.keyStates];
    }

    const ready: KeyHealthState[] = [];
    const coolingDown: KeyHealthState[] = [];

    for (let i = 0; i < candidates.length; i++) {
      const idx = (this.activeIndex + i) % candidates.length;
      const item = candidates[idx];
      if (item.cooldownUntil <= now) {
        ready.push(item);
      } else {
        coolingDown.push(item);
      }
    }

    coolingDown.sort((a, b) => a.cooldownUntil - b.cooldownUntil);
    return [...ready, ...coolingDown];
  }

  public recordSuccess(key: string) {
    const item = this.keyStates.find((k) => k.key === key);
    if (!item) return;

    item.consecutiveFailures = 0;
    item.cooldownUntil = 0;
    item.isPermanentlyDown = false;
    item.lastErrorReason = undefined;

    const idx = this.keyStates.indexOf(item);
    this.activeIndex = (idx + 1) % this.keyStates.length;

    console.log(
      `[Backend AI Rotator] ✅ Succeeded with key [${idx + 1}/${this.keyStates.length}]. Rotated pointer to [${this.activeIndex + 1}/${this.keyStates.length}].`
    );
  }

  public recordFailure(key: string, statusCode?: number, errorDetails?: string) {
    const item = this.keyStates.find((k) => k.key === key);
    if (!item) return;

    item.consecutiveFailures += 1;
    item.lastErrorReason = errorDetails || `HTTP ${statusCode || 'Network Error'}`;
    const now = Date.now();
    const idx = this.keyStates.indexOf(item);

    let cooldownSec = 45;
    let reason = 'unknown';

    if (statusCode === 429) {
      cooldownSec = 60;
      reason = 'Rate limit (429 RESOURCE_EXHAUSTED)';
      item.cooldownUntil = now + cooldownSec * 1000;
    } else if (statusCode === 503 || statusCode === 502 || statusCode === 504 || statusCode === 500) {
      cooldownSec = 30;
      reason = `Server overload (${statusCode} UNAVAILABLE)`;
      item.cooldownUntil = now + cooldownSec * 1000;
    } else if (statusCode === 400 || statusCode === 401) {
      reason = `Invalid key (${statusCode})`;
      item.isPermanentlyDown = true;
      item.cooldownUntil = now + 3600 * 1000;
    } else if (statusCode === 403) {
      cooldownSec = 120;
      reason = 'Forbidden/Quota exhausted (403)';
      item.cooldownUntil = now + cooldownSec * 1000;
    } else {
      cooldownSec = 20;
      reason = 'Network/timeout failure';
      item.cooldownUntil = now + cooldownSec * 1000;
    }

    this.activeIndex = (idx + 1) % this.keyStates.length;

    console.warn(
      `[Backend AI Rotator] ⚠️ Key [${idx + 1}/${this.keyStates.length}] (${item.preview}) DOWN: ${reason}. Cooldown: ${cooldownSec}s. Switching to key [${this.activeIndex + 1}/${this.keyStates.length}]...`
    );
  }

  public getStats() {
    const now = Date.now();
    return {
      totalKeys: this.keyStates.length,
      activeIndex: this.activeIndex,
      healthyKeys: this.keyStates.filter((k) => !k.isPermanentlyDown && k.cooldownUntil <= now).length,
      coolingDownKeys: this.keyStates.filter((k) => !k.isPermanentlyDown && k.cooldownUntil > now).length,
      disabledKeys: this.keyStates.filter((k) => k.isPermanentlyDown).length
    };
  }
}

export const keyRotator = new KeyRotationManager();

export const generateAiChatResponse = async (
  query: string,
  history: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<{ text: string; action?: ChatMessage['action']; source: 'gemini' | 'rag' }> => {
  const keyQueue = keyRotator.getExecutableKeyQueue();

  if (keyQueue.length === 0) {
    const fallback = getFallbackRAGResponse(query);
    return { ...fallback, source: 'rag' };
  }

  const candidateModels = [
    CONFIG.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest'
  ].filter((val, idx, arr) => val && arr.indexOf(val) === idx);

  const contents: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = [];
  const validHistory = history
    .slice(-8)
    .filter((msg) => msg.text && msg.text.trim().length > 0);

  for (const msg of validHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: query }]
  });

  const requestBody = {
    systemInstruction: {
      parts: [{ text: RAG_SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 700,
      topP: 0.95
    }
  };

  for (let kIdx = 0; kIdx < keyQueue.length; kIdx++) {
    const keyItem = keyQueue[kIdx];
    const key = keyItem.key;
    let keySucceeded = false;
    let lastStatusCode: number | undefined;
    let lastErrorDetails: string | undefined;

    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const model = candidateModels[mIdx];
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = (await response.json()) as any;
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (replyText) {
            keyRotator.recordSuccess(key);
            const action = determineAction(query, replyText);
            return { text: replyText, action, source: 'gemini' };
          }
        }

        const errorText = await response.text();
        lastStatusCode = response.status;
        lastErrorDetails = errorText;

        // If the model is 404 deprecated or 503 high demand, try the next model on the same key
        if (response.status === 404 || response.status === 503) {
          console.warn(`[Backend AI Rotator] Model ${model} returned HTTP ${response.status} on key. Trying next candidate model on same key...`);
          continue;
        }

        // Auth errors (invalid key) shouldn't waste time on other models
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          break;
        }
      } catch (networkErr: unknown) {
        clearTimeout(timeoutId);
        const errMsg = networkErr instanceof Error ? networkErr.message : String(networkErr);
        lastStatusCode = 0;
        lastErrorDetails = errMsg;
        // Network timeout on this model - try next model or break to next key
        continue;
      }
    }

    if (!keySucceeded) {
      keyRotator.recordFailure(key, lastStatusCode, lastErrorDetails);
    }
  }

  console.warn('[Backend AI Rotator] All Gemini attempts exhausted. Falling back to semantic RAG knowledge base.');
  const fallback = getFallbackRAGResponse(query);
  return { ...fallback, source: 'rag' };
};
