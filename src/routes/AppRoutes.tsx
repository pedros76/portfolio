import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Loader2 } from 'lucide-react';

// Lazy loading route pages
const ProjectDetails = lazy(() =>
  import('../pages/ProjectDetails').then((m) => ({ default: m.ProjectDetails }))
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then((m) => ({ default: m.NotFound }))
);

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      <span className="text-xs font-mono text-neutral-400">Loading module...</span>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
