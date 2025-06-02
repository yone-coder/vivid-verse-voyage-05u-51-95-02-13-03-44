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

  const usdAmount = amount ? parseFloat(amount) : 0;
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
              <div className="text-sm font-semibold text-slate-900">
                1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${exchangeRate?.isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-xs text-slate-500">
                  {exchangeRate?.isLive ? 'Live' : 'Cached'}
                </span>
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

        </div>

      {/* Conversion Display - Separate Card */}
      {usdAmount > 0 && exchangeRate && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Recipient receives</span>
            <div className="text-right">
              <div className="text-xl font-semibold text-slate-900">
                {htgAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} HTG
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Fee Breakdown */}
      {amount && usdAmount > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-sm p-4">
          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-700 mb-2">Cost Breakdown</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Send amount</span>
              <span className="font-medium text-slate-900">${usdAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Transfer fee (15% per $100)</span>
              <span className="font-medium text-slate-900">${transferFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-blue-200/50 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Total to pay</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Features */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3">
          <div className="inline-flex p-2 bg-blue-100 rounded-xl mb-2">
            <Zap className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xs font-medium text-slate-900">Instant</div>
          <div className="text-xs text-slate-500 mt-0.5">Processing</div>
        </div>
        <div className="text-center p-3">
          <div className="inline-flex p-2 bg-amber-100 rounded-xl mb-2">
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xs font-medium text-slate-900">24-48h</div>
          <div className="text-xs text-slate-500 mt-0.5">Delivery</div>
        </div>
        <div className="text-center p-3">
          <div className="inline-flex p-2 bg-emerald-100 rounded-xl mb-2">
            <Shield className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xs font-medium text-slate-900">Secure</div>
          <div className="text-xs text-slate-500 mt-0.5">Encrypted</div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;