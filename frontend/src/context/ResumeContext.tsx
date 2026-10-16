import React, { useState } from 'react';
import { ResumeContext } from './resumeContextDefinition';

export { type ResumeContextType, ResumeContext } from './resumeContextDefinition';

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <ResumeContext.Provider value={{ isResumeModalOpen, openResumeModal, closeResumeModal }}>
      {children}
    </ResumeContext.Provider>
  );
};
