import {
  PERSONAL_INFO,
  SKILLS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  TESTIMONIALS_DATA
} from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    type: 'download_cv' | 'open_resume' | 'whatsapp' | 'email' | 'navigate_section' | 'navigate_project';
    label: string;
    target?: string;
  };
}

interface KeyHealthState {
  key: string;
  preview: string;
  cooldownUntil: number;
  consecutiveFailures: number;
  isPermanentlyDown: boolean;
  lastErrorReason?: string;
}

/**
 * Mask key for secure logging in client console
 */
const maskKey = (key: string): string => {
  if (!key || key.length < 8) return '****';
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
};

/**
 * Auto-discover Gemini API keys from all supported environment variable formats:
 * - VITE_GEMINI_API_KEYS (comma, space, or newline-separated)
 * - VITE_GEMINI_API_KEY (single key)
 * - VITE_GEMINI_API_KEY_1 through VITE_GEMINI_API_KEY_10 (numbered keys)
 */
const discoverApiKeys = (): string[] => {
  const keys: string[] = [];

  // 1. Multi-key comma/newline/space separated string
  const rawMulti = import.meta.env.VITE_GEMINI_API_KEYS;
  if (typeof rawMulti === 'string' && rawMulti.trim().length > 0) {
    rawMulti
      .split(/[,\n\r\s]+/)
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 10 && !k.includes('your_gemini_api_key'))
      .forEach((k: string) => keys.push(k));
  }

  // 2. Single key
  const rawSingle = import.meta.env.VITE_GEMINI_API_KEY;
  if (typeof rawSingle === 'string' && rawSingle.trim().length > 0) {
    const trimmed = rawSingle.trim();
    if (trimmed.length > 10 && !trimmed.includes('your_gemini_api_key')) {
      keys.push(trimmed);
    }
  }

  // 3. Numbered keys (VITE_GEMINI_API_KEY_1 .. 10)
  for (let i = 1; i <= 10; i++) {
    const val = (import.meta.env as Record<string, string | undefined>)[`VITE_GEMINI_API_KEY_${i}`];
    if (typeof val === 'string' && val.trim().length > 0) {
      const trimmed = val.trim();
      if (trimmed.length > 10 && !trimmed.includes('your_gemini_api_key')) {
        keys.push(trimmed);
      }
    }
  }

  // Deduplicate keys while preserving order
  return Array.from(new Set(keys));
};

/**
 * Intelligent Key Rotation & Automatic Failover Circuit Breaker
 * Automatically rotates keys on success (load balancing) and
 * immediately switches to the next healthy key when one is down (failover).
 */
class KeyRotationManager {
  private keyStates: KeyHealthState[] = [];
  private activeIndex: number = 0;
  private readonly STORAGE_INDEX_KEY = 'peter_portfolio_gemini_key_index';

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

    // Restore previously working key index from sessionStorage if valid
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const saved = sessionStorage.getItem(this.STORAGE_INDEX_KEY);
        if (saved !== null) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed < this.keyStates.length) {
            this.activeIndex = parsed;
          }
        }
      }
    } catch {
      // sessionStorage unavailable
    }

    if (this.keyStates.length > 0) {
      console.log(
        `[AI Key Rotator] Initialized pool with ${this.keyStates.length} keys. Active starting key: [${this.activeIndex + 1}/${this.keyStates.length}] (${this.keyStates[this.activeIndex].preview})`
      );
    }
  }

  public getPoolSize(): number {
    return this.keyStates.length;
  }

  /**
   * Returns keys ordered starting from the current active key,
   * prioritizing healthy keys and automatically falling through to the rest.
   */
  public getExecutableKeyQueue(): KeyHealthState[] {
    if (this.keyStates.length === 0) return [];

    const now = Date.now();
    // Exclude permanently disabled keys unless ALL keys were disabled
    let candidates = this.keyStates.filter((k) => !k.isPermanentlyDown);
    if (candidates.length === 0) {
      // Emergency unblock in case keys recovered
      this.keyStates.forEach((k) => {
        k.isPermanentlyDown = false;
        k.cooldownUntil = 0;
      });
      candidates = [...this.keyStates];
    }

    // Partition into immediately ready vs currently on cooldown
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

    // Sort cooling-down keys by earliest cooldown expiration
    coolingDown.sort((a, b) => a.cooldownUntil - b.cooldownUntil);

    return [...ready, ...coolingDown];
  }

  /**
   * Called when a key successfully completes an API request.
   * Clears failure state and advances the active pointer to balance the load.
   */
  public recordSuccess(key: string) {
    const item = this.keyStates.find((k) => k.key === key);
    if (!item) return;

    item.consecutiveFailures = 0;
    item.cooldownUntil = 0;
    item.isPermanentlyDown = false;
    item.lastErrorReason = undefined;

    const idx = this.keyStates.indexOf(item);
    // Advance active key index to the next key to distribute load
    const nextIndex = (idx + 1) % this.keyStates.length;
    this.setActiveIndex(nextIndex);

    console.log(
      `[AI Key Rotator] ✅ Succeeded with key [${idx + 1}/${this.keyStates.length}] (${item.preview}). Auto-rotated to key [${nextIndex + 1}/${this.keyStates.length}].`
    );
  }

  /**
   * Called when an API request fails on a key.
   * Immediately puts the key on cooldown and advances active pointer to the next key.
   */
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
      // Rate limit / Quota exceeded for this minute
      cooldownSec = 90;
      reason = 'Rate limit (429 RESOURCE_EXHAUSTED)';
      item.cooldownUntil = now + cooldownSec * 1000;
    } else if (statusCode === 503 || statusCode === 502 || statusCode === 504 || statusCode === 500) {
      // Server high demand or temporary overload
      cooldownSec = 45;
      reason = `Server overload (${statusCode} UNAVAILABLE)`;
      item.cooldownUntil = now + cooldownSec * 1000;
    } else if (statusCode === 400 || statusCode === 401) {
      // Invalid API key
      reason = `Invalid key (${statusCode})`;
      item.isPermanentlyDown = true;
      item.cooldownUntil = now + 3600 * 1000;
    } else if (statusCode === 403) {
      // Forbidden / Project quota blocked
      cooldownSec = 180;
      reason = 'Forbidden/Quota exhausted (403)';
      item.cooldownUntil = now + cooldownSec * 1000;
    } else {
      // Network timeout / connection drop
      cooldownSec = 30;
      reason = 'Network/timeout failure';
      item.cooldownUntil = now + cooldownSec * 1000;
    }

    // Immediately advance activeIndex so next request starts with the next key
    const nextIndex = (idx + 1) % this.keyStates.length;
    this.setActiveIndex(nextIndex);

    console.warn(
      `[AI Key Rotator] ⚠️ Key [${idx + 1}/${this.keyStates.length}] (${item.preview}) is DOWN: ${reason}. Cooldown: ${cooldownSec}s. Auto-switching to key [${nextIndex + 1}/${this.keyStates.length}]...`
    );
  }

  private setActiveIndex(index: number) {
    this.activeIndex = index;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(this.STORAGE_INDEX_KEY, String(index));
      }
    } catch {
      // ignore
    }
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

// Global singleton instance for key rotation
export const keyRotator = new KeyRotationManager();

