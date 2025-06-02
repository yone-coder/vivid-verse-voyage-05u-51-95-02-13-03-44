import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, MapPin } from "lucide-react";

interface ReceiverDetails {
  fullName: string;
  phoneNumber: string;
  address: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
}

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ receiverDetails = {}, onDetailsChange }) => {
  const safeReceiverDetails = {
    fullName: '',
    phoneNumber: '',
    address: '',
    ...receiverDetails
  };

  const updateField = (field: keyof ReceiverDetails, value: string) => {
    onDetailsChange({
      ...safeReceiverDetails,
      [field]: value
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-2">
          Receiver Information
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Please provide accurate details for secure transfer processing
        </p>
      </div>

        <div className="space-y-6">
          {/* Full Name Field */}
          <div className="group">
            <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <User className="w-4 h-4 text-slate-500" />
              Full Name
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input 
                id="fullName" 
                placeholder="Enter complete legal name" 
                value={safeReceiverDetails.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="h-12 pl-4 pr-4 bg-white/70 dark:bg-slate-800/70 border-slate-300/60 dark:border-slate-600/60 rounded-xl 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 
                         transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder:text-slate-500
                         hover:border-slate-400 dark:hover:border-slate-500"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="group">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <Phone className="w-4 h-4 text-slate-500" />
              Phone Number
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input 
                id="phoneNumber" 
                placeholder="Enter contact number with country code" 
                value={safeReceiverDetails.phoneNumber}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                className="h-12 pl-4 pr-4 bg-white/70 dark:bg-slate-800/70 border-slate-300/60 dark:border-slate-600/60 rounded-xl 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 
                         transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder:text-slate-500
                         hover:border-slate-400 dark:hover:border-slate-500"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Address Field */}
          <div className="group">
            <Label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <MapPin className="w-4 h-4 text-slate-500" />
              Complete Address
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Textarea 
                id="address" 
                placeholder="Street address, city, state/province, postal code, country" 
                className="min-h-[100px] p-4 bg-white/70 dark:bg-slate-800/70 border-slate-300/60 dark:border-slate-600/60 rounded-xl 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 
                         transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder:text-slate-500
                         hover:border-slate-400 dark:hover:border-slate-500 resize-none"
                value={safeReceiverDetails.address}
                onChange={(e) => updateField('address', e.target.value)}
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              Your information is encrypted and secured. All details will be verified before processing the transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoTransfer;