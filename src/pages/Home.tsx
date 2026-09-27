import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Projects } from '../components/Projects';
import { Certifications } from '../components/Certifications';
import { Testimonials } from '../components/Testimonials';
import { GitHubActivity } from '../components/GitHubActivity';
import { BlogSection } from '../components/BlogSection';
import { AiAssistant } from '../components/AiAssistant';
import { Contact } from '../components/Contact';
import { useResume } from '../hooks/useResume';

export const Home: React.FC = () => {
  const { openResumeModal } = useResume();

  return (
    <div className="w-full">
      <Hero onOpenResume={openResumeModal} />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Testimonials />
      <GitHubActivity />
      <BlogSection />
      <AiAssistant />
      <Contact />
    </div>
  );
};
