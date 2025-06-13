
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MobileTransferInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  transferType?: 'international' | 'local';
}

export default function MobileTransferInput({ 
  amount, 
  onAmountChange, 
  transferType = 'international' 
}: MobileTransferInputProps) {
  const currency = transferType === 'international' ? 'USD' : 'HTG';
  const symbol = transferType === 'international' ? '$' : 'HTG';

  return (
    <div className="bg-white rounded-xl border border-blue-300 overflow-hidden">
      <div className="p-3 pb-2">
        <Label htmlFor="amount" className="text-xs font-bold text-blue-600 mb-2 block uppercase tracking-wide">
          Send Amount
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-blue-600 font-bold text-sm">{symbol}</span>
          </div>
          <Input
            id="amount"
            type="number"
            className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-gray-900 placeholder-blue-300 placeholder:text-2xl placeholder:font-light h-12"
            placeholder="0.00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            min="0"
            step="0.01"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
