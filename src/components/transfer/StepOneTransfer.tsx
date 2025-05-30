
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getExchangeRate, ExchangeRateData } from "@/utils/currencyConverter";

interface StepOneTransferProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const StepOneTransfer: React.FC<StepOneTransferProps> = ({ amount, onAmountChange }) => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        const rate = await getExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExchangeRate();
  }, []);

  const usdAmount = parseFloat(amount) || 0;
  const htgAmount = exchangeRate ? usdAmount * exchangeRate.usdToHtg : 0;

  return (
    <div className="space-y-6">
      {/* Header Information */}
      <div className="text-center">
        <p className="text-gray-600">Enter the amount you want to send</p>
      </div>

      {/* Exchange Rate Information */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-green-700">Current Exchange Rate:</span>
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-green-800">
                1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
                {!exchangeRate?.isLive && " (offline rate)"}
              </span>
            )}
          </div>
          
          {usdAmount > 0 && exchangeRate && (
            <div className="pt-2 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">Receiver Gets:</span>
                <span className="text-lg font-bold text-green-800">{htgAmount.toFixed(2)} HTG</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Amount Input */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <Label htmlFor="amount" className="text-base font-medium">Amount to send (USD)</Label>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-500 font-medium">$</span>
          </div>
          <Input
            id="amount"
            type="number"
            className="pl-8 text-lg"
            placeholder="500"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            min="1"
            step="0.01"
          />
        </div>
        
        {amount && parseFloat(amount) > 0 && exchangeRate && (
          <p className="text-sm text-gray-500 mt-2">
            * Receiver will get approximately {htgAmount.toFixed(2)} HTG
          </p>
        )}
      </div>

      {/* Fees Information */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium text-gray-800 mb-2">Transfer Information:</h4>
        <ul className="space-y-1">
          <li>• Processing fee: Included in exchange rate</li>
          <li>• Transfer time: 24-48 hours</li>
          <li>• Secure and encrypted transaction</li>
        </ul>
      </div>
    </div>
  );
};

export default StepOneTransfer;
