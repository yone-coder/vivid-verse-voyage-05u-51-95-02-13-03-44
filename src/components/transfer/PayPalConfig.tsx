
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface PayPalConfigProps {
  onSave: (clientId: string, isProduction: boolean) => void;
  onCancel: () => void;
}

const PayPalConfig: React.FC<PayPalConfigProps> = ({ onSave, onCancel }) => {
  const [clientId, setClientId] = useState('');
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  
  // Load saved environment and client ID on component mount
  useEffect(() => {
    const savedEnvironment = localStorage.getItem('paypal_environment') as 'sandbox' | 'production';
    const savedClientId = localStorage.getItem('paypal_client_id');
    
    if (savedEnvironment) {
      setEnvironment(savedEnvironment);
    }
    
    if (savedClientId) {
      setClientId(savedClientId);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your PayPal Client ID.",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('paypal_client_id', clientId);
    localStorage.setItem('paypal_environment', environment);
    
    // Notify parent component
    onSave(clientId, environment === 'production');
    
    toast({
      title: "API Key Saved",
      description: `Your PayPal Client ID has been saved securely for ${environment} mode.`,
      variant: "success",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configure PayPal Integration</h2>
      <p className="text-gray-600 mb-4">
        Please enter your PayPal Client ID to activate the PayPal payment gateway.
        This will be stored locally in your browser and not sent to any server.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="environment" className="mb-2 block">Environment</Label>
          <RadioGroup value={environment} onValueChange={(value) => setEnvironment(value as 'sandbox' | 'production')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sandbox" id="sandbox" />
              <Label htmlFor="sandbox" className="font-normal cursor-pointer">Sandbox (Testing)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="production" id="production" />
              <Label htmlFor="production" className="font-normal cursor-pointer">Production (Live)</Label>
            </div>
          </RadioGroup>
          {environment === 'production' && (
            <p className="text-amber-600 text-sm mt-1">
              ⚠️ Production mode will process real payments with actual money
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <Label htmlFor="clientId">PayPal Client ID</Label>
          <Input
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder={environment === 'production' 
              ? "Live Client ID (e.g., AYxxx...)" 
              : "Sandbox Client ID (e.g., ASxxx...)"}
            className="w-full mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can find your Client ID in your PayPal Developer Dashboard 
            under {environment === 'production' ? 'Live' : 'Sandbox'} API Credentials.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant={environment === 'production' ? 'destructive' : 'default'}>
            {environment === 'production' ? 'Save Live API Key' : 'Save Test API Key'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PayPalConfig;
