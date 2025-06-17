
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MapPin, Building, Smartphone, Home, CreditCard } from 'lucide-react';

interface TransferDetails {
  receivingCountry: string;
  deliveryMethod: string;
}

interface StepOnePointFiveTransferProps {
  transferDetails: TransferDetails;
  onTransferDetailsChange: (details: TransferDetails) => void;
}

const countries = [
  { value: 'haiti', label: 'Haiti', flag: '🇭🇹' },
  { value: 'dominican-republic', label: 'Dominican Republic', flag: '🇩🇴' },
  { value: 'jamaica', label: 'Jamaica', flag: '🇯🇲' },
  { value: 'trinidad-tobago', label: 'Trinidad & Tobago', flag: '🇹🇹' },
];

const deliveryMethods = [
  {
    id: 'bank-deposit',
    label: 'Bank Deposit',
    description: 'Direct deposit to bank account',
    icon: Building,
  },
  {
    id: 'cash-pickup',
    label: 'Cash Pickup',
    description: 'Pick up cash at agent locations',
    icon: MapPin,
  },
  {
    id: 'mobile-wallet',
    label: 'Mobile Wallet (MonCash)',
    description: 'Send to mobile wallet',
    icon: Smartphone,
  },
  {
    id: 'home-delivery',
    label: 'Home Delivery',
    description: 'Delivered to recipient\'s home',
    icon: Home,
    optional: true,
  },
];

const StepOnePointFiveTransfer: React.FC<StepOnePointFiveTransferProps> = ({
  transferDetails,
  onTransferDetailsChange
}) => {
  const handleCountryChange = (country: string) => {
    onTransferDetailsChange({
      ...transferDetails,
      receivingCountry: country
    });
  };

  const handleDeliveryMethodChange = (method: string) => {
    onTransferDetailsChange({
      ...transferDetails,
      deliveryMethod: method
    });
  };

  return (
    <div className="space-y-6">
      {/* Receiving Country Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Select receiving country
        </Label>
        <Select
          value={transferDetails.receivingCountry}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Choose a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delivery Method Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Select delivery method
        </Label>
        <RadioGroup
          value={transferDetails.deliveryMethod}
          onValueChange={handleDeliveryMethodChange}
          className="space-y-3"
        >
          {deliveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{method.label}</span>
                        {method.optional && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {method.description}
                      </p>
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default StepOnePointFiveTransfer;
