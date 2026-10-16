import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </ResumeProvider>
    </BrowserRouter>
  );
};

export default App;
