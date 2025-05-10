
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AuthPage from '@/pages/AuthPage';
import SignupPage from '@/pages/SignupPage';

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'signin' 
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <SheetContent className="w-full sm:max-w-md p-0 border-0">
        {defaultMode === 'signin' ? (
          <AuthPage isOverlay={true} onClose={onClose} />
        ) : (
          <SignupPage isOverlay={true} onClose={onClose} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AuthOverlay;
