import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Phone, X, Check, AlertCircle, Globe, Star, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompactPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
  format: string;
  length: number;
  popularity: number;
}

const CompactPhoneInput: React.FC<CompactPhoneInputProps> = ({
  value,
  onChange,
  disabled = false,
  className
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Curated list of most common countries for compact display
  const countries: Country[] = [
    { 
      code: 'HT', name: 'Haiti', dial: '+509', flag: '🇭🇹', 
      format: '####-####', length: 8, popularity: 100
    },
    { 
      code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', 
      format: '(###) ###-####', length: 10, popularity: 95
    },
    { 
      code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', 
      format: '(###) ###-####', length: 10, popularity: 90
    },
    { 
      code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', 
      format: '#### ### ####', length: 10, popularity: 85
    },
    { 
      code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', 
      format: '## ## ## ## ##', length: 9, popularity: 80
    },
    { 
      code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', 
      format: '#### ########', length: 11, popularity: 75
    },
    { 
      code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷', 
      format: '## #####-####', length: 11, popularity: 70
    },
    { 
      code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽', 
      format: '## #### ####', length: 10, popularity: 65
    }
  ];

  // Initialize with Haiti as default
  useEffect(() => {
    const defaultCountry = countries.find(c => c.code === 'HT') || countries[0];
    setSelectedCountry(defaultCountry);
    
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
    setFavoriteCountries(savedFavorites);
  }, []);

  // Format phone number
  const formatPhoneNumber = useCallback((value: string, country: Country | null) => {
    if (!country) return value;
    
    const numbers = value.replace(/\D/g, '');
    const format = country.format;
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
  }, []);

  // Validate phone number
  const validatePhone = useCallback((number: string, country: Country | null) => {
    if (!country) return false;
    
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length === country.length && /^[0-9]+$/.test(cleanNumber);
  }, []);

  // Handle phone number input
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value, selectedCountry);
    setPhoneNumber(formatted);
    
    // Validate
    const valid = validatePhone(formatted, selectedCountry);
    setIsValid(valid);
    
    // Update parent
    onChange(selectedCountry ? selectedCountry.dial + formatted.replace(/\D/g, '') : formatted);
  }, [selectedCountry, formatPhoneNumber, validatePhone, onChange]);

  // Handle country selection
  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
    
    // Reformat existing number
    if (phoneNumber) {
      const numbers = phoneNumber.replace(/\D/g, '');
      const formatted = formatPhoneNumber(numbers, country);
      setPhoneNumber(formatted);
      setIsValid(validatePhone(formatted, country));
      onChange(country.dial + numbers);
    } else {
      onChange(country.dial);
    }
    
    inputRef.current?.focus();
  }, [phoneNumber, formatPhoneNumber, validatePhone, onChange]);

  // Toggle favorite
  const toggleFavorite = useCallback((country: Country) => {
    setFavoriteCountries(prev => {
      const isFavorite = prev.some(c => c.code === country.code);
      const updated = isFavorite 
        ? prev.filter(c => c.code !== country.code)
        : [...prev, country].slice(0, 5);
      localStorage.setItem('favoriteCountries', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Filter countries
  const filteredCountries = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aIsFav = favoriteCountries.some(c => c.code === a.code);
      const bIsFav = favoriteCountries.some(c => c.code === b.code);
      
      if (aIsFav && !bIsFav) return -1;
      if (!aIsFav && bIsFav) return 1;
      return b.popularity - a.popularity;
    });

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <div className={`relative flex rounded-lg border transition-all duration-200 ${
        isFocused 
          ? isValid === true
            ? 'border-green-500 ring-2 ring-green-500/20' 
            : isValid === false && phoneNumber
              ? 'border-red-500 ring-2 ring-red-500/20'
              : 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-gray-300 hover:border-gray-400'
      } bg-white overflow-hidden`}>
        
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 transition-colors border-r border-gray-200 min-w-[80px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
          >
            <span className="text-lg">{selectedCountry?.flag}</span>
            <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Compact Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 bg-white rounded-lg shadow-xl border min-w-[280px] max-h-[300px] overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[200px]">
                {/* Favorites */}
                {favoriteCountries.length > 0 && searchTerm === '' && (
                  <>
                    <div className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      FAVORITES
                    </div>
                    {favoriteCountries.map((country) => (
                      <div
                        key={`fav-${country.code}`}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer group"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(country);
                          }}
                          className="text-yellow-500"
                        >
                          <Star className="w-3 h-3 fill-current" />
                        </button>
                        <div onClick={() => handleCountrySelect(country)} className="flex items-center gap-2 flex-1">
                          <span className="text-lg">{country.flag}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{country.name}</div>
                            <div className="text-xs text-gray-500">{country.dial}</div>
                          </div>
                          {selectedCountry?.code === country.code && (
                            <Check className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="border-b"></div>
                  </>
                )}

                {/* All Countries */}
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer group"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(country);
                      }}
                      className={`${favoriteCountries.some(c => c.code === country.code) ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <Star className={`w-3 h-3 ${favoriteCountries.some(c => c.code === country.code) ? 'fill-current' : ''}`} />
                    </button>
                    <div onClick={() => handleCountrySelect(country)} className="flex items-center gap-2 flex-1">
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.dial}</div>
                      </div>
                      {selectedCountry?.code === country.code && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={selectedCountry?.format.replace(/#/g, '0') || 'Enter phone number'}
            disabled={disabled}
            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-gray-400"
            autoComplete="tel"
            inputMode="tel"
          />

          {/* Status Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {phoneNumber && (
              <button
                type="button"
                onClick={() => {
                  setPhoneNumber('');
                  setIsValid(null);
                  onChange(selectedCountry?.dial || '');
                  inputRef.current?.focus();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {isValid === true && (
              <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-green-600" />
              </div>
            )}
            
            {isValid === false && phoneNumber && (
              <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-2.5 h-2.5 text-red-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Validation Message */}
      {isValid === false && phoneNumber && (
        <div className="flex items-center space-x-2 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          <span>Please enter a valid {selectedCountry?.name} phone number</span>
        </div>
      )}
      
      {isValid === true && (
        <div className="flex items-center space-x-2 text-xs text-green-600">
          <Check className="w-3 h-3" />
          <span>Valid {selectedCountry?.name} phone number</span>
        </div>
      )}

      {/* Progress Indicator */}
      {isFocused && selectedCountry && (
        <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min((phoneNumber.replace(/\D/g, '').length / selectedCountry.length) * 100, 100)}%` 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CompactPhoneInput;