// Complete RAG Context compiled from verified portfolio data
const RAG_SYSTEM_PROMPT = `You are the official AI Representative and Virtual Assistant for Peter Kiplagat Misik.
Your role is to represent Peter professionally, accurately, and enthusiastically to recruiters, clients, university peers, and collaborators.

PROFILE & VERIFIED BACKGROUND:
- Name: ${PERSONAL_INFO.name}
- Profession: Information Technology Student | Software Developer | Network Engineer
- Current Education: ${EDUCATION_DATA.degree} (${EDUCATION_DATA.status}) at ${EDUCATION_DATA.institution} (2023 – Present).
- Specialization: ${EDUCATION_DATA.specialization}
- Relevant Coursework: ${EDUCATION_DATA.coursework.join(", ")}
- Location: ${PERSONAL_INFO.location} (East Africa Time, UTC+3)
- Email: ${PERSONAL_INFO.email}
- Phone: ${PERSONAL_INFO.phone} (Formatted: ${PERSONAL_INFO.phoneFormatted})
- WhatsApp: ${PERSONAL_INFO.whatsappUrl} (Number: ${PERSONAL_INFO.phone})
- Availability: ${PERSONAL_INFO.availability}

INDUSTRIAL ATTACHMENT EXPERIENCE:
- Institution: Emgwen Technical Training Institute (EmgTTI)
- Supervisor: Madam Elizabeth Tum (Head of ICT & Attachment Supervisor)
- Role: ICT Industrial Attachment (Attaché)
- Responsibilities: Computer assembly, OS installation, hardware troubleshooting, preventative maintenance; network topology simulation and design in Cisco Packet Tracer; training diploma and certificate students on Cisco Packet Tracer, Microsoft Office, and programming fundamentals; LAN troubleshooting and network maintenance.
- Endorsement by Madam Elizabeth Tum: "${TESTIMONIALS_DATA[0].content}"

TECHNICAL SKILLS:
- Programming Languages: ${SKILLS_DATA.filter((s) => s.category === 'programming').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Frontend Development: ${SKILLS_DATA.filter((s) => s.category === 'frontend').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Backend Development: ${SKILLS_DATA.filter((s) => s.category === 'backend').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Databases: ${SKILLS_DATA.filter((s) => s.category === 'databases').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Networking & Infrastructure: ${SKILLS_DATA.filter((s) => s.category === 'networking').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- DevOps & Tools: ${SKILLS_DATA.filter((s) => s.category === 'tools').map((s) => `${s.name} (${s.level}%)`).join(", ")}

KEY PROJECTS:
1. TSafari Transport Management System: Real-time passenger booking and fleet coordination. Stack: Django, PostgreSQL, Tailwind CSS, Channels (WebSockets), Safaricom Daraja M-Pesa STK Push API.
2. EVERGREEN Agrovet Management System: Inventory control, veterinary pharmaceutical batch expiration tracking, and POS sales. Stack: React, Node.js, Express, PostgreSQL.
3. School Enterprise Network Design: Comprehensive multi-building campus network with departmental VLAN segmentation, Router-on-a-Stick (802.1Q encapsulation), Access Control Lists (ACLs), DHCP routing, and redundant spanning tree. Stack: Cisco Packet Tracer.
4. E-Football Tournament Management System: Esports competition platform with automated bracket seeding, screenshot score verification, and live leaderboards. Stack: React, Node.js, PostgreSQL.

CERTIFICATIONS:
${CERTIFICATIONS_DATA.map((c) => `- ${c.title} by ${c.issuer} (${c.year})`).join("\n")}

GUIDELINES FOR RESPONSES:
1. Always respond directly and specifically to the client's request or inquiry. Never reply with generic repetitive statements.
2. Maintain a polite, confident, articulate, and professional tone on Peter Kiplagat Misik's behalf.
3. Reference specific details, numbers, tech stacks, or accomplishments that match what the client is asking.
4. If asked about contacts or WhatsApp, explicitly provide his phone number (0743329366) and mention WhatsApp availability.
5. If asked about his attachment or Madam Elizabeth Tum, highlight her strong recommendation and his hands-on work at EmgTTI.
6. If asked for his resume/CV, let the user know they can download it or preview it directly in the app.
7. Format your response cleanly with concise paragraphs and markdown bullet points where appropriate.`;

// Determine dynamic action button based on user query & AI response
const determineAction = (query: string, responseText: string): ChatMessage['action'] | undefined => {
  const q = query.toLowerCase();
  const r = responseText.toLowerCase();

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum vitae') || q.includes('download') || r.includes('curriculum vitae') || r.includes('download cv') || r.includes('resume')) {
    return {
      type: 'download_cv',
      label: 'Download CV (PDF)',
      target: PERSONAL_INFO.cvPath
    };
  }

  if (q.includes('whatsapp') || q.includes('chat') || q.includes('text') || q.includes('0743329366') || r.includes('whatsapp') || q.includes('call') || q.includes('reach') || q.includes('hire') || q.includes('contact')) {
    return {
      type: 'whatsapp',
      label: 'Chat on WhatsApp (0743329366)',
      target: PERSONAL_INFO.whatsappUrl
    };
  }

  if (q.includes('tsafari') || r.includes('tsafari')) {
    return {
      type: 'navigate_project',
      label: 'View TSafari Case Study',
      target: '/project/tsafari-transport'
    };
  }

  if (q.includes('agrovet') || q.includes('evergreen') || r.includes('evergreen')) {
    return {
      type: 'navigate_project',
      label: 'View Agrovet Case Study',
      target: '/project/evergreen-agrovet'
    };
  }

  if (q.includes('network') || q.includes('cisco') || q.includes('packet tracer') || q.includes('vlan')) {
    return {
      type: 'navigate_project',
      label: 'View Network Design Case Study',
      target: '/project/school-network-design'
    };
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
    return {
      type: 'navigate_section',
      label: 'Explore Projects Section',
      target: '#projects'
    };
  }

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech') || q.includes('experience')) {
    return {
      type: 'navigate_section',
      label: 'View Interactive Skills Grid',
      target: '#skills'
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('tum') || q.includes('supervisor')) {
    return {
      type: 'navigate_section',
      label: 'View EmgTTI Experience',
      target: '#experience'
    };
  }

  return {
    type: 'open_resume',
    label: 'Preview Peter\'s Resume'
  };
};

/**
 * Generate AI Response using Google Gemini API with automatic key rotation,
 * dynamic failover when a key is down, and resilient local RAG fallback.
 */
export const generateAiResponse = async (
  query: string,
  history: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const keyQueue = keyRotator.getExecutableKeyQueue();

  // If no API keys are configured, seamlessly answer using rich offline RAG
  if (keyQueue.length === 0) {
    console.info('[AI Assistant] No Gemini API keys configured in environment. Using local RAG knowledge base.');
    return getFallbackRAGResponse(query);
  }

  const primaryModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const candidateModels = [
    primaryModel,
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest'
  ].filter((val, idx, arr) => arr.indexOf(val) === idx);

  // Construct Gemini conversation payload with history & RAG instructions
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
      temperature: 0.5,
      maxOutputTokens: 600,
      topP: 0.95
    }
  };

  let lastError: unknown = null;

  // Attempt requests across the pool of API keys (instant auto-failover when one is down)
  for (let kIdx = 0; kIdx < keyQueue.length; kIdx++) {
    const keyItem = keyQueue[kIdx];
    const key = keyItem.key;
    let switchedKey = false;

    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const model = candidateModels[mIdx];
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

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
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (replyText) {
            // Success! Record healthy state and advance active key for load distribution
            keyRotator.recordSuccess(key);
            const action = determineAction(query, replyText);
            return { text: replyText, action };
          }
        }

        const errorText = await response.text();
        lastError = new Error(`HTTP ${response.status}: ${errorText}`);

        // If the model itself was not found (404), try the next candidate model on the same key
        if (response.status === 404) {
          console.warn(`[AI Key Rotator] Model ${model} not available on key ${keyItem.preview}. Trying next model...`);
          continue;
        }

        // For rate-limit (429), high demand / server overload (503, 500, 502), or auth error (400, 401, 403):
        // Mark this key down and immediately switch to the next key in the pool!
        keyRotator.recordFailure(key, response.status, errorText);
        switchedKey = true;
        break; // break candidate models loop to try next key immediately
      } catch (networkErr: unknown) {
        clearTimeout(timeoutId);
        const errMsg = networkErr instanceof Error ? networkErr.message : String(networkErr);
        console.warn(`[AI Key Rotator] Request error on key ${keyItem.preview} with model ${model}: ${errMsg}`);
        lastError = networkErr;

        // If network error or timeout, record failure and auto-switch to next key
        keyRotator.recordFailure(key, 0, errMsg);
        switchedKey = true;
        break; // break candidate models loop to try next key immediately
      }
    }

    if (switchedKey) {
      // The current key failed and was marked down; loop automatically continues to keyQueue[kIdx + 1]
      continue;
    }
  }

  console.warn(
    `[AI Key Rotator] All ${keyQueue.length} API keys are currently down or experiencing temporary high demand. Seamlessly answering via local RAG knowledge base.`,
    lastError
  );
  return getFallbackRAGResponse(query);
};

