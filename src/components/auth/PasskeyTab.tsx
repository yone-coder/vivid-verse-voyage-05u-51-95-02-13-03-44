
import React, { useState, useEffect } from 'react';
import { KeyRound, Fingerprint, AlertTriangle, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Clean up error state when component unmounts or tab changes
  useEffect(() => {
    return () => {
      setErrorMessage(null);
    };
  }, []);
  
  const handlePasskeyAuth = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // In a real implementation, this would use WebAuthn API
      // For demonstration, we'll simulate the process
      toast.info("Passkey authentication isn't fully implemented yet.");
      
      setTimeout(() => {
        setIsLoading(false);
        setErrorMessage("Passkeys are not fully supported yet");
      }, 1500);
      
      // If implemented, would look something like this:
      // const credential = await navigator.credentials.get({
      //   publicKey: publicKeyCredentialRequestOptions,
      // });
      // Then verify with your backend
      
    } catch (error) {
      console.error("Passkey error:", error);
      setErrorMessage("Failed to authenticate with passkey");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Passkey section with better organized instructions */}
      <div className="text-center mb-4">
        <h2 className="text-base font-medium text-foreground mb-1">Passkey Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Sign in securely without a password
        </p>
      </div>

      {/* Passkey UI */}
      <div className="flex flex-col items-center justify-center px-6 py-8 bg-background border border-[#eaeaea] rounded-xl">
        <motion.div
          className="flex items-center justify-center bg-primary/10 w-20 h-20 rounded-full mb-5"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Fingerprint className="h-9 w-9 text-primary" />
        </motion.div>
        
        <h3 className="text-lg font-medium mb-2">Use Passkey</h3>
        <p className="text-sm text-center text-muted-foreground mb-4">
          Authenticate quickly and securely using your device's biometric sensor or PIN
        </p>

        <button
          onClick={handlePasskeyAuth}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 mt-2 w-full max-w-[220px] py-3 px-5 rounded-lg font-medium text-sm transition-all duration-200 ${
            isLoading
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4" />
              <span>Use Passkey</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message - Specific to passkeys */}
      {errorMessage && (
        <div className="flex items-center justify-center gap-1.5 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Browser support notice */}
      <div className="flex items-center justify-center gap-1.5 mt-4 p-3 bg-muted/40 rounded-md text-sm text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        <span>Passkey support varies by browser and device</span>
      </div>
    </div>
  );
};

export default PasskeyTab;
