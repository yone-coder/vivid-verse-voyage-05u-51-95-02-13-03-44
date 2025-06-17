
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, Smartphone, DollarSign } from 'lucide-react';

interface TransferDetails {
  receivingCountry: string;
  deliveryMethod: string;
}

interface StepOnePointFiveTransferProps {
  transferDetails: TransferDetails;
  onTransferDetailsChange: (details: TransferDetails) => void;
}

const StepOnePointFiveTransfer: React.FC<StepOnePointFiveTransferProps> = ({
  transferDetails,
  onTransferDetailsChange
}) => {
  const countries = [
    { value: 'haiti', label: 'Haiti', flag: '🇭🇹' },
    { value: 'dominican-republic', label: 'Dominican Republic', flag: '🇩🇴' },
    { value: 'jamaica', label: 'Jamaica', flag: '🇯🇲' },
    { value: 'mexico', label: 'Mexico', flag: '🇲🇽' },
    { value: 'guatemala', label: 'Guatemala', flag: '🇬🇹' },
    { value: 'colombia', label: 'Colombia', flag: '🇨🇴' }
  ];

  const deliveryMethods = [
    {
      id: 'cash-pickup',
      title: 'Cash Pickup',
      description: 'Recipient picks up cash at a location',
      icon: MapPin,
      popular: true
    },
    {
      id: 'moncash',
      title: 'MonCash',
      description: 'Direct to MonCash mobile wallet',
      icon: Smartphone,
      popular: false
    },
    {
      id: 'natcash',
      title: 'NatCash',
      description: 'Direct to NatCash account',
      icon: DollarSign,
      popular: false
    }
  ];

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
      {/* Country Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-gray-700">
          Which country are you sending to?
        </Label>
        <Select value={transferDetails.receivingCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center space-x-2">
                  <span>{country.flag}</span>
                  <span>{country.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delivery Method Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium text-gray-700">
          How should they receive the money?
        </Label>
        <RadioGroup 
          value={transferDetails.deliveryMethod} 
          onValueChange={handleDeliveryMethodChange}
          className="space-y-3"
        >
          {deliveryMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  transferDetails.deliveryMethod === method.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleDeliveryMethodChange(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      className="border-gray-300"
                    />
                    <div className={`p-2 rounded-lg ${
                      transferDetails.deliveryMethod === method.id
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={method.id} className="font-medium text-gray-900 cursor-pointer">
                          {method.title}
                        </Label>
                        {method.popular && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default StepOnePointFiveTransfer;
