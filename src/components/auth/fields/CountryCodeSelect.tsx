
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: CountryCodeSelectProps) => {
  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'AU' },
    { code: '+33', country: 'FR' },
    { code: '+49', country: 'DE' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' },
    { code: '+91', country: 'IN' },
    { code: '+55', country: 'BR' },
    { code: '+52', country: 'MX' },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 text-sm">
        <SelectValue placeholder="+1" />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map(({ code, country }) => (
          <SelectItem key={code} value={code}>
            <span className="text-sm">
              {code} <span className="text-muted-foreground">({country})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryCodeSelect;
