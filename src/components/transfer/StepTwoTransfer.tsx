
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReceiverDetails {
  fullName: string;
  phoneNumber: string;
  address: string;
  additionalInfo?: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
}

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ receiverDetails, onDetailsChange }) => {
  const updateField = (field: keyof ReceiverDetails, value: string) => {
    onDetailsChange({
      ...receiverDetails,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
          <Input 
            id="fullName" 
            placeholder="Enter receiver's full name" 
            value={receiverDetails.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="h-10"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number *</Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter receiver's phone number" 
            value={receiverDetails.phoneNumber}
            onChange={(e) => updateField('phoneNumber', e.target.value)}
            className="h-10"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address" className="text-sm font-medium">Address *</Label>
          <Textarea 
            id="address" 
            placeholder="Enter receiver's complete address" 
            className="min-h-[70px] resize-none"
            value={receiverDetails.address}
            onChange={(e) => updateField('address', e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="additionalInfo" className="text-sm font-medium">Additional Info</Label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Optional additional information" 
            className="min-h-[60px] resize-none" 
            value={receiverDetails.additionalInfo || ''}
            onChange={(e) => updateField('additionalInfo', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoTransfer;
