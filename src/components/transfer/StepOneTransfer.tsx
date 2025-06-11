
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

  useEffect(() => {
    if (exchangeRate && lastEditedField === 'send' && amount) {
      const usdAmount = parseFloat(amount) || 0;
      const htgAmount = usdAmount * exchangeRate.usdToHtg;
      setReceiverAmount(htgAmount.toFixed(2));
    }
  }, [amount, exchangeRate, lastEditedField]);

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
      {/* Exchange Rate Card - Black, White, Blue theme */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 border border-blue-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 rounded-lg">
              <TrendingUp className="h-3 w-3 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600">Exchange Rate</span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Updating...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className={`w-1.5 h-1.5 rounded-full ${exchangeRate?.isLive ? 'bg-green-500 animate-pulse' : 'bg-blue-500 animate-pulse'}`} />
                <div className="text-xs font-bold text-black">
                  1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Send Amount Input Card - Black, White, Blue theme */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden hover:border-blue-500 transition-colors">
        <div className="p-3 pb-2">
          <Label htmlFor="amount" className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-blue-600 font-bold text-xl">$</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-black placeholder-gray-400 placeholder:text-2xl placeholder:font-light h-12"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Double Arrows - Black, White, Blue theme */}
      <div className="flex justify-center">
        <div className="p-1.5 bg-gray-100 rounded-full border border-gray-300">
          <ArrowUpDown className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      {/* Receiver Amount Input Card - Black, White, Blue theme */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden hover:border-blue-500 transition-colors">
        <div className="p-3 pb-2">
          <Label htmlFor="receiverAmount" className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-blue-600 font-bold text-sm">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="number"
              className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-black placeholder-gray-400 placeholder:text-2xl placeholder:font-light h-12"
              placeholder="0.00"
              value={receiverAmount}
              onChange={(e) => handleReceiveAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown - Black, White, Blue theme */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-300 shadow-sm p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-700 font-medium">Transfer fee</span>
            <span className="font-bold text-blue-600">${transferFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-sm">Total to pay</span>
              <span className="text-xl font-bold text-blue-600">
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
