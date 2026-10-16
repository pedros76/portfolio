import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { portfolioRouter } from './portfolio.routes.js';
import { aiRouter } from './ai.routes.js';
import { contactRouter } from './contact.routes.js';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(portfolioRouter);
apiRouter.use(aiRouter);
apiRouter.use(contactRouter);
