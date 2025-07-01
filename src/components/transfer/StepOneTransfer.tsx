import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Exchange Rate Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/60 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Exchange rate
          </span>
          <div className="flex items-center gap-3">
            {isLoadingRates && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
              <span className="font-bold text-slate-800 text-sm">
                1 {selectedCurrency} = {currentRate.toFixed(2)} HTG
              </span>
            </div>
          </div>
        </div>
        {lastUpdated && (
          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            {isLive ? 'Live BRH rate' : 'Cached rate'} • Updated {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Send Amount Input with Currency Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-5 pb-4">
          <Label htmlFor="amount" className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wider">
            Send Amount
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <span className="text-slate-700 font-bold text-lg">{selectedCurrencyData.symbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-10 pr-24 text-3xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 placeholder-slate-400 placeholder:text-3xl placeholder:font-light h-14"
              placeholder="0.00"
              value={amount}
              onChange={(e) => handleSendAmountChange(e.target.value)}
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="h-8 w-auto border-0 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 font-bold text-xs px-3 py-2 rounded-full focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all duration-200">
                  <SelectValue>{selectedCurrency}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-xl z-50">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code} className="hover:bg-blue-50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{currency.symbol}</span>
                        <span className="text-xs text-slate-600">{currency.code}</span>
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
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/60 shadow-lg overflow-hidden">
        <div className="p-5 pb-4">
          <Label htmlFor="receiverAmount" className="text-xs font-bold text-slate-700 mb-3 block uppercase tracking-wider">
            Receiver Gets
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <span className="text-slate-700 font-bold text-lg">HTG</span>
            </div>
            <Input
              id="receiverAmount"
              type="text"
              className="pl-16 pr-16 text-3xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 h-14"
              value={receiverAmount}
              readOnly
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-xs font-bold text-slate-700 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                HTG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              Transfer fee
            </span>
            <span className="font-bold text-slate-800 bg-white/60 px-2 py-1 rounded-lg">
              {selectedCurrencyData.symbol}{transferFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-300/50 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">Total to pay</span>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-sm">
                <span className="text-xl font-bold">
                  {selectedCurrencyData.symbol}{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOneTransfer;