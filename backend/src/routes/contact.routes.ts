import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../services/emailService.js';

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Valid email address is required').max(150),
  subject: z.string().max(200).optional().default('General Inquiry'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(5000)
});

// POST /api/contact
contactRouter.post('/contact', async (req: Request, res: Response) => {
  try {
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.flatten()
      });
      return;
    }

    const result = await sendContactEmail(parseResult.data);
    res.json(result);
  } catch (err: unknown) {
    console.error('[Contact Route Error]:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process contact submission.'
    });
  }
});
