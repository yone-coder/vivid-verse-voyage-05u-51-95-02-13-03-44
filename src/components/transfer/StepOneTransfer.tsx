import React, { useState, useEffect } from 'react';
import { Loader2, TrendingUp, Shield, Clock, Zap } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock exchange rate function since we don't have the actual utility
const getExchangeRate = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    usdToHtg: 132.50,
    isLive: true
  };
};

interface StepOneTransferProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const StepOneTransfer: React.FC<StepOneTransferProps> = ({ amount, onAmountChange }) => {
  const [exchangeRate, setExchangeRate] = useState<any>(null);
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
  const transferFee = Math.ceil(usdAmount / 100) * 15;
  const totalAmount = usdAmount + transferFee;

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Exchange Rate Card */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-4 border border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Exchange Rate</span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              <span className="text-sm text-slate-500">Updating...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className={`w-2 h-2 rounded-full ${exchangeRate?.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                <div className="text-sm font-semibold text-slate-900">
                  1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Amount Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="p-4 pb-3">
          <Label htmlFor="amount" className="text-sm font-medium text-slate-700 mb-3 block">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-slate-600 font-medium text-2xl">$</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-10 pr-16 text-3xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-slate-400 h-16"
              placeholder="0.00"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              min="1"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-sm font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full">
                USD
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Preview */}
        {usdAmount > 0 && exchangeRate && (
          <div className="px-4 pb-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Recipient receives</span>
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900">
                    {htgAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} HTG
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fee Breakdown */}
      {usdAmount > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Transfer fee</span>
              <span className="font-medium text-slate-900">${transferFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">Total to pay</span>
                <span className="text-2xl font-semibold text-slate-900">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default StepOneTransfer;