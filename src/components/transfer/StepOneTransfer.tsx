import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, TrendingUp, Send, Receipt, Calculator } from 'lucide-react';

interface StepOneTransferProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const StepOneTransfer: React.FC<StepOneTransferProps> = ({ amount, onAmountChange }) => {
  const [receiverAmount, setReceiverAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [liveRates, setLiveRates] = useState<{[key: string]: number}>({
    USD: 127.5,
    EUR: 144.8,
    GBP: 168.2,
    CAD: 97.3,
    AUD: 86.1,
    CHF: 147.9,
    JPY: 0.89
  });
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
  const [isLive, setIsLive] = useState(true);

  // Currency options
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
  ];

  // Simulate fetching live rates on component mount
  useEffect(() => {
    const fetchLiveRates = async () => {
      setIsLoadingRates(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Keep the default rates for demo
        setLastUpdated(new Date());
        setIsLive(true);
        console.log('Live exchange rates fetched');
      } catch (error) {
        console.error('Failed to fetch live exchange rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchLiveRates();
  }, []);

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency) || currencies[0];
  const currentRate = liveRates[selectedCurrency] || 127.5;

  useEffect(() => {
    const sendAmount = parseFloat(amount) || 0;
    const htgAmount = sendAmount * currentRate;
    setReceiverAmount(htgAmount.toFixed(2));
  }, [amount, currentRate]);

  const handleSendAmountChange = (value: string) => {
    onAmountChange(value);
  };

  const sendAmount = parseFloat(amount) || 0;
  const transferFee = Math.ceil(sendAmount / 100) * 15; // $15 per $100 equivalent
  const totalAmount = sendAmount + transferFee;

  return (
    <div className="space-y-4">
      {/* Enhanced Exchange Rate Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-xl border border-blue-200/60 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">Live Exchange Rate</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoadingRates && (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="font-bold text-slate-800 text-lg">
                1{selectedCurrencyData.symbol} = {currentRate.toFixed(0)}G
              </span>
            </div>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
            <div className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {isLive ? 'Live BRH rate' : 'Cached rate'}
              </span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>

      {/* Send Amount Input with Currency Selection */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-xl border border-emerald-200/60 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="amount" className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
              <Send className="w-4 h-4 text-emerald-600" />
              Send Amount
            </Label>
            <div className="text-xs text-emerald-600 font-medium bg-emerald-100 px-2 py-0.5 rounded-full">
              You Send
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-emerald-700 font-bold text-lg">{selectedCurrencyData.symbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-10 pr-24 text-5xl font-light border border-gray-300 shadow-none focus-visible:ring-0 bg-white text-emerald-900 placeholder-slate-400 placeholder:text-2xl placeholder:font-normal h-16 focus:bg-white focus:border-gray-400 transition-colors duration-200 rounded-lg"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="h-7 w-auto border-0 bg-emerald-200 hover:bg-emerald-300 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full focus:ring-0 shadow-none transition-colors duration-200 flex items-center gap-1">
                  <SelectValue>{selectedCurrency}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white z-50 border border-emerald-200">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code} className="hover:bg-emerald-50">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-emerald-700">{currency.symbol}</span>
                        <span className="text-xs text-emerald-600">{currency.code}</span>
                        <span className="text-xs text-slate-500">- {currency.name}</span>
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
      <div className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-xl border border-violet-200/60 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="receiverAmount" className="text-xs font-bold text-violet-800 uppercase tracking-wide flex items-center gap-1">
              <Receipt className="w-4 h-4 text-violet-600" />
              Receiver Gets
            </Label>
            <div className="text-xs text-violet-600 font-medium bg-violet-100 px-2 py-0.5 rounded-full">
              They Receive
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-violet-700 font-bold text-lg">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="text"
              className="pl-16 pr-20 text-5xl font-light border border-gray-300 shadow-none focus-visible:ring-0 bg-white text-violet-900 h-16 focus:bg-white focus:border-gray-400 transition-colors duration-200 rounded-lg"
              value={receiverAmount}
              readOnly
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-xs font-bold text-violet-700 bg-violet-200 px-3 py-1 rounded-full">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-xl border border-amber-200/60 shadow-md p-3 hover:shadow-lg transition-shadow duration-200">
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-3 h-3 text-amber-600" />
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Fee Breakdown</span>
            </div>
            <div className="text-xs text-amber-600 font-medium bg-amber-100 px-2 py-0.5 rounded-full">
              Summary
            </div>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-amber-700 font-medium">Transfer fee</span>
            <span className="font-bold text-amber-900">
              {selectedCurrencyData.symbol}{transferFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-amber-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-sm flex items-center gap-1">
                <Calculator className="w-3 h-3 text-amber-700" />
                Total to pay
              </span>
              <span className="text-xl font-bold text-amber-900">
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