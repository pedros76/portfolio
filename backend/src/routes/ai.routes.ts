import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { generateAiChatResponse, keyRotator } from '../services/geminiService.js';

export const aiRouter = Router();

const chatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(1500, 'Message cannot exceed 1500 characters'),
  history: z
    .array(
      z.object({
        sender: z.enum(['user', 'assistant']),
        text: z.string()
      })
    )
    .optional()
    .default([])
});

// POST /api/chat
aiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const parseResult = chatRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: parseResult.error.flatten()
      });
      return;
    }

    const { message, history } = parseResult.data;
    const response = await generateAiChatResponse(message, history);

    res.json({
      success: true,
      data: {
        text: response.text,
        action: response.action,
        source: response.source
      }
    });
  } catch (error: unknown) {
    console.error('[AI Route Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while generating AI response'
    });
  }
});

// GET /api/chat/health
aiRouter.get('/chat/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    stats: keyRotator.getStats()
  });
});
