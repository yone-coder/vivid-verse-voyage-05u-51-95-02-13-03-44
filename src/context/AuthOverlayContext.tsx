
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthOverlayContextType {
  isAuthOverlayOpen: boolean;
  openAuthOverlay: () => void;
  closeAuthOverlay: () => void;
}

const AuthOverlayContext = createContext<AuthOverlayContextType | undefined>(undefined);

export const AuthOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOverlayOpen, setIsAuthOverlayOpen] = useState(false);

  const openAuthOverlay = () => {
    setIsAuthOverlayOpen(true);
  };

  const closeAuthOverlay = () => {
    setIsAuthOverlayOpen(false);
  };

  return (
    <AuthOverlayContext.Provider value={{
      isAuthOverlayOpen,
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
