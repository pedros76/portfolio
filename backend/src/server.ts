import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { CONFIG } from './config/env.js';
import { apiRouter } from './routes/index.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: CONFIG.CORS_ORIGIN === '*' ? true : CONFIG.CORS_ORIGIN.split(','),
    credentials: true
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, originalUrl } = req;
  _res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${method} ${originalUrl} -> ${_res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root and API ping
app.get(['/', '/api'], (_req: Request, res: Response) => {
  res.json({
    name: 'Peter Kiplagat Misik Portfolio API',
    status: 'online',
    docs: '/api/health',
    endpoints: [
      'GET  /api/health',
      'GET  /api/info',
      'GET  /api/stats',
      'GET  /api/education',
      'GET  /api/skills',
      'GET  /api/projects',
      'GET  /api/projects/:id',
      'GET  /api/experience',
      'GET  /api/certifications',
      'GET  /api/testimonials',
      'GET  /api/blogs',
      'POST /api/chat',
      'GET  /api/chat/health',
      'POST /api/contact'
    ]
  });
});

// Mount API routes
app.use('/api', apiRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Server Error]:', err);
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({
    success: false,
    error: message
  });
});

const PORT = CONFIG.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Peter Kiplagat Misik Portfolio Backend is running at http://localhost:${PORT}`);
  console.log(`📍 API endpoints mounted at http://localhost:${PORT}/api`);
});

export default app;
