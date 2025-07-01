
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, TrendingUp, Clock } from 'lucide-react';
import { getAllExchangeRates, CurrencyRates } from '@/utils/currencyConverter';

interface StepOneTransferProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const StepOneTransfer: React.FC<StepOneTransferProps> = ({ amount, onAmountChange }) => {
  const [receiverAmount, setReceiverAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [liveRates, setLiveRates] = useState<CurrencyRates>({
    USD: 127.5,
    EUR: 144.8,
    GBP: 168.2,
    CAD: 97.3,
    AUD: 86.1,
    CHF: 147.9,
    JPY: 0.89
  });
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);

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

  // Fetch live rates on component mount
  useEffect(() => {
    const fetchLiveRates = async () => {
      setIsLoadingRates(true);
      try {
        const rateData = await getAllExchangeRates();
        setLiveRates(rateData.rates);
        setLastUpdated(rateData.lastUpdated);
        setIsLive(rateData.isLive);
        console.log('Live exchange rates fetched:', rateData.rates);
      } catch (error) {
        console.error('Failed to fetch live exchange rates:', error);
        // Keep the default fallback rates
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
      {/* Exchange Rate Section - Enhanced Polish */}
      <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 rounded-2xl border border-blue-200/30 shadow-lg backdrop-blur-lg p-4 relative overflow-hidden">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-purple-100/20"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full blur-lg"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-100/50 rounded-lg backdrop-blur-sm border border-blue-200/30">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-blue-900 tracking-wide">Exchange Rate</span>
            </div>
            <div className="flex items-center gap-3">
              {isLoadingRates && (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-blue-200/40 shadow-sm">
                <span className="text-sm text-blue-700 font-semibold">
                  1 {selectedCurrency} =
                </span>
                <span className="font-bold text-blue-900 text-lg">
                  {currentRate.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  HTG
                </span>
              </div>
            </div>
          </div>
          
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs text-blue-600/70 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-blue-200/20">
              <div className="p-1 bg-blue-100/50 rounded-full">
                <Clock className="w-3 h-3 text-blue-600" />
              </div>
              <span className="font-semibold">
                {isLive ? 'Live BRH rate' : 'Cached rate'}
              </span>
              <span className="text-blue-400">•</span>
              <span className="font-medium">Updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Send Amount Input with Currency Selection */}
      <div className="bg-white rounded-xl border border-gray-400 shadow-sm overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="amount" className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-slate-700 font-bold text-sm">{selectedCurrencyData.symbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-20 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-slate-400 placeholder:text-2xl placeholder:font-light h-12"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="h-6 w-auto border-0 bg-slate-200 text-slate-700 font-bold text-xs px-2 py-1 rounded-full focus:ring-0 shadow-none">
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
      <div className="bg-white rounded-xl border border-gray-400 shadow-sm overflow-hidden">
        <div className="p-3 pb-2">
          <Label htmlFor="receiverAmount" className="text-xs font-bold text-slate-700 mb-2 block uppercase tracking-wide">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-slate-700 font-bold text-sm">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="text"
              className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 h-12"
              value={receiverAmount}
              readOnly
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl border border-gray-300 p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Transfer fee</span>
            <span className="font-bold text-slate-800">
              {selectedCurrencyData.symbol}{transferFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Total to pay</span>
              <span className="text-xl font-bold text-slate-800">
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
