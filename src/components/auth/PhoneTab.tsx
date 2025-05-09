
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Phone, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorldFlag from 'react-world-flags';

// Dummy country data - in a real app, we'd want more complete data
const countries = [
  { code: '+1', name: 'United States', iso: 'us' },
  { code: '+44', name: 'United Kingdom', iso: 'gb' },
  { code: '+91', name: 'India', iso: 'in' },
  { code: '+86', name: 'China', iso: 'cn' },
  { code: '+81', name: 'Japan', iso: 'jp' },
  { code: '+49', name: 'Germany', iso: 'de' },
  { code: '+33', name: 'France', iso: 'fr' },
  { code: '+61', name: 'Australia', iso: 'au' },
  { code: '+55', name: 'Brazil', iso: 'br' },
  { code: '+7', name: 'Russia', iso: 'ru' },
];

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
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
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Validate phone number format (basic validation)
  useEffect(() => {
    // Just a basic check, in a real app we'd use a proper phone validation library
    const phoneRegex = /^\d{7,15}$/;
    const isValid = phoneRegex.test(phone);
    setIsValidPhone(isValid);
    
    // Show validation success animation when validation passes
    if (isValid && phone.length > 0) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => {
        setShowValidationSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phone]);

  // Handle country code change
  const handleCountryChange = (value: string) => {
    setCountryCode(value);
    
    // Focus on the phone input after country selection
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPhone && onSubmit) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onSubmit(e);
      }, 600);
    }
  };

  // Find country data
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  return (
    <div className="w-full space-y-3">
      {/* Centered message */}
      <div className="text-center mb-3">
        <p className="text-sm text-muted-foreground">
          Please enter your phone number to continue
        </p>
      </div>

      {/* Phone Input with Country Code */}
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <div className="w-[90px] flex-shrink-0">
          <Select value={countryCode} onValueChange={handleCountryChange}>
            <SelectTrigger className="h-11 pl-2 pr-1 focus:ring-offset-0">
              <SelectValue placeholder="Code">
                <div className="flex items-center gap-1.5">
                  <div className="overflow-hidden rounded-full w-5 h-5 bg-background">
                    <WorldFlag code={selectedCountry.iso} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm">{countryCode}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code} className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="overflow-hidden rounded-full w-5 h-5 bg-background flex-shrink-0">
                      <WorldFlag code={country.iso} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm truncate">{country.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{country.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phone number input */}
        <div className="relative flex-1">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 transition-all duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`}>
            <Phone className="h-[15px] w-[15px]" />
          </div>
          
          <Input
            ref={phoneInputRef}
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Phone number"
            className={`w-full pl-10 pr-4 h-11 text-sm bg-background transition-all duration-200 ${
              isValidPhone ? 'border-green-500 focus:border-green-600 focus:ring-green-200' 
              : isFocused ? 'border-primary/30 focus:border-primary focus:ring-primary/20' 
              : 'border-input'
            }`}
          />

          {isValidPhone && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-green-500 ${showValidationSuccess ? 'animate-pulse-success' : 'animate-fadeIn'}`}>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Optional Submit Button */}
      {showSubmitButton && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValidPhone || isLoading}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            isValidPhone && !isLoading
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            <span>Continue</span>
          )}
        </button>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        
        @keyframes pulseSuccess {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .animate-pulse-success {
          animation: pulseSuccess 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PhoneTab;
