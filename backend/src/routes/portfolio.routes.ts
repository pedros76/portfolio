import { Router, Request, Response } from 'express';
import {
  PERSONAL_INFO,
  STATS,
  EDUCATION_DATA,
  SKILLS_DATA,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  CERTIFICATIONS_DATA,
  TESTIMONIALS_DATA,
  BLOG_POSTS
} from '../data/portfolioData.js';

export const portfolioRouter = Router();

// GET /api/info
portfolioRouter.get('/info', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: PERSONAL_INFO
  });
});

// GET /api/stats
portfolioRouter.get('/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: STATS
  });
});

// GET /api/education
portfolioRouter.get('/education', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: EDUCATION_DATA
  });
});

// GET /api/skills
portfolioRouter.get('/skills', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  if (category) {
    const filtered = SKILLS_DATA.filter((s) => s.category === category);
    res.json({ success: true, count: filtered.length, data: filtered });
    return;
  }
  res.json({
    success: true,
    count: SKILLS_DATA.length,
    data: SKILLS_DATA
  });
});

// GET /api/projects
portfolioRouter.get('/projects', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const search = req.query.q as string | undefined;

  let results = [...PROJECTS_DATA];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.subtitle.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some((t: string) => t.toLowerCase().includes(term))
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/projects/:id
portfolioRouter.get('/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = PROJECTS_DATA.find((p) => p.id === id);

  if (!project) {
    res.status(404).json({
      success: false,
      message: `Project with ID '${id}' not found.`
    });
    return;
  }

  res.json({
    success: true,
    data: project
  });
});

// GET /api/experience
portfolioRouter.get('/experience', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: EXPERIENCE_DATA.length,
    data: EXPERIENCE_DATA
  });
});

// GET /api/certifications
portfolioRouter.get('/certifications', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: CERTIFICATIONS_DATA.length,
    data: CERTIFICATIONS_DATA
  });
});

// GET /api/testimonials
portfolioRouter.get('/testimonials', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: TESTIMONIALS_DATA.length,
    data: TESTIMONIALS_DATA
  });
});

// GET /api/blogs
portfolioRouter.get('/blogs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: BLOG_POSTS.length,
    data: BLOG_POSTS
  });
});
