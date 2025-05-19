
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface PayPalConfigProps {
  onSave: (clientId: string) => void;
  onCancel: () => void;
}

const PayPalConfig: React.FC<PayPalConfigProps> = ({ onSave, onCancel }) => {
  const [clientId, setClientId] = useState('');
  
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
    
    // Notify parent component
    onSave(clientId);
    
    toast({
      title: "API Key Saved",
      description: "Your PayPal Client ID has been saved securely.",
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
          <Label htmlFor="clientId">PayPal Client ID</Label>
          <Input
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="e.g., AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can find your Client ID in your PayPal Developer Dashboard.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save API Key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PayPalConfig;
