
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  ArrowLeft, 
  Banknote, 
  ArrowRight,
  Send, // Using Send instead of PayPal
  DollarSign // Using DollarSign instead of CashApp
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

const paymentMethods = [
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

const TransferPage: React.FC = () => {
  const navigate = useNavigate();
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
        {/* Amount Input */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <Label htmlFor="amount">Amount to send (USD)</Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
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
            {paymentMethods.map((method) => {
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
                      ${method.id === 'paypal' ? 'bg-blue-500' : method.id === 'cashapp' ? 'bg-green-500' : 'bg-gray-100'}
                    `}>
                      <Icon size={18} className={method.id === 'paypal' || method.id === 'cashapp' ? 'text-white' : ''} />
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
              You're about to send ${amount} to Haiti using {
                paymentMethods.find(m => m.id === selectedMethod)?.name
              }
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <div className="rounded-lg border p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Fee:</span>
                <span className="font-medium">{
                  selectedMethod === 'zelle' ? '$0.00' : 
                  selectedMethod === 'bank-transfer' ? '$0.25' : 
                  selectedMethod === 'cashapp' ? `$${(parseFloat(amount) * 0.015).toFixed(2)}` :
                  selectedMethod === 'paypal' ? `$${((parseFloat(amount) * 0.029) + 0.3).toFixed(2)}` :
                  `$${((parseFloat(amount) * 0.035) + 0.3).toFixed(2)}`
                }</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{
                  selectedMethod === 'zelle' ? `$${amount}` : 
                  selectedMethod === 'bank-transfer' ? `$${(parseFloat(amount) + 0.25).toFixed(2)}` : 
                  selectedMethod === 'cashapp' ? `$${(parseFloat(amount) * 1.015).toFixed(2)}` :
                  selectedMethod === 'paypal' ? `$${(parseFloat(amount) + ((parseFloat(amount) * 0.029) + 0.3)).toFixed(2)}` :
                  `$${(parseFloat(amount) + ((parseFloat(amount) * 0.035) + 0.3)).toFixed(2)}`
                }</span>
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
