
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AmountInputProps {
  amount: string;
  onAmountChange: (value: string) => void;
  currencySymbol: string;
  currencyName: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onAmountChange,
  currencySymbol,
  currencyName
}) => {
  // Calculate left padding based on currency symbol length
  const getPaddingClass = () => {
    const symbolLength = currencySymbol.trim().length;
    if (symbolLength > 3) return 'pl-16';  // For longer currency symbols like "HTG "
    if (symbolLength > 2) return 'pl-14';  // For medium currency symbols
    return 'pl-8';  // For shorter currency symbols like "$"
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <Label htmlFor="amount">Amount to send ({currencyName})</Label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-gray-500 font-medium">{currencySymbol.trim()}</span>
        </div>
        <Input
          id="amount"
          type="number"
          className={getPaddingClass()}
          placeholder="0.00"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>
      
      {amount && parseFloat(amount) > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          * Exchange rates and fees will be calculated at checkout
        </p>
      )}
    </div>
  );
};

export default AmountInput;
