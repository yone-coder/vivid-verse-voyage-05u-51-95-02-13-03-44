import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, TrendingUp, ArrowRightLeft } from 'lucide-react';
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

  // Currency options with enhanced data
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' }
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
    <div className="space-y-8">
      {/* Enhanced Exchange Rate Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">Live Exchange Rate</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoadingRates && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-blue-200/50">
              <span className="font-bold text-gray-900 text-lg">
                1 {selectedCurrency} = {currentRate.toFixed(2)} HTG
              </span>
            </div>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">
              {isLive ? 'Live BRH rate' : 'Cached rate'} • Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Send Amount Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:border-blue-300">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-6 py-4 border-b border-gray-100">
            <Label htmlFor="amount" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span className="text-blue-600">💸</span>
              You Send
            </Label>
          </div>
          <div className="p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <span className="text-gray-600 font-bold text-xl">{selectedCurrencyData.symbol}</span>
              </div>
              <Input
                id="amount"
                type="number"
                className="pl-12 pr-32 text-3xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-gray-900 placeholder-gray-400 placeholder:text-3xl placeholder:font-light h-16 text-center"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleSendAmountChange(e.target.value)}
                min="0"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="h-10 w-auto border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{selectedCurrencyData.flag}</span>
                      <SelectValue>{selectedCurrency}</SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 border border-gray-200 rounded-xl shadow-xl">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center space-x-3 py-1">
                          <span className="text-lg">{currency.flag}</span>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{currency.symbol}</span>
                              <span className="font-medium">{currency.code}</span>
                            </div>
                            <span className="text-xs text-gray-500">{currency.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Conversion Arrow */}
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-3 shadow-md">
            <ArrowRightLeft className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Enhanced Receiver Amount Section */}
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:border-green-300">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 px-6 py-4 border-b border-green-100">
            <Label htmlFor="receiverAmount" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span className="text-green-600">🇭🇹</span>
              Recipient Gets
            </Label>
          </div>
          <div className="p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <span className="text-gray-600 font-bold text-xl">HTG</span>
              </div>
              <Input
                id="receiverAmount"
                type="text"
                className="pl-16 pr-20 text-3xl font-light border-0 shadow-none focus-visible:ring-0 bg-transparent text-gray-900 h-16 text-center"
                value={receiverAmount}
                readOnly
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="bg-green-100 text-green-700 font-bold text-sm px-4 py-2 rounded-xl border border-green-200">
                  🇭🇹 HTG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Fee Breakdown */}
      <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium flex items-center gap-2">
              <span className="text-blue-500">📊</span>
              Transfer fee
            </span>
            <span className="font-bold text-gray-800 text-lg">
              {selectedCurrencyData.symbol}{transferFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="text-green-600">💰</span>
                Total to pay
              </span>
              <span className="text-2xl font-bold text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
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
