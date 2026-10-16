import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { ResumeModal } from '../components/ResumeModal';
import { useTheme } from '../hooks/useTheme';
import { useResume } from '../hooks/useResume';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { isResumeModalOpen, openResumeModal, closeResumeModal } = useResume();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-emerald-500 selection:text-black transition-colors duration-300">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={openResumeModal}
      />

      <main className="flex-1 w-full">
        {children}
      </main>

      <Footer />
      <ScrollToTop />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
      />
    </div>
  );
};
