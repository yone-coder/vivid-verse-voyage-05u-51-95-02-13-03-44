import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Send, TrendingUp, Clock } from 'lucide-react';
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
      {/* Exchange Rate Section - Flat & Clean */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Exchange Rate</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoadingRates && (
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            )}
            <div className="flex items-center gap-1.5 bg-white rounded-md px-2.5 py-1 border border-gray-200">
              <span className="text-sm text-gray-600">
                1 {selectedCurrency} =
              </span>
              <span className="font-semibold text-gray-900 text-sm">
                {currentRate.toFixed(2)} HTG
              </span>
            </div>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>
                {isLive ? 'Live BRH rate' : 'Cached rate'}
              </span>
            </div>
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Send Amount Input with Currency Selection */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl border-0 shadow-xl overflow-hidden backdrop-blur-sm p-[1px]">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl h-full">
        <div className="p-3 pb-2">
          <Label htmlFor="amount" className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Send size={14} className="text-purple-600" />
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-purple-700 font-semibold text-lg">{selectedCurrencyData.symbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-8 pr-20 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-purple-400 placeholder:text-2xl placeholder:font-light h-12 transition-colors duration-200 w-full outline-none"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="h-6 w-auto border-0 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-semibold text-xs px-2 py-1 rounded-full focus:ring-0 shadow-none transition-all duration-200">
                  <SelectValue>{selectedCurrency}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-purple-200 shadow-xl z-50">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-purple-700">{currency.symbol}</span>
                        <span className="text-xs text-purple-600">{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Receiver Amount Display */}
     <div className="bg-gradient-to-br from-green-500 via-teal-500 to-blue-400 rounded-xl border-0 shadow-xl overflow-hidden backdrop-blur-sm p-[1px]">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl h-full">
          <div className="p-3 pb-2">
            <Label htmlFor="receiverAmount" className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <ArrowDownLeft size={14} className="text-green-600" />
              Receiver Gets
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <span className="text-green-700 font-semibold text-lg">G</span>
              </div>
              <Input
                id="receiverAmount"
                type="text"
                className="pl-12 pr-12 text-2xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 h-12 w-full outline-none"
                value={receiverAmount}
                readOnly
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-xs font-semibold text-green-700 bg-gradient-to-r from-green-100 to-teal-100 px-2 py-0.5 rounded-full">
                  HTG
                </span>
              </div>
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
