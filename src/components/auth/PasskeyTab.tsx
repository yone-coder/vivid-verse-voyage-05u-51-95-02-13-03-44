
import React, { useCallback, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, AlertCircle, Fingerprint, Info, Loader2, CheckCircle, Smartphone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

enum PasskeyStatus {
  IDLE = 'idle',
  CHECKING = 'checking',
  SUCCESS = 'success',
  ERROR = 'error',
}

const PasskeyTab = ({ 
  onSubmit,
  showSubmitButton = false 
}: PasskeyTabProps) => {
  const [status, setStatus] = useState<PasskeyStatus>(PasskeyStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [animation, setAnimation] = useState<boolean>(false);

  // Check for passkey browser support
  const isPasskeySupported = useMemo(() => 
    typeof window !== 'undefined' && 
    window.PublicKeyCredential !== undefined && 
    typeof window.PublicKeyCredential === 'function', []);

  // Simulate passkey authentication
  const handleAuthenticate = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status === PasskeyStatus.CHECKING) return;
    
    setStatus(PasskeyStatus.CHECKING);
    setErrorMessage(null);
    setAnimation(true);

    // Simulate passkey authentication process
    setTimeout(() => {
      if (!isPasskeySupported) {
        setStatus(PasskeyStatus.ERROR);
        setErrorMessage("Your browser doesn't support passkeys. Please use a different authentication method.");
        return;
      }

      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        setStatus(PasskeyStatus.SUCCESS);
        setTimeout(() => {
          if (onSubmit) onSubmit({} as React.FormEvent);
        }, 500);
      } else {
        setStatus(PasskeyStatus.ERROR);
        setErrorMessage("Authentication failed. Please try again.");
      }
      
      setAnimation(false);
    }, 1500);
  }, [status, isPasskeySupported, onSubmit]);

  // Reset state
  const handleTryAgain = useCallback(() => {
    setStatus(PasskeyStatus.IDLE);
    setErrorMessage(null);
  }, []);

  // Handle keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAuthenticate();
    }
  }, [handleAuthenticate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="mb-2">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="relative group">
                  <Info 
                    className="absolute top-0 right-0 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" 
                    aria-label="Info about passkeys" 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[260px] p-3">
                <p className="text-xs">Passkeys are a new way to sign in without passwords. They use your device's built-in authentication like fingerprint or face recognition.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div 
            className={`flex-shrink-0 h-32 w-32 flex items-center justify-center rounded-full mx-auto transition-all duration-500 ${
              status === PasskeyStatus.CHECKING 
                ? 'bg-amber-50 dark:bg-amber-900/20' 
                : status === PasskeyStatus.SUCCESS
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : status === PasskeyStatus.ERROR
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
            }`}
            role="button"
            tabIndex={0}
            onClick={() => status !== PasskeyStatus.SUCCESS && handleAuthenticate()}
            onKeyDown={handleKeyDown}
            aria-label="Authenticate with passkey"
          >
            <AnimatePresence mode="wait">
              {status === PasskeyStatus.CHECKING ? (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-amber-500 dark:text-amber-400"
                >
                  <div className="relative">
                    <Fingerprint className="h-16 w-16" />
                    <div className="absolute -top-1.5 -right-1.5">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  </div>
                </motion.div>
              ) : status === PasskeyStatus.SUCCESS ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-green-500 dark:text-green-400"
                >
                  <div className="relative">
                    <Fingerprint className="h-16 w-16" />
                    <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-gray-900 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
                    </div>
                  </div>
                </motion.div>
              ) : status === PasskeyStatus.ERROR ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-red-500 dark:text-red-400"
                >
                  <div className="relative">
                    <Fingerprint className="h-16 w-16" />
                    <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-gray-900 rounded-full">
                      <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: animation ? [1, 1.05, 1] : 1,
                    transition: animation ? { 
                      scale: { repeat: Infinity, duration: 2 },
                    } : {}
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-primary dark:text-primary"
                >
                  <KeyRound className="h-16 w-16" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {status === PasskeyStatus.CHECKING
              ? "Verifying passkey..."
              : status === PasskeyStatus.SUCCESS
              ? "Passkey verified!"
              : status === PasskeyStatus.ERROR
              ? "Passkey error"
              : "Use your passkey"}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {status === PasskeyStatus.CHECKING
              ? "Please follow the instructions on your device"
              : status === PasskeyStatus.SUCCESS
              ? "You've been successfully authenticated"
              : status === PasskeyStatus.ERROR
              ? errorMessage || "Authentication failed. Please try again."
              : "A safer and easier way to sign in without passwords"}
          </p>
        </div>

        {/* Device Authentication Icons */}
        {status === PasskeyStatus.IDLE && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4 text-muted-foreground"
          >
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <Fingerprint className="h-5 w-5" />
                  <span className="text-xs mt-1">Fingerprint</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Sign in with fingerprint</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <KeyRound className="h-5 w-5" />
                  <span className="text-xs mt-1">Face ID</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Sign in with Face ID</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <Smartphone className="h-5 w-5" />
                  <span className="text-xs mt-1">Phone</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Sign in with your phone</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-1.5 text-xs text-destructive mt-1.5 bg-destructive/5 px-3 py-1.5 rounded-md border border-destructive/10 overflow-hidden w-full"
              role="alert"
            >
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Action Buttons */}
        {status === PasskeyStatus.ERROR ? (
          <button
            type="button"
            onClick={handleTryAgain}
            className="w-full py-2 mt-2 bg-muted hover:bg-muted/80 text-foreground rounded-md text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        ) : showSubmitButton && status === PasskeyStatus.IDLE ? (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full"
          >
            <button
              ref={submitButtonRef}
              type="button"
              onClick={() => handleAuthenticate()}
              className="w-full py-2.5 rounded-lg font-medium transition-all duration-200 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow"
            >
              Authenticate with Passkey
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default PasskeyTab;
