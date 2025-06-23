
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, X, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Country data with flags, codes, and formats
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', format: '(###) ###-####', placeholder: '(555) 123-4567' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', dialCode: '+509', format: '####-####', placeholder: '1234-5678' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', format: '(###) ###-####', placeholder: '(555) 123-4567' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', format: '#### ### ####', placeholder: '7400 123456' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', format: '# ## ## ## ##', placeholder: '6 12 34 56 78' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', format: '#### #######', placeholder: '1234 5678901' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', format: '### ### ###', placeholder: '612 345 678' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', format: '### ### ####', placeholder: '312 345 6789' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', format: '## #####-####', placeholder: '11 99999-9999' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', format: '## #### ####', placeholder: '55 1234 5678' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81', format: '## #### ####', placeholder: '90 1234 5678' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', format: '#### ### ###', placeholder: '0412 345 678' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', format: '##### #####', placeholder: '98765 43210' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86', format: '### #### ####', placeholder: '138 0013 8000' },
];

// Auto-detect user's country based on locale (simplified)
const getDefaultCountry = () => {
  const locale = navigator.language || 'en-US';
  const countryCode = locale.split('-')[1];
  return countries.find(c => c.code === countryCode) || countries[1]; // Default to Haiti
};

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  disabled = false,
  className
}) => {
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format phone number as user types
  const formatPhoneNumber = (input: string, format: string) => {
    const numbers = input.replace(/\D/g, '');
    let formatted = '';
    let numberIndex = 0;

    for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
      if (format[i] === '#') {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        formatted += format[i];
      }
    }

    return formatted;
  };

  // Validate phone number
  const validatePhoneNumber = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    // Basic validation - adjust based on country requirements
    return numbers.length >= 8 && numbers.length <= 15;
  };

  // Handle input change with formatting and validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove any characters that aren't digits, spaces, dashes, parentheses
    input = input.replace(/[^\d\s\-\(\)]/g, '');
    
    // Format the input
    const formatted = formatPhoneNumber(input, selectedCountry.format);
    setInputValue(formatted);
    
    // Validate
    const valid = validatePhoneNumber(formatted);
    setIsValid(valid);
    
    // Create full phone number with country code
    const fullNumber = selectedCountry.dialCode + formatted.replace(/\D/g, '');
    onChange(fullNumber);
  };

  // Handle country selection
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setInputValue('');
      setIsValid(null);
      onChange(country.dialCode);
      setShowDropdown(false);
      
      // Focus input after country change
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Clear input
  const clearInput = () => {
    setInputValue('');
    setIsValid(null);
    onChange(selectedCountry.dialCode);
    inputRef.current?.focus();
  };

  // Initialize with country code
  useEffect(() => {
    if (!value || value === selectedCountry.dialCode) {
      onChange(selectedCountry.dialCode);
    }
  }, [selectedCountry]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <div className="flex">
          {/* Country Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={disabled}
              className={cn(
                "flex items-center space-x-2 px-3 py-2.5 border border-r-0 border-gray-200 rounded-l-lg bg-white hover:bg-gray-50 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Country Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 mb-2 px-2">Select Country</div>
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountryChange(country.code)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.dialCode}</div>
                      </div>
                      {selectedCountry.code === country.code && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phone Input */}
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="tel"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={selectedCountry.placeholder}
              disabled={disabled}
              className={cn(
                "h-11 rounded-l-none border-l-0 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20",
                isValid === true && "border-green-500 focus:ring-green-500",
                isValid === false && "border-red-500 focus:ring-red-500"
              )}
            />

            {/* Validation Icon & Clear Button */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {inputValue && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {isValid === true && (
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
              )}
              
              {isValid === false && inputValue && (
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-red-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Close dropdown when clicking outside */}
        {showDropdown && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>

      {/* Trust Indicator */}
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <Shield className="w-3 h-3" />
        <span>Your number is safe and secure</span>
      </div>

      {/* Validation Messages */}
      {isValid === false && inputValue && (
        <div className="text-xs text-red-600">
          Please enter a valid phone number (at least 8 digits)
        </div>
      )}
      
      {isValid === true && (
        <div className="text-xs text-green-600">
          Valid phone number ✓
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
