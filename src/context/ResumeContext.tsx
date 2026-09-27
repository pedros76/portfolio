import React, { createContext, useState } from 'react';

export interface ResumeContextType {
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

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
