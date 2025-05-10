
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// List of common country codes
const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+52', country: 'Mexico' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+7', country: 'Russia' },
  { code: '+31', country: 'Netherlands' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+41', country: 'Switzerland' },
  { code: '+32', country: 'Belgium' },
  { code: '+43', country: 'Austria' },
  { code: '+66', country: 'Thailand' },
  { code: '+65', country: 'Singapore' },
  { code: '+60', country: 'Malaysia' },
  { code: '+351', country: 'Portugal' },
  { code: '+353', country: 'Ireland' },
  { code: '+972', country: 'Israel' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+90', country: 'Turkey' },
  { code: '+48', country: 'Poland' },
  { code: '+36', country: 'Hungary' },
  { code: '+420', country: 'Czech Republic' }
].sort((a, b) => a.country.localeCompare(b.country));

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PhoneTab = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode, 
  onSubmit,
  showSubmitButton = false
}: PhoneTabProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Allow only digits
    const cleaned = value.replace(/\D/g, '');
    
    // Use regex to format numbers as user types (US format as example)
    let formatted = cleaned;
    if (countryCode === '+1') {
      if (cleaned.length > 0) {
        formatted = cleaned.replace(/(\d{3})(\d{3})?(\d{4})?/, (_, p1, p2, p3) => {
          let result = p1;
          if (p2) result += '-' + p2;
          if (p3) result += '-' + p3;
          return result;
        });
      }
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-24">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="+1" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72">
                  {countryCodes.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      <span>{item.code} ({item.country})</span>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-grow">
            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone number"
              className={`focus:ring-2 focus:ring-offset-1 transition-all ${
                isFocused ? 'border-[#ff4747] ring-[#ff4747]/50' : 'border-input'
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
            />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          We'll send a verification code to this number
        </p>
        
        {showSubmitButton && (
          <Button 
            type="submit" 
            className="w-full mt-3 bg-[#ff4747] hover:bg-[#ff2727]"
            disabled={!phone}
          >
            <span>Continue</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default PhoneTab;
