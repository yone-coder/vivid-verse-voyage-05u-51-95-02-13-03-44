import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from 'lucide-react';

interface StepOneTransferProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const StepOneTransfer: React.FC<StepOneTransferProps> = ({ amount, onAmountChange }) => {
  const [receiverAmount, setReceiverAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Currency options with exchange rates to HTG
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 132.5 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 144.8 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 168.2 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 97.3 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 86.1 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 147.9 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 0.89 }
  ];

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  useEffect(() => {
    const sendAmount = parseFloat(amount) || 0;
    const htgAmount = sendAmount * selectedCurrencyData.rate;
    setReceiverAmount(htgAmount.toFixed(2));
  }, [amount, selectedCurrencyData.rate]);

  const handleSendAmountChange = (value: string) => {
    onAmountChange(value);
  };

  const sendAmount = parseFloat(amount) || 0;
  const transferFee = Math.ceil(sendAmount / 100) * 15; // $15 per $100 equivalent
  const totalAmount = sendAmount + transferFee;

  return (
    <div className="space-y-4">
      {/* Exchange Rate Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Exchange rate</span>
          <span className="font-bold text-blue-600">
            1 {selectedCurrency} = {selectedCurrencyData.rate} HTG
          </span>
        </div>
      </div>

      {/* Send Amount Input with Currency Selection */}
      <div className="bg-white rounded-xl border border-blue-300 overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="amount" className="text-xs font-bold text-blue-600 mb-2 block uppercase tracking-wide">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-blue-600 font-bold text-sm">{selectedCurrencyData.symbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-20 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-gray-900 placeholder-blue-300 placeholder:text-2xl placeholder:font-light h-12"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="h-6 w-auto border-0 bg-blue-100 text-blue-600 font-bold text-xs px-2 py-1 rounded-full focus:ring-0 shadow-none">
                  <SelectValue>{selectedCurrency}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{currency.symbol}</span>
                        <span className="text-xs">{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Receiver Amount Display */}
      <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="receiverAmount" className="text-xs font-bold text-green-600 mb-2 block uppercase tracking-wide">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-green-600 font-bold text-sm">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="text"
              className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-gray-900 h-12"
              value={receiverAmount}
              readOnly
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Transfer fee</span>
            <span className="font-bold text-blue-600">
              {selectedCurrencyData.symbol}{transferFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-blue-100 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 text-sm">Total to pay</span>
              <span className="text-xl font-bold text-blue-600">
                {selectedCurrencyData.symbol}{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;
