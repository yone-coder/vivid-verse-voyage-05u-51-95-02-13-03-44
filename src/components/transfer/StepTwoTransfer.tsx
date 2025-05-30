
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Recipient Information</h2>
        <p className="text-gray-600 text-sm">
          Please provide the details of the person who will receive the money in Haiti.
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input 
            id="fullName" 
            placeholder="Enter receiver's full name" 
            value={receiverDetails.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter receiver's phone number" 
            value={receiverDetails.phoneNumber}
            onChange={(e) => updateField('phoneNumber', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Textarea 
            id="address" 
            placeholder="Enter receiver's complete address in Haiti" 
            className="min-h-[80px]"
            value={receiverDetails.address}
            onChange={(e) => updateField('address', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Any additional information about the receiver or transfer" 
            className="min-h-[60px]" 
            value={receiverDetails.additionalInfo || ''}
            onChange={(e) => updateField('additionalInfo', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h4 className="font-medium text-yellow-800 mb-1">Important Note:</h4>
        <p className="text-sm text-yellow-700">
          Please ensure all information is accurate. The recipient will need to provide identification 
          matching these details to collect the money.
        </p>
      </div>
    </div>
  );
};

export default StepTwoTransfer;
