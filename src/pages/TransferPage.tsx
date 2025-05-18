
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  ArrowLeft, 
  Banknote, 
  ArrowRight,
  Send, // Using Send instead of PayPal
  DollarSign, // Using DollarSign instead of CashApp
  Smartphone,
  Globe
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// International payment methods (USD)
const internationalPaymentMethods = [
  { 
    id: 'credit-card', 
    name: 'Credit or Debit Card', 
    icon: CreditCard, 
    description: 'Safe and secure card payment',
    fee: '3.5% + $0.30' 
  },
  { 
    id: 'bank-transfer', 
    name: 'Bank Transfer / ACH', 
    icon: Banknote, 
    description: 'Direct from your bank account',
    fee: '$0.25' 
  },
  { 
    id: 'zelle', 
    name: 'Zelle', 
    icon: Send, // Fixed: using Send instead of Transfer
    description: 'Fast transfers between US banks',
    fee: 'Free' 
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    icon: Send, // Using Send icon for PayPal
    description: 'Send using your PayPal balance',
    fee: '2.9% + $0.30' 
  },
  { 
    id: 'cashapp', 
    name: 'Cash App', 
    icon: DollarSign, // Using DollarSign icon for CashApp
    description: 'Send using Cash App',
    fee: '1.5%' 
  }
];

// National payment methods (HTG - Haitian Gourdes)
const nationalPaymentMethods = [
  { 
    id: 'moncash', 
    name: 'MonCash', 
    icon: Smartphone, 
    description: 'Mobile money service by Digicel',
    fee: '1% (min 5 HTG)' 
  },
  { 
    id: 'natcash', 
    name: 'Natcash', 
    icon: Smartphone, 
    description: 'National digital wallet service',
    fee: '0.5% (min 3 HTG)' 
  },
  { 
    id: 'bank-transfer-local', 
    name: 'Local Bank Transfer', 
    icon: Banknote, 
    description: 'Transfer to Haitian banks',
    fee: '10 HTG' 
  }
];

const TransferPage: React.FC = () => {
  const navigate = useNavigate();
  const [transferType, setTransferType] = useState<'international' | 'national'>('international');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleContinue = () => {
    if (!selectedMethod || !amount || parseFloat(amount) <= 0) {
      return;
    }
    setIsDrawerOpen(true);
  };

  // Get the current payment methods based on selected transfer type
  const currentPaymentMethods = transferType === 'international' 
    ? internationalPaymentMethods 
    : nationalPaymentMethods;
  
  // Currency symbol based on transfer type
  const currencySymbol = transferType === 'international' ? '$' : 'HTG ';
  
  // Currency name for display
  const currencyName = transferType === 'international' ? 'USD' : 'Haitian Gourdes';

  // Reset selected method when changing transfer type
  const handleTransferTypeChange = (value: string) => {
    setTransferType(value as 'international' | 'national');
    setSelectedMethod(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white flex items-center p-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={handleBackClick}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Send Money to Haiti</h1>
      </div>
      
      <div className="max-w-md mx-auto p-4">
        {/* Transfer Type Tabs */}
        <Tabs 
          defaultValue="international" 
          value={transferType}
          onValueChange={handleTransferTypeChange}
          className="mb-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="international" className="flex items-center gap-2">
              <Globe size={16} />
              <span>International (USD)</span>
            </TabsTrigger>
            <TabsTrigger value="national" className="flex items-center gap-2">
              <Banknote size={16} />
              <span>National (HTG)</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="international">
            <p className="text-sm text-gray-600 mb-4">
              Send money internationally to Haiti in US Dollars from anywhere in the world.
            </p>
          </TabsContent>
          
          <TabsContent value="national">
            <p className="text-sm text-gray-600 mb-4">
              Transfer money locally within Haiti using Haitian Gourdes.
            </p>
          </TabsContent>
        </Tabs>
        
        {/* Amount Input */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <Label htmlFor="amount">Amount to send ({currencyName})</Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{currencySymbol}</span>
            </div>
            <Input
              id="amount"
              type="number"
              className="pl-7"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          {amount && parseFloat(amount) > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              * Exchange rates and fees will be calculated at checkout
            </p>
          )}
        </div>
        
        {/* Payment Method Selection */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="font-medium mb-3">Select payment method</h2>
          
          <RadioGroup 
            value={selectedMethod || ''} 
            onValueChange={setSelectedMethod}
            className="space-y-2"
          >
            {currentPaymentMethods.map((method) => {
              const Icon = method.icon;
              
              return (
                <div
                  key={method.id}
                  className={`flex items-center space-x-3 border rounded-lg p-3 transition-colors ${
                    selectedMethod === method.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <RadioGroupItem 
                    value={method.id} 
                    id={method.id} 
                    className="border-gray-400"
                  />
                  <div className="flex-1 flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${method.id === 'paypal' ? 'bg-blue-500' : 
                        method.id === 'cashapp' ? 'bg-green-500' : 
                        method.id === 'moncash' ? 'bg-red-500' :
                        method.id === 'natcash' ? 'bg-purple-500' : 'bg-gray-100'}
                    `}>
                      <Icon size={18} className={
                        ['paypal', 'cashapp', 'moncash', 'natcash'].includes(method.id) 
                          ? 'text-white' 
                          : ''
                      } />
                    </div>
                    <div>
                      <Label htmlFor={method.id} className="font-medium mb-0">{method.name}</Label>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">{method.description}</p>
                        <span className="text-xs font-semibold text-gray-500">Fee: {method.fee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>
        
        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedMethod || !amount || parseFloat(amount) <= 0}
          className="w-full"
          size="lg"
        >
          Continue to Send Money
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        
        {/* Information */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            All transfers are secure and encrypted. Recipient typically receives
            funds within 24-48 hours depending on the payment method and local conditions.
          </p>
        </div>
      </div>
      
      {/* Drawer for confirmation */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Confirm Money Transfer</DrawerTitle>
            <DrawerDescription>
              You're about to send {currencySymbol}{amount} to Haiti using {
                currentPaymentMethods.find(m => m.id === selectedMethod)?.name
              }
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <div className="rounded-lg border p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">{currencySymbol}{amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Fee:</span>
                <span className="font-medium">
                {transferType === 'international' ? (
                  selectedMethod === 'zelle' ? `${currencySymbol}0.00` : 
                  selectedMethod === 'bank-transfer' ? `${currencySymbol}0.25` : 
                  selectedMethod === 'cashapp' ? `${currencySymbol}${(parseFloat(amount) * 0.015).toFixed(2)}` :
                  selectedMethod === 'paypal' ? `${currencySymbol}${((parseFloat(amount) * 0.029) + 0.3).toFixed(2)}` :
                  `${currencySymbol}${((parseFloat(amount) * 0.035) + 0.3).toFixed(2)}`
                ) : (
                  selectedMethod === 'moncash' ? `${Math.max(5, parseFloat(amount) * 0.01).toFixed(2)} HTG` :
                  selectedMethod === 'natcash' ? `${Math.max(3, parseFloat(amount) * 0.005).toFixed(2)} HTG` :
                  '10 HTG'
                )}
                </span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                {transferType === 'international' ? (
                  selectedMethod === 'zelle' ? `${currencySymbol}${amount}` : 
                  selectedMethod === 'bank-transfer' ? `${currencySymbol}${(parseFloat(amount) + 0.25).toFixed(2)}` : 
                  selectedMethod === 'cashapp' ? `${currencySymbol}${(parseFloat(amount) * 1.015).toFixed(2)}` :
                  selectedMethod === 'paypal' ? `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.029) + 0.3)).toFixed(2)}` :
                  `${currencySymbol}${(parseFloat(amount) + ((parseFloat(amount) * 0.035) + 0.3)).toFixed(2)}`
                ) : (
                  selectedMethod === 'moncash' ? `${(parseFloat(amount) + Math.max(5, parseFloat(amount) * 0.01)).toFixed(2)} HTG` :
                  selectedMethod === 'natcash' ? `${(parseFloat(amount) + Math.max(3, parseFloat(amount) * 0.005)).toFixed(2)} HTG` :
                  `${(parseFloat(amount) + 10).toFixed(2)} HTG`
                )}
                </span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Continue to Payment</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TransferPage;
