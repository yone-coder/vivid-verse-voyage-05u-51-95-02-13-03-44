
import React from 'react';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  // This is a simplified passkey component, as actual WebAuthn implementation
  // would require more complex setup with credential management API
  
  const handlePasskeyLogin = () => {
    // In a real implementation, this would interact with the WebAuthn API
    if (onSubmit) {
      const event = new Event('submit', { cancelable: true }) as unknown as React.FormEvent;
      onSubmit(event);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-6 py-4">
      <div className="text-center">
        <h2 className="text-base font-medium text-foreground mb-1">Passkey Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Sign in with your device's biometrics or security key
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center pt-4">
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <Key className="h-12 w-12 text-primary" />
        </div>

        <p className="text-sm text-center text-muted-foreground mb-6 max-w-xs">
          Passkeys offer a more secure alternative to passwords by using your device's biometrics or security key.
        </p>

        <Button 
          onClick={handlePasskeyLogin}
          className="w-full flex items-center justify-center gap-2 bg-primary"
          size="lg"
          type={showSubmitButton ? "submit" : "button"}
        >
          <Key className="h-4 w-4 mr-2" />
          Continue with Passkey
        </Button>
      </div>
    </div>
  );
};

export default PasskeyTab;
