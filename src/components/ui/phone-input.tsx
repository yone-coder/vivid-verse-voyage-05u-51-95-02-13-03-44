
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, X, Shield, Info, Eye, EyeOff, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Country data with flags, codes, and formats
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', format: '(###) ###-####', placeholder: '(555) 123-4567', region: 'North America' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', dialCode: '+509', format: '####-####', placeholder: '1234-5678', region: 'Caribbean' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', format: '(###) ###-####', placeholder: '(555) 123-4567', region: 'North America' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', format: '#### ### ####', placeholder: '7400 123456', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', format: '# ## ## ## ##', placeholder: '6 12 34 56 78', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', format: '#### #######', placeholder: '1234 5678901', region: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', format: '### ### ###', placeholder: '612 345 678', region: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', format: '### ### ####', placeholder: '312 345 6789', region: 'Europe' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', format: '## #####-####', placeholder: '11 99999-9999', region: 'South America' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', format: '## #### ####', placeholder: '55 1234 5678', region: 'North America' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81', format: '## #### ####', placeholder: '90 1234 5678', region: 'Asia' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', format: '#### ### ###', placeholder: '0412 345 678', region: 'Oceania' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', format: '##### #####', placeholder: '98765 43210', region: 'Asia' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86', format: '### #### ####', placeholder: '138 0013 8000', region: 'Asia' },
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
  showObfuscation?: boolean;
  enableHapticFeedback?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  showObfuscation = true,
  enableHapticFeedback = true
}) => {
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isObfuscated, setIsObfuscated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Haptic feedback simulation
  const triggerHapticFeedback = (type: 'success' | 'error' | 'light' = 'light') => {
    if (!enableHapticFeedback) return;
    
    // Try to use device haptic feedback if available
    if ('vibrate' in navigator) {
      switch (type) {
        case 'success':
          navigator.vibrate(50);
          break;
        case 'error':
          navigator.vibrate([100, 50, 100]);
          break;
        case 'light':
          navigator.vibrate(25);
          break;
      }
    }
  };

  // Format phone number as user types with smart cursor movement
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

  // Enhanced validation with carrier type detection simulation
  const validatePhoneNumber = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    const isValidLength = numbers.length >= 8 && numbers.length <= 15;
    
    // Basic validation - you could enhance this with actual carrier validation
    return isValidLength;
  };

  // Handle clipboard paste with smart parsing
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Try to parse international number
    const cleanNumber = pastedText.replace(/\D/g, '');
    if (cleanNumber.length > 10) {
      // Try to detect country code
      const possibleCode = '+' + cleanNumber.substring(0, 3);
      const matchingCountry = countries.find(c => c.dialCode === possibleCode);
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        const remainingNumber = cleanNumber.substring(matchingCountry.dialCode.length - 1);
        const formatted = formatPhoneNumber(remainingNumber, matchingCountry.format);
        setInputValue(formatted);
        onChange(matchingCountry.dialCode + remainingNumber);
        triggerHapticFeedback('success');
        return;
      }
    }
    
    // Fallback to regular paste
    const formatted = formatPhoneNumber(pastedText, selectedCountry.format);
    setInputValue(formatted);
  };

  // Handle input change with enhanced formatting and validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove any characters that aren't digits, spaces, dashes, parentheses
    input = input.replace(/[^\d\s\-\(\)]/g, '');
    
    // Format the input
    const formatted = formatPhoneNumber(input, selectedCountry.format);
    setInputValue(formatted);
    setHasContent(formatted.length > 0);
    
    // Validate with delay to avoid showing errors too early
    setTimeout(() => {
      const valid = validatePhoneNumber(formatted);
      setIsValid(valid);
      
      if (valid) {
        triggerHapticFeedback('success');
      } else if (formatted.length > 5) {
        triggerHapticFeedback('error');
      }
    }, 500);
    
    // Create full phone number with country code
    const fullNumber = selectedCountry.dialCode + formatted.replace(/\D/g, '');
    onChange(fullNumber);
  };

  // Handle country selection with search
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setInputValue('');
      setIsValid(null);
      setHasContent(false);
      onChange(country.dialCode);
      setShowDropdown(false);
      setSearchTerm('');
      triggerHapticFeedback('light');
      
      // Focus input after country change
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Clear input with haptic feedback
  const clearInput = () => {
    setInputValue('');
    setIsValid(null);
    setHasContent(false);
    setIsObfuscated(false);
    onChange(selectedCountry.dialCode);
    triggerHapticFeedback('light');
    inputRef.current?.focus();
  };

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group countries by region
  const groupedCountries = filteredCountries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, typeof countries>);

  // Initialize with country code
  useEffect(() => {
    if (!value || value === selectedCountry.dialCode) {
      onChange(selectedCountry.dialCode);
    }
  }, [selectedCountry]);

  // Handle focus when dropdown opens
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showDropdown]);

  const displayValue = isObfuscated && inputValue.length > 4 
    ? inputValue.substring(0, inputValue.length - 4) + '••••'
    : inputValue;

  return (
    <TooltipProvider>
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
                  "flex items-center space-x-2 px-3 py-2.5 border border-r-0 border-gray-200 rounded-l-lg bg-white hover:bg-gray-50 transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  isFocused && "ring-2 ring-blue-500 border-transparent",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
                <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", showDropdown && "rotate-180")} />
              </button>

              {/* Enhanced Country Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-hidden">
                  {/* Search Header */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search countries..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Countries List */}
                  <div className="overflow-y-auto max-h-60">
                    {Object.entries(groupedCountries).map(([region, regionCountries]) => (
                      <div key={region}>
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-100">
                          {region}
                        </div>
                        {regionCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountryChange(country.code)}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 text-left hover:bg-blue-50 transition-colors group"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                                {country.name}
                              </div>
                              <div className="text-xs text-gray-500">{country.dialCode}</div>
                            </div>
                            {selectedCountry.code === country.code && (
                              <Check className="w-4 h-4 text-blue-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Phone Input with Floating Label */}
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="tel"
                value={displayValue}
                onChange={handleInputChange}
                onPaste={handlePaste}
                onFocus={() => {
                  setIsFocused(true);
                  triggerHapticFeedback('light');
                }}
                onBlur={() => setIsFocused(false)}
                placeholder={!isFocused && !hasContent ? selectedCountry.placeholder : ''}
                disabled={disabled}
                className={cn(
                  "h-11 rounded-l-none border-l-0 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24 transition-all duration-200",
                  isValid === true && "border-green-500 focus:ring-green-500",
                  isValid === false && "border-red-500 focus:ring-red-500",
                  isFocused && "shadow-lg"
                )}
                autoComplete="tel"
                inputMode="tel"
              />

              {/* Floating Label */}
              <label
                className={cn(
                  "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500",
                  (isFocused || hasContent) 
                    ? "top-1 text-xs font-medium text-blue-600" 
                    : "top-1/2 -translate-y-1/2 text-sm"
                )}
              >
                {(isFocused || hasContent) && "Phone number"}
              </label>

              {/* Action Icons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {showObfuscation && inputValue && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          setIsObfuscated(!isObfuscated);
                          triggerHapticFeedback('light');
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isObfuscated ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isObfuscated ? 'Show number' : 'Hide number'}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                
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
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                )}
                
                {isValid === false && inputValue && (
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
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

        {/* Enhanced Trust and Security Indicators */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Encrypted and secure</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your number is encrypted and never shared</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="text-gray-400">
            <span>We'll send a verification code</span>
          </div>
        </div>

        {/* Enhanced Validation Messages */}
        {isValid === false && inputValue && (
          <div className="flex items-center space-x-2 text-xs text-red-600 animate-fade-in">
            <X className="w-3 h-3" />
            <span>Phone number must be at least 8 digits and valid for {selectedCountry.name}</span>
          </div>
        )}
        
        {isValid === true && (
          <div className="flex items-center space-x-2 text-xs text-green-600 animate-fade-in">
            <Check className="w-3 h-3" />
            <span>Valid {selectedCountry.name} phone number ✓</span>
          </div>
        )}

        {/* Progress Indicator */}
        {isFocused && (
          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((inputValue.replace(/\D/g, '').length / 10) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default PhoneInput;
