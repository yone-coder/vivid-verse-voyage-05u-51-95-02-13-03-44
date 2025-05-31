
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

  return (
    <div className="space-y-3">
      {/* Exchange Rate Header */}
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-black" />
            <span className="text-sm font-medium text-black">Rate</span>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-sm font-bold text-black">
                1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
              </div>
              {!exchangeRate?.isLive && (
                <div className="text-xs text-gray-400">Offline rate</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Amount Input */}
      <div className="border border-gray-200 rounded-lg p-4">
        <Label htmlFor="amount" className="text-sm font-medium text-black mb-2">
          Send Amount
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-900 font-bold text-lg">$</span>
          </div>
          <Input
            id="amount"
            type="number"
            className="pl-8 text-2xl font-bold border-0 shadow-none focus-visible:ring-0 bg-white text-black placeholder-gray-400"
            placeholder="0.00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            min="1"
            step="0.01"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Conversion Display */}
      {usdAmount > 0 && exchangeRate && (
        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Recipient Gets</span>
            <div className="text-right">
              <div className="text-lg font-bold text-black">
                {htgAmount.toFixed(2)} HTG
              </div>
              <div className="text-xs text-gray-500">
                ≈ ${usdAmount.toFixed(2)} USD
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Info */}
      <div className="border-t border-gray-100 pt-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500">Fee</div>
            <div className="text-sm font-medium text-black">Included</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Time</div>
            <div className="text-sm font-medium text-black">24-48h</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Security</div>
            <div className="text-sm font-medium text-black">Encrypted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;
