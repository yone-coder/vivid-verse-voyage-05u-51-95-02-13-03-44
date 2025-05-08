import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDown, Phone, Check, X, AlertCircle, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area";

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

type CountryType = {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
};

// Popular countries list with flags and dial codes
const popularCountries: CountryType[] = [
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81" },
  { name: "China", code: "CN", flag: "🇨🇳", dialCode: "+86" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", dialCode: "+52" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Russia", code: "RU", flag: "🇷🇺", dialCode: "+7" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", dialCode: "+82" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  // Add more popular countries as needed
];

const PhoneTab = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode,
  onSubmit,
  showSubmitButton = false
}: PhoneTabProps) => {
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Format phone number with spaces for readability
  const formatPhoneNumber = useCallback((value: string): string => {
    // Clean input, allowing only numbers
    const cleaned = value.replace(/\D/g, '');
    
    // Different formatting based on length
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)} ${cleaned.slice(10, 14)}`;
    }
  }, []);

  // Clean phone for validation (remove spaces)
  const cleanPhoneNumber = useCallback((value: string): string => {
    return value.replace(/\s/g, '');
  }, []);

  // Handle phone input with formatting
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedNumber);
  }, [formatPhoneNumber, setPhone]);

  // Handle country code selection
  const handleCountrySelect = useCallback((dialCode: string) => {
    setCountryCode(dialCode);
    setPopoverOpen(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [setCountryCode]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return popularCountries.filter(country =>
      country.name.toLowerCase().includes(query) || 
      country.code.toLowerCase().includes(query) || 
      country.dialCode.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Contextual validation based on multiple factors
  const getValidationMessage = useCallback((phoneValue: string, countryCodeValue: string) => {
    if (!phoneValue) return null;
    
    const cleaned = cleanPhoneNumber(phoneValue);
    
    if (cleaned.length < 4) return 'Enter at least 4 digits.';
    
    // Specific validation based on country code
    switch (countryCodeValue) {
      case '+1': // US, Canada
        if (cleaned.length !== 10) {
          return 'US/Canada numbers should be 10 digits.';
        }
        break;
      case '+44': // UK
        if (cleaned.length < 10 || cleaned.length > 11) {
          return 'UK numbers should be 10-11 digits.';
        }
        break;
      case '+86': // China
        if (cleaned.length !== 11) {
          return 'China mobile numbers should be 11 digits.';
        }
        break;
      case '+91': // India
        if (cleaned.length !== 10) {
          return 'India mobile numbers should be 10 digits.';
        }
        break;
      default:
        // Generic validation for other countries
        if (cleaned.length < 8 || cleaned.length > 14) {
          return 'Phone number length appears invalid.';
        }
    }
    
    // If all checks pass
    return null;
  }, [cleanPhoneNumber]);

  // Get current country flag to display
  const currentCountry = useMemo(() => {
    return popularCountries.find(country => country.dialCode === countryCode) || popularCountries[0];
  }, [countryCode]);

  // Get validation status
  const validationMessage = (submitted || (!focused && phone.length > 0)) 
    ? getValidationMessage(phone, countryCode) 
    : null;
  const isValid = !validationMessage && cleanPhoneNumber(phone).length >= 6;

  // Simulate phone validation check
  const handlePhoneFocus = useCallback(() => {
    setFocused(true);
    setSubmitted(false);
  }, []);

  const handlePhoneBlur = useCallback(() => {
    setFocused(false);
  }, []);

  // Clear phone input
  const clearInput = useCallback(() => {
    setPhone('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [setPhone]);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (isValid) {
      setChecking(true);
      
      // Simulate validation check
      setTimeout(() => {
        setChecking(false);
        if (onSubmit) onSubmit(e);
      }, 600);
    }
  }, [isValid, onSubmit]);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor="phone" className="block font-medium text-sm mb-1.5 text-foreground flex items-center">
        Phone number
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="relative group ml-1.5">
                <Info 
                  className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" 
                  aria-label="Info" 
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[220px] p-3">
              <p className="text-xs">We'll never share your phone number. Used for authentication only.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>

      {/* Phone Input with Country Code */}
      <div className="flex space-x-2">
        <div className="relative">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button 
                type="button" 
                className={`flex items-center justify-between h-11 px-3 rounded-md border shadow-sm transition-all ${
                  focused 
                    ? "border-primary/30 ring-2 ring-primary/20" 
                    : "border-input hover:border-input"
                }`}
                aria-label="Select country code"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 mr-1.5 overflow-hidden">
                  <span className="text-base leading-none">{currentCountry.flag}</span>
                </div>
                <span className="text-sm font-medium">{countryCode}</span>
                <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[260px] p-2" align="start">
              <div className="mb-2 sticky top-0 bg-popover z-10 pb-2">
                <Input
                  ref={searchInputRef}
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm"
                  autoFocus
                />
              </div>
              <ScrollArea className="h-[320px]">
                <div className="grid gap-1">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      className={`flex items-center justify-between px-2 py-2 rounded-md text-sm hover:bg-muted cursor-pointer ${
                        country.dialCode === countryCode ? "bg-muted" : ""
                      }`}
                      onClick={() => handleCountrySelect(country.dialCode)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden">
                          <span className="text-base leading-none">{country.flag}</span>
                        </div>
                        <span>{country.name}</span>
                      </div>
                      <span className="text-muted-foreground">{country.dialCode}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-2 py-4 text-center text-muted-foreground text-sm">
                      No countries match your search
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 transition-all duration-200 text-muted-foreground">
            <Phone className="h-[15px] w-[15px]" />
          </div>
          
          <Input
            ref={inputRef}
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            placeholder="Phone number"
            className={`w-full pl-10 pr-10 h-11 text-sm bg-background transition-all duration-200 rounded-md shadow-sm ${
              validationMessage 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5' 
                : isValid 
                  ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10' 
                  : focused 
                    ? 'border-primary/30 focus:border-primary focus:ring-primary/20' 
                    : 'border-input hover:border-input focus:border-input focus:ring-ring/20'
            }`}
            aria-invalid={!!validationMessage}
            aria-describedby={validationMessage ? "phone-validation-error" : undefined}
          />
          
          {/* Status Indicators */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {checking && (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin mr-1" aria-label="Checking phone" />
            )}
            
            {phone.length > 0 && (
              <button
                type="button"
                onClick={clearInput}
                tabIndex={0}
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1 transition-colors"
                aria-label="Clear input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {isValid && !checking && (
              <Check
                className="h-4 w-4 text-green-500 animate-fadeIn"
                aria-label="Valid phone"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Validation Message */}
      <AnimatePresence>
        {validationMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-1.5 text-xs text-destructive mt-1.5 bg-destructive/5 px-3 py-1.5 rounded-md border border-destructive/10 overflow-hidden"
            id="phone-validation-error"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>{validationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Format Hint */}
      {focused && !isValid && phone.length > 0 && !validationMessage && (
        <div className="text-xs text-muted-foreground mt-1.5">
          Enter your full phone number including area code
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isValid || checking}
            className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
              isValid && !checking
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {checking ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </span>
            ) : (
              <span className="relative z-10">Continue</span>
            )}
          </button>
        </motion.div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-5px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PhoneTab;
