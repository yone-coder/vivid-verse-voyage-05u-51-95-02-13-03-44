
import React, { useState, useEffect } from 'react';
import { Loader2, TrendingUp, ArrowUpDown } from 'lucide-react';
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
    <div className="max-w-md mx-auto space-y-6">
      {/* Exchange Rate Card */}
      <div className="bg-card rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-lg">
              <TrendingUp className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Exchange Rate</span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Updating...</span>
            </div>
          ) : (
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className={`w-2 h-2 rounded-full ${exchangeRate?.isLive ? 'bg-green-500' : 'bg-primary'} animate-pulse`} />
                <div className="text-sm font-semibold text-foreground">
                  1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Send Amount Input Card */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-4">
          <Label htmlFor="amount" className="text-sm font-medium text-foreground mb-3 block">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-foreground font-semibold text-xl">$</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-16 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground placeholder:text-2xl placeholder:font-light h-14"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Arrow */}
      <div className="flex justify-center">
        <div className="p-2 bg-muted rounded-full border">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Receiver Amount Input Card */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-4">
          <Label htmlFor="receiverAmount" className="text-sm font-medium text-foreground mb-3 block">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-foreground font-semibold text-sm">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="number"
              className="pl-12 pr-16 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground placeholder:text-2xl placeholder:font-light h-14"
              placeholder="0.00"
              value={receiverAmount}
              onChange={(e) => handleReceiveAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-muted/50 rounded-lg border p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transfer fee</span>
            <span className="font-medium text-foreground">${transferFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total to pay</span>
              <span className="text-xl font-bold text-foreground">
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
