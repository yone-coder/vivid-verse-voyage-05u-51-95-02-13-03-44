
import React, { useState, useEffect } from 'react';
import { Loader2, TrendingUp, Shield, Clock, Zap, ArrowUpDown } from 'lucide-react';
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
  const [receiverAmount, setReceiverAmount] = useState('');
  const [lastEditedField, setLastEditedField] = useState<'send' | 'receive'>('send');

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

  // Update receiver amount when send amount changes (if send was last edited)
  useEffect(() => {
    if (exchangeRate && lastEditedField === 'send' && amount) {
      const usdAmount = parseFloat(amount) || 0;
      const htgAmount = usdAmount * exchangeRate.usdToHtg;
      setReceiverAmount(htgAmount.toFixed(2));
    }
  }, [amount, exchangeRate, lastEditedField]);

  // Update send amount when receiver amount changes (if receive was last edited)
  useEffect(() => {
    if (exchangeRate && lastEditedField === 'receive' && receiverAmount) {
      const htgAmount = parseFloat(receiverAmount) || 0;
      const usdAmount = htgAmount / exchangeRate.usdToHtg;
      onAmountChange(usdAmount.toFixed(2));
    }
  }, [receiverAmount, exchangeRate, lastEditedField, onAmountChange]);

  const handleSendAmountChange = (value: string) => {
    setLastEditedField('send');
    onAmountChange(value);
  };

  const handleReceiveAmountChange = (value: string) => {
    setLastEditedField('receive');
    setReceiverAmount(value);
  };

  const usdAmount = parseFloat(amount) || 0;
  const htgAmount = parseFloat(receiverAmount) || 0;
  const transferFee = Math.ceil(usdAmount / 100) * 15;
  const totalAmount = usdAmount + transferFee;

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Exchange Rate Card - Reduced height */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-3 border border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-emerald-100 rounded-lg">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-slate-700">Exchange Rate</span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
              <span className="text-xs text-slate-500">Updating...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className={`w-1.5 h-1.5 rounded-full ${exchangeRate?.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                <div className="text-xs font-semibold text-slate-900">
                  1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Send Amount Input Card - Reduced height */}
      <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="amount" className="text-xs font-medium text-slate-700 mb-2 block">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-slate-600 font-medium text-xl">$</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-slate-400 h-12"
              placeholder="100.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Double Arrows - Reduced size */}
      <div className="flex justify-center">
        <div className="p-1.5 bg-slate-100 rounded-full">
          <ArrowUpDown className="h-4 w-4 text-slate-600" />
        </div>
      </div>

      {/* Receiver Amount Input Card - Reduced height */}
      <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="receiverAmount" className="text-xs font-medium text-slate-700 mb-2 block">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-slate-600 font-medium text-sm">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="number"
              className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-slate-400 h-12"
              placeholder="13250.00"
              value={receiverAmount}
              onChange={(e) => handleReceiveAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown - Always Visible with reduced height */}
      <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Transfer fee</span>
            <span className="font-medium text-slate-900">${transferFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-100 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900 text-sm">Total to pay</span>
              <span className="text-xl font-semibold text-slate-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;
