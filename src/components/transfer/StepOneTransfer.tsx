
import React, { useState, useEffect } from 'react';
import { Loader2, TrendingUp } from 'lucide-react';
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
  
  // Calculate fee (15% on each $100)
  const transferFee = Math.ceil(usdAmount / 100) * 15;
  const totalAmount = usdAmount + transferFee;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* Exchange Rate Header */}
      <div className="border border-gray-200 rounded-md p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-black" />
            <span className="text-xs font-medium text-black">Rate</span>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-xs font-bold text-black">
                1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
              </div>
              {!exchangeRate?.isLive && (
                <div className="text-xs text-gray-400">Offline</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Amount Input */}
      <div className="border border-gray-200 rounded-md p-2">
        <Label htmlFor="amount" className="text-xs font-medium text-black mb-1 block">
          Send Amount
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <span className="text-gray-900 font-bold text-lg">$</span>
          </div>
          <Input
            id="amount"
            type="number"
            className="pl-6 text-xl font-bold border-0 shadow-none focus-visible:ring-0 bg-white text-black placeholder-gray-400 h-10"
            placeholder="0.00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            min="1"
            step="0.01"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1 py-0.5 rounded text-xs">
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Conversion Display - Moved before fee display */}
      {usdAmount > 0 && exchangeRate && (
        <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Recipient Gets</span>
            <div className="text-right">
              <div className="text-sm font-bold text-black">
                {htgAmount.toFixed(2)} HTG
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Display */}
      {usdAmount > 0 && (
        <div className="border border-gray-200 rounded-md p-2 bg-blue-50">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Transfer Fee (15% per $100)</span>
              <span className="font-medium text-black">${transferFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-blue-200 pt-1">
              <span className="font-medium text-gray-900">Total to Pay</span>
              <span className="text-lg font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Info */}
      <div className="border-t border-gray-100 pt-2">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-xs text-gray-500">Processing</div>
            <div className="text-xs font-medium text-black">Instant</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Delivery</div>
            <div className="text-xs font-medium text-black">24-48h</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Security</div>
            <div className="text-xs font-medium text-black">Encrypted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;
