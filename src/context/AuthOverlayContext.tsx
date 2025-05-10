
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthOverlayContextType {
  isAuthOverlayOpen: boolean;
  authMode: 'signin' | 'signup';
  openAuthOverlay: (mode?: 'signin' | 'signup') => void;
  closeAuthOverlay: () => void;
}

const AuthOverlayContext = createContext<AuthOverlayContextType | undefined>(undefined);

export const AuthOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOverlayOpen, setIsAuthOverlayOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openAuthOverlay = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthOverlayOpen(true);
  };

  const closeAuthOverlay = () => {
    setIsAuthOverlayOpen(false);
  };

  return (
    <AuthOverlayContext.Provider value={{
      isAuthOverlayOpen,
      authMode,
      openAuthOverlay,
      closeAuthOverlay
    }}>
      {children}
    </AuthOverlayContext.Provider>
  );
};

export const useAuthOverlay = () => {
  const context = useContext(AuthOverlayContext);
  if (context === undefined) {
    throw new Error('useAuthOverlay must be used within an AuthOverlayProvider');
  }
  return context;
};
