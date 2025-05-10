
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Flag from 'react-world-flags';

interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

const countryOptions: CountryOption[] = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CountryCodeSelect = ({ value, onChange, className = "" }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<CountryOption | null>(
    countryOptions.find(option => option.dialCode === value) || countryOptions[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const option = countryOptions.find(option => option.dialCode === value);
    if (option) {
      setSelectedOption(option);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: CountryOption) => {
    setSelectedOption(option);
    onChange(option.dialCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-11 px-3 py-2 border rounded-md text-sm transition-all duration-200 ${
          isOpen 
            ? 'border-primary/30 ring-2 ring-primary/20' 
            : 'border-input hover:border-input/80'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {selectedOption && (
            <>
              <div className="w-6 h-4 mr-1.5 overflow-hidden rounded-sm">
                <Flag code={selectedOption.code} className="h-full w-full object-cover" />
              </div>
              <span>{selectedOption.dialCode}</span>
            </>
          )}
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 mt-1 w-48 max-h-60 overflow-auto bg-background border border-input rounded-md shadow-md py-1"
            role="listbox"
          >
            {countryOptions.map((option) => (
              <li
                key={option.code}
                onClick={() => handleSelect(option)}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors ${
                  selectedOption?.code === option.code ? 'bg-muted/70' : ''
                }`}
                role="option"
                aria-selected={selectedOption?.code === option.code}
              >
                <div className="w-6 h-4 mr-2 overflow-hidden rounded-sm">
                  <Flag code={option.code} className="h-full w-full object-cover" />
                </div>
                <span className="flex-1 whitespace-nowrap">{option.name}</span>
                <span className="text-muted-foreground ml-1">{option.dialCode}</span>
                {selectedOption?.code === option.code && (
                  <Check className="ml-2 h-4 w-4 text-primary" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryCodeSelect;
