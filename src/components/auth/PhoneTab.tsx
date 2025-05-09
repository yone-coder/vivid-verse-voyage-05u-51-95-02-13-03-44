
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Phone, CheckCircle2, ChevronDown, Loader2, XCircle, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorldFlag from 'react-world-flags';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

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
  { code: '+52', name: 'Mexico', iso: 'mx' },
  { code: '+82', name: 'South Korea', iso: 'kr' },
  { code: '+34', name: 'Spain', iso: 'es' },
  { code: '+39', name: 'Italy', iso: 'it' },
  { code: '+1', name: 'Canada', iso: 'ca' },
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  useEffect(() => {
    // Load recently used country codes from localStorage
    try {
      const savedCodes = localStorage.getItem('recentCountryCodes');
      if (savedCodes) {
        setRecentlyUsed(JSON.parse(savedCodes));
      }
    } catch (error) {
      console.error('Failed to load recent country codes:', error);
    }
  }, []);

  const saveRecentCountryCode = (code: string) => {
    try {
      const updatedRecent = [code, ...recentlyUsed.filter(c => c !== code)].slice(0, 3);
      setRecentlyUsed(updatedRecent);
      localStorage.setItem('recentCountryCodes', JSON.stringify(updatedRecent));
    } catch (error) {
      console.error('Failed to save recent country code:', error);
    }
  };

  // Format phone number as user types (basic US format example)
  const formatPhoneNumber = (value: string) => {
    if (countryCode === '+1') {
      // For US numbers (123) 456-7890
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    } else {
      // For other countries, just use spaces for readability
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        return cleaned;
      } else if (cleaned.length <= 8) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      } else {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
      }
    }
  };

  // Extract digits only from formatted phone number
  const getDigitsOnly = (formatted: string) => {
    return formatted.replace(/\D/g, '');
  };

  // Validate phone number format
  const validatePhone = (phoneNumber: string) => {
    const digits = getDigitsOnly(phoneNumber);
    
    // Reset previous validation
    setValidationMessage(null);
    
    // Basic length validation
    if (digits.length < 7) {
      setIsValidPhone(false);
      if (digits.length > 0) {
        setValidationMessage('Phone number is too short');
      }
      return false;
    }
    
    if (digits.length > 15) {
      setIsValidPhone(false);
      setValidationMessage('Phone number is too long');
      return false;
    }
    
    // Country-specific validation could go here
    if (countryCode === '+1' && digits.length !== 10) {
      setIsValidPhone(false);
      setValidationMessage('US numbers should be 10 digits');
      return false;
    }
    
    setIsValidPhone(true);
    return true;
  };

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
    validatePhone(formattedPhone);
    
    // Clear existence check when number changes
    setPhoneExists(null);
  };

  // Handle country code change
  const handleCountryChange = (value: string) => {
    setCountryCode(value);
    saveRecentCountryCode(value);
    
    // Validate again with new country code
    validatePhone(phone);
    
    // Clear existence check when country changes
    setPhoneExists(null);
    
    // Focus on the phone input after country selection
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);
  };

  // Check if phone number exists in database
  const checkPhoneExists = async () => {
    setIsVerifying(true);
    
    try {
      // In a real app, we would check against the database
      // For demo purposes, we're just simulating a check
      const fullPhone = `${countryCode}${getDigitsOnly(phone)}`;
      
      // Check with Supabase if this phone exists
      const { data, error } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('phone', fullPhone)
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      const exists = data && data.length > 0;
      setPhoneExists(exists);
      
      return exists;
    } catch (error) {
      console.error('Error checking phone existence:', error);
      toast.error('Failed to verify phone number');
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if phone exists first
      const exists = await checkPhoneExists();
      
      if (onSubmit) {
        // Show validation success animation
        setShowValidationSuccess(true);
        
        // Wait a bit to show the success animation
        setTimeout(() => {
          setIsLoading(false);
          
          if (exists) {
            // Phone exists, proceed with submission
            onSubmit(e);
          } else {
            // Phone doesn't exist
            setValidationMessage('This phone number is not registered');
          }
          
          setShowValidationSuccess(false);
        }, 800);
      }
    } catch (error) {
      console.error('Error during phone verification:', error);
      setIsLoading(false);
      toast.error('Phone verification failed');
    }
  };

  // Find country data
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];
  
  // Group countries: recent first, then all alphabetically
  const groupedCountries = [
    ...recentlyUsed.map(code => countries.find(c => c.code === code)).filter(Boolean),
    ...countries.filter(c => !recentlyUsed.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name))
  ];

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
              {recentlyUsed.length > 0 && (
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Recent
                </div>
              )}
              
              {groupedCountries.map((country, index) => {
                // Add divider after recent countries
                const isLastRecent = recentlyUsed.length > 0 && index === recentlyUsed.length - 1;
                
                return (
                  <React.Fragment key={`${country.iso}-${index}`}>
                    <SelectItem value={country.code} className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="overflow-hidden rounded-full w-5 h-5 bg-background flex-shrink-0">
                          <WorldFlag code={country.iso} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm truncate">{country.name}</span>
                        <span className="text-sm text-muted-foreground ml-auto">{country.code}</span>
                      </div>
                    </SelectItem>
                    
                    {isLastRecent && (
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                        All Countries
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
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
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Phone number"
            className={`w-full pl-10 pr-8 h-11 text-sm bg-background transition-all duration-200 ${
              validationMessage ? 'border-destructive focus:border-destructive focus:ring-destructive/20' :
              isValidPhone ? 'border-green-500 focus:border-green-600 focus:ring-green-200' :
              isFocused ? 'border-primary/30 focus:border-primary focus:ring-primary/20' :
              'border-input'
            }`}
          />

          {isValidPhone && !validationMessage && !isVerifying && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-green-500 ${showValidationSuccess ? 'animate-pulse-success' : 'animate-fadeIn'}`}>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
          
          {isVerifying && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          
          {validationMessage && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
              <XCircle className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Validation message */}
      {validationMessage && (
        <div className="text-xs text-destructive flex items-center gap-1.5 mt-1 ml-1">
          <AlertTriangle className="h-3 w-3" />
          <span>{validationMessage}</span>
        </div>
      )}
      
      {phoneExists === false && !validationMessage && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mt-1 ml-1">
          <AlertTriangle className="h-3 w-3" />
          <span>This phone number is not registered yet</span>
        </div>
      )}

      {/* Phone verification tip */}
      <div className="text-xs text-muted-foreground mt-2">
        <p>We'll send a verification code to this phone number</p>
      </div>

      {/* Optional Submit Button */}
      {showSubmitButton && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValidPhone || isLoading || isVerifying}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            isValidPhone && !isLoading && !isVerifying
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isLoading || isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isVerifying ? 'Checking...' : 'Verifying...'}
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
