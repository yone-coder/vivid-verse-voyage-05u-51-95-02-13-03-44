
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Phone, X, Check, AlertCircle, Star, Search, Globe, Zap, Shield, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';
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
  const [recentCountries, setRecentCountries] = useState<Country[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [validationScore, setValidationScore] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Enhanced country list with better data
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
    },
    { 
      code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', 
      format: '##### #####', length: 10, popularity: 60
    },
    { 
      code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', 
      format: '#### ### ###', length: 9, popularity: 55
    }
  ];

  // Initialize with Haiti as default
  useEffect(() => {
    const defaultCountry = countries.find(c => c.code === 'HT') || countries[0];
    setSelectedCountry(defaultCountry);
    
    // Load favorites and recent from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
    const savedRecent = JSON.parse(localStorage.getItem('recentCountries') || '[]');
    setFavoriteCountries(savedFavorites);
    setRecentCountries(savedRecent);
  }, []);

  // Smart phone number formatting
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

  // Advanced validation with scoring
  const validatePhone = useCallback((number: string, country: Country | null) => {
    if (!country) return { isValid: false, score: 0 };
    
    const cleanNumber = number.replace(/\D/g, '');
    let score = 0;
    
    if (cleanNumber.length === 0) {
      score = 0;
    } else if (cleanNumber.length === country.length) {
      score = 100;
      // Additional checks for common invalid patterns
      if (cleanNumber === '0'.repeat(country.length) || 
          cleanNumber === '1'.repeat(country.length)) {
        score = 20;
      }
    } else if (cleanNumber.length < country.length) {
      score = Math.round((cleanNumber.length / country.length) * 80);
    } else {
      score = 30; // Too long
    }
    
    return {
      isValid: score >= 90,
      score
    };
  }, []);

  // Handle phone input with real-time validation
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value, selectedCountry);
    setPhoneNumber(formatted);
    
    // Real-time validation
    const validation = validatePhone(formatted, selectedCountry);
    setIsValid(validation.isValid);
    setValidationScore(validation.score);
    
    // Update parent
    onChange(selectedCountry ? selectedCountry.dial + formatted.replace(/\D/g, '') : formatted);
  }, [selectedCountry, formatPhoneNumber, validatePhone, onChange]);

  // Enhanced country selection with analytics
  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
    
    // Update recent countries (max 3)
    setRecentCountries(prev => {
      const filtered = prev.filter(c => c.code !== country.code);
      const updated = [country, ...filtered].slice(0, 3);
      localStorage.setItem('recentCountries', JSON.stringify(updated));
      return updated;
    });
    
    // Reformat existing number
    if (phoneNumber) {
      const numbers = phoneNumber.replace(/\D/g, '');
      const formatted = formatPhoneNumber(numbers, country);
      setPhoneNumber(formatted);
      const validation = validatePhone(formatted, country);
      setIsValid(validation.isValid);
      setValidationScore(validation.score);
      onChange(country.dial + numbers);
    } else {
      onChange(country.dial);
    }
    
    inputRef.current?.focus();
  }, [phoneNumber, formatPhoneNumber, validatePhone, onChange]);

  // Toggle favorite with persistence
  const toggleFavorite = useCallback((country: Country) => {
    setFavoriteCountries(prev => {
      const isFavorite = prev.some(c => c.code === country.code);
      const updated = isFavorite 
        ? prev.filter(c => c.code !== country.code)
        : [...prev, country].slice(0, 5); // Max 5 favorites
      localStorage.setItem('favoriteCountries', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Copy to clipboard with feedback
  const copyToClipboard = useCallback(async () => {
    if (!phoneNumber || !selectedCountry) return;
    
    try {
      const fullNumber = `${selectedCountry.dial} ${phoneNumber}`;
      await navigator.clipboard.writeText(fullNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [phoneNumber, selectedCountry]);

  // Smart country filtering
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

  // Click outside handler
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

  // Clear phone number
  const clearPhone = useCallback(() => {
    setPhoneNumber('');
    setIsValid(null);
    setValidationScore(0);
    onChange(selectedCountry?.dial || '');
    inputRef.current?.focus();
  }, [selectedCountry, onChange]);

  // Get status color based on validation score
  const getStatusColor = () => {
    if (validationScore >= 90) return 'border-emerald-400 ring-emerald-400/20';
    if (validationScore >= 60) return 'border-amber-400 ring-amber-400/20';
    if (validationScore > 0) return 'border-red-400 ring-red-400/20';
    return isFocused ? 'border-blue-400 ring-blue-400/20' : 'border-gray-200';
  };

  const displayNumber = isPrivate && phoneNumber.length > 3 
    ? phoneNumber.slice(0, -3) + '•••'
    : phoneNumber;

  return (
    <div className={cn("relative space-y-2", className)}>
      {/* Main Input Container */}
      <div className={cn(
        "group relative flex items-center rounded-xl border-2 bg-white transition-all duration-300 overflow-hidden",
        getStatusColor(),
        isFocused && "shadow-lg ring-4",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-3 hover:bg-gray-50 transition-all duration-200 border-r border-gray-200 min-w-[90px] group"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
          >
            <div className="relative">
              <span className="text-lg leading-none">{selectedCountry?.flag}</span>
              {favoriteCountries.some(c => c.code === selectedCountry?.code) && (
                <Star className="w-2 h-2 text-amber-500 fill-current absolute -top-0.5 -right-0.5" />
              )}
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-medium text-gray-700 leading-none">{selectedCountry?.dial}</span>
              <span className="text-xs text-gray-400 leading-none">{selectedCountry?.code}</span>
            </div>
            <ChevronDown className={cn(
              "w-3 h-3 text-gray-400 transition-all duration-200 group-hover:text-gray-600",
              isDropdownOpen && "rotate-180"
            )} />
          </button>

          {/* Enhanced Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[320px] max-h-[400px] overflow-hidden backdrop-blur-sm">
              {/* Search Header */}
              <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[300px]">
                {/* Favorites Section */}
                {favoriteCountries.length > 0 && searchTerm === '' && (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-amber-600 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                      <Star className="w-3 h-3 fill-current" />
                      FAVORITES
                    </div>
                    {favoriteCountries.map((country) => (
                      <CountryItem
                        key={`fav-${country.code}`}
                        country={country}
                        isSelected={selectedCountry?.code === country.code}
                        isFavorite={true}
                        onSelect={() => handleCountrySelect(country)}
                        onToggleFavorite={() => toggleFavorite(country)}
                      />
                    ))}
                  </>
                )}

                {/* Recent Section */}
                {recentCountries.length > 0 && searchTerm === '' && (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                      <RefreshCw className="w-3 h-3" />
                      RECENT
                    </div>
                    {recentCountries.map((country) => (
                      <CountryItem
                        key={`recent-${country.code}`}
                        country={country}
                        isSelected={selectedCountry?.code === country.code}
                        isFavorite={favoriteCountries.some(c => c.code === country.code)}
                        onSelect={() => handleCountrySelect(country)}
                        onToggleFavorite={() => toggleFavorite(country)}
                      />
                    ))}
                  </>
                )}

                {/* All Countries */}
                {searchTerm && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {filteredCountries.length} RESULTS
                  </div>
                )}
                
                {filteredCountries.map((country) => (
                  <CountryItem
                    key={country.code}
                    country={country}
                    isSelected={selectedCountry?.code === country.code}
                    isFavorite={favoriteCountries.some(c => c.code === country.code)}
                    onSelect={() => handleCountrySelect(country)}
                    onToggleFavorite={() => toggleFavorite(country)}
                  />
                ))}

                {filteredCountries.length === 0 && searchTerm && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No countries found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="tel"
            value={displayNumber}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={selectedCountry?.format.replace(/#/g, '0') || 'Enter phone number'}
            disabled={disabled}
            className="w-full px-3 py-3 text-sm bg-transparent outline-none placeholder:text-gray-400 pr-20"
            autoComplete="tel"
            inputMode="tel"
          />

          {/* Action Icons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {phoneNumber && (
              <>
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                  title={isPrivate ? "Show number" : "Hide number"}
                >
                  {isPrivate ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                  title="Copy number"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                
                <button
                  type="button"
                  onClick={clearPhone}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                  title="Clear number"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            
            {/* Status Indicator */}
            {validationScore > 0 && (
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                validationScore >= 90 ? "bg-emerald-100 text-emerald-600" :
                validationScore >= 60 ? "bg-amber-100 text-amber-600" :
                "bg-red-100 text-red-600"
              )}>
                {validationScore >= 90 ? <Check className="w-3 h-3" /> : 
                 validationScore >= 60 ? <AlertCircle className="w-3 h-3" /> :
                 <X className="w-3 h-3" />}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isFocused && selectedCountry && (
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-300",
              validationScore >= 90 ? "bg-emerald-500" :
              validationScore >= 60 ? "bg-amber-500" :
              validationScore > 0 ? "bg-red-500" : "bg-blue-500"
            )}
            style={{ 
              width: `${Math.min((phoneNumber.replace(/\D/g, '').length / (selectedCountry?.length || 10)) * 100, 100)}%` 
            }}
          />
        </div>
      )}

      {/* Status Messages */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {validationScore >= 90 && (
            <div className="flex items-center space-x-1 text-emerald-600">
              <Check className="w-3 h-3" />
              <span>Valid {selectedCountry?.name} number</span>
            </div>
          )}
          
          {validationScore < 90 && validationScore > 0 && (
            <div className="flex items-center space-x-1 text-amber-600">
              <AlertCircle className="w-3 h-3" />
              <span>Continue typing...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <Shield className="w-3 h-3" />
          <span>Secure & encrypted</span>
        </div>
      </div>

      {/* Copy Success Notification */}
      {copySuccess && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-emerald-500 text-white text-xs rounded-lg shadow-lg flex items-center justify-center space-x-2 z-50">
          <Check className="w-3 h-3" />
          <span>Phone number copied!</span>
        </div>
      )}
    </div>
  );
};

// Country Item Component
interface CountryItemProps {
  country: Country;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

const CountryItem: React.FC<CountryItemProps> = ({
  country,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite
}) => (
  <div className={cn(
    "flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 cursor-pointer group",
    isSelected && "bg-blue-50 border-r-2 border-blue-500"
  )}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite();
      }}
      className={cn(
        "p-1 rounded-md transition-all",
        isFavorite ? "text-amber-500 bg-amber-50" : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"
      )}
    >
      <Star className={cn("w-3.5 h-3.5", isFavorite && "fill-current")} />
    </button>
    
    <div onClick={onSelect} className="flex items-center gap-3 flex-1">
      <span className="text-xl leading-none">{country.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-900 truncate">{country.name}</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{country.code}</span>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span>{country.dial}</span>
          <span>•</span>
          <span className="truncate">{country.format}</span>
        </div>
      </div>
      {isSelected && <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />}
    </div>
  </div>
);

export default CompactPhoneInput;