// Resilient local RAG fallback in case of offline mode or temporary network disconnect
const getFallbackRAGResponse = async (query: string): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const q = query.toLowerCase().trim();
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum') || q.includes('download')) {
    return {
      text: `You can view or download Peter Kiplagat Misik's complete Curriculum Vitae directly. It details his BSc in Information Technology from Taita Taveta University, hands-on ICT attachment at EmgTTI, software engineering projects, and Cisco certifications.`,
      action: {
        type: 'download_cv',
        label: 'Download CV (PDF)',
        target: PERSONAL_INFO.cvPath
      }
    };
  }

  if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('reach') || q.includes('contact') || q.includes('email')) {
    return {
      text: `You can reach Peter directly on WhatsApp or phone at **${PERSONAL_INFO.phone}** (${PERSONAL_INFO.phoneFormatted}) or via email at **${PERSONAL_INFO.email}**. He responds promptly to inquiries regarding software development, networking contracts, and attachment opportunities.`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('emgwen') || q.includes('tum') || q.includes('elizabeth') || q.includes('experience')) {
    return {
      text: `Peter completed his ICT Industrial Attachment at **Emgwen Technical Training Institute (EmgTTI)** under the supervision of **Madam Elizabeth Tum (Head of ICT)**.

His core responsibilities included:
• Computer assembly, workstation setup, and hardware troubleshooting
• Network design and cabling implementation using Cisco Packet Tracer
• Instructing diploma students on networking fundamentals, topologies, and office productivity tools
• Diagnosing and resolving LAN bottlenecks for administrative offices

Madam Elizabeth Tum commended Peter for his reliability, technical competence, and patience in mentoring students!`,
      action: {
        type: 'navigate_section',
        label: 'View Experience Timeline',
        target: '#experience'
      }
    };
  }

  if (q.includes('tsafari') || (q.includes('transport') && q.includes('booking'))) {
    return {
      text: `**TSafari Transport Management System** is a real-time booking and fleet coordination platform engineered by Peter Kiplagat Misik.

Key technical highlights:
• **Backend**: Django with Django Channels (WebSockets) for real-time seat locks and fleet tracking
• **Mobile Payments**: Safaricom Daraja M-Pesa STK Push API integration with automated callback reconciliation
• **Database**: PostgreSQL with transactional concurrency control
• **Frontend**: Modern responsive UI styled with Tailwind CSS`,
      action: {
        type: 'navigate_project',
        label: 'View TSafari Case Study',
        target: '/project/tsafari-transport'
      }
    };
  }

  if (q.includes('agrovet') || q.includes('evergreen') || q.includes('pos') || q.includes('inventory')) {
    return {
      text: `**EVERGREEN Agrovet Management System** is a point-of-sale and inventory control suite developed for agricultural and veterinary retail.

Key capabilities:
• Real-time stock deductions and automated expiry notifications for pharmaceuticals
• Barcode scanning and batch tracking
• Daily profit/loss ledger generation and sales reconciliation
• Built using React, Node.js, Express, and PostgreSQL`,
      action: {
        type: 'navigate_project',
        label: 'View Agrovet Case Study',
        target: '/project/evergreen-agrovet'
      }
    };
  }

  if (q.includes('network') || q.includes('cisco') || q.includes('vlan') || q.includes('router') || q.includes('packet tracer') || q.includes('acl')) {
    return {
      text: `Peter has in-depth expertise in **Cisco Network Engineering and Simulation**:
• Multi-building enterprise network design with departmental VLAN segmentation
• Inter-VLAN routing via Router-on-a-Stick (802.1Q encapsulation)
• Access Control Lists (Standard & Extended ACLs) for traffic filtering and security
• Spanning Tree Protocol (STP) redundancy, DHCP pools, and subnetting across Class A/B/C networks`,
      action: {
        type: 'navigate_project',
        label: 'View Network Design Case Study',
        target: '/project/school-network-design'
      }
    };
  }

  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work')) {
    return {
      text: `Peter has built several production-grade projects spanning full-stack development and networking:
1. **TSafari Transport Management**: Real-time booking, driver dashboards, Django Channels WebSockets, and M-Pesa Daraja API.
2. **EVERGREEN Agrovet POS Suite**: Inventory tracking, batch expiry warnings, and POS sales in React & Node.js.
3. **School Enterprise Network Design**: Multi-department VLAN segmentation and routing in Cisco Packet Tracer.
4. **E-Football Tournament Management**: Bracket automation and screenshot validation in React & PostgreSQL.`,
      action: {
        type: 'navigate_section',
        label: 'Explore Projects Section',
        target: '#projects'
      }
    };
  }

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('react') || q.includes('django')) {
    return {
      text: `Peter Kiplagat Misik commands a comprehensive toolchain:
• **Programming**: Python (92%), JavaScript (88%), TypeScript (85%), Java (80%), C++ (75%)
• **Frontend**: React 19, Tailwind CSS, HTML5/CSS3, Vite, Framer Motion
• **Backend**: Django, Node.js, Express, REST APIs, WebSockets (Django Channels)
• **Databases**: PostgreSQL, MySQL, SQLite
• **Networking**: Cisco Packet Tracer, VLAN Segmentation, Router/Switch Configuration, LAN/WAN
• **Tools**: Linux Administration, Git & GitHub, Postman, VS Code`,
      action: {
        type: 'navigate_section',
        label: 'View Interactive Skills Grid',
        target: '#skills'
      }
    };
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('ttu') || q.includes('taita')) {
    return {
      text: `Peter is currently pursuing a **${EDUCATION_DATA.degree}** (${EDUCATION_DATA.status}) at **${EDUCATION_DATA.institution}** (2023 – Present).
His specialization is **${EDUCATION_DATA.specialization}**, with core coursework in ${EDUCATION_DATA.coursework.slice(0, 4).join(', ')}.`,
      action: {
        type: 'navigate_section',
        label: 'View Education Background',
        target: '#about'
      }
    };
  }

  if (q.includes('hire') || q.includes('intern') || q.includes('available') || q.includes('job') || q.includes('opportunity')) {
    return {
      text: `Peter is actively available for **${PERSONAL_INFO.availability}**. He brings a unique combination of full-stack software development (Django, React, Node.js, PostgreSQL) and enterprise Cisco network engineering, backed by real-world attachment experience at EmgTTI.

Feel free to connect directly via WhatsApp at **${PERSONAL_INFO.phone}** or email at **${PERSONAL_INFO.email}**!`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  return {
    text: `I am Peter Kiplagat Misik's AI representative! I can answer questions about his **BSc in Information Technology** at Taita Taveta University, his software projects (**TSafari**, **Agrovet POS**), his Cisco network designs, or his ICT attachment at **EmgTTI** under Madam Elizabeth Tum.

What would you like to know about Peter's background, skills, or projects?`,
    action: {
      type: 'whatsapp',
      label: 'Chat with Peter on WhatsApp',
      target: PERSONAL_INFO.whatsappUrl
    }
  };
};
