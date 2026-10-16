import { createContext } from 'react';

export interface ResumeContextType {
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);
