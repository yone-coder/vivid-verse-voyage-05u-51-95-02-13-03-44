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
  // Provide default values if receiverDetails is undefined
  const details = receiverDetails || {
    fullName: '',
    phoneNumber: '',
    address: '',
    additionalInfo: ''
  };

  const updateField = (field: keyof ReceiverDetails, value: string) => {
    onDetailsChange({
      ...details,
      [field]: value
    });
  };

  return (
    <div className="w-full max-w-lg">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Full Name
          </Label>
          <Input 
            id="fullName" 
            placeholder="Enter receiver's full name" 
            value={details.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Phone Number
          </Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter receiver's phone number" 
            value={details.phoneNumber}
            onChange={(e) => updateField('phoneNumber', e.target.value)}
            className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Address
          </Label>
          <Textarea 
            id="address" 
            placeholder="Enter receiver's complete address" 
            className="min-h-[80px] resize-none border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
            value={details.address}
            onChange={(e) => updateField('address', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Additional Information
            <span className="text-xs ml-1 font-normal">(Optional)</span>
          </Label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Optional additional information" 
            className="min-h-[64px] resize-none border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors" 
            value={details.additionalInfo || ''}
            onChange={(e) => updateField('additionalInfo', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoTransfer;