
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import CountryCodeSelect from './CountryCodeSelect';

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: ((e: React.FormEvent) => void) | undefined;
  showSubmitButton?: boolean;
}

const PhoneTab: React.FC<PhoneTabProps> = ({ 
  phone, 
  setPhone, 
  countryCode,
  setCountryCode,
  onSubmit,
  showSubmitButton = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const formatPhoneNumber = (input: string) => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');
    
    // Format the number based on length
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  return (
    <div className="space-y-1">
      <Label 
        htmlFor="phone" 
        className="text-sm font-medium text-muted-foreground mb-1.5 ml-1"
      >
        Phone Number
      </Label>
      
      <div className="flex space-x-2">
        <div className="w-24">
          <CountryCodeSelect
            value={countryCode}
            onChange={setCountryCode}
          />
        </div>
        
        <div className="relative flex-1">
          <div className="absolute left-3 flex items-center h-full text-muted-foreground">
            <Phone className="w-4 h-4" />
          </div>
          
          <Input
            id="phone"
            type="tel"
            placeholder="000-000-0000"
            className="w-full pl-9"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="tel"
          />
        </div>
      </div>
      
      {showSubmitButton && onSubmit && (
        <Button 
          onClick={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(e as React.FormEvent);
          }} 
          type="submit" 
          className="w-full mt-4"
        >
          Continue with Phone
        </Button>
      )}
    </div>
  );
};

export default PhoneTab;
