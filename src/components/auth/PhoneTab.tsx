
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean; // Add optional prop to control button visibility
}

const PhoneTab = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode, 
  onSubmit,
  showSubmitButton = false 
}: PhoneTabProps) => {
  return (
    <div>
      <Label htmlFor="phone" className="block text-base font-medium mb-1 text-gray-700">
        Phone number
      </Label>
      <div className="flex gap-2">
        <div className="w-1/4">
          <Select
            value={countryCode}
            onValueChange={setCountryCode}
          >
            <SelectTrigger className="w-full border-[#eaeaea] focus:ring-[#ff4747]">
              <SelectValue placeholder="+1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+1">+1 (US)</SelectItem>
              <SelectItem value="+44">+44 (UK)</SelectItem>
              <SelectItem value="+33">+33 (FR)</SelectItem>
              <SelectItem value="+49">+49 (DE)</SelectItem>
              <SelectItem value="+86">+86 (CN)</SelectItem>
              <SelectItem value="+91">+91 (IN)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative flex-1 group">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full pl-10 pr-3 py-2 border-[#eaeaea] focus-visible:ring-[#ff4747]"
            required
          />
        </div>
      </div>
      
      {showSubmitButton && onSubmit && (
        <div className="mt-4 mb-2">
          <button 
            type="button"
            onClick={(e) => onSubmit(e)}
            className="w-full flex items-center justify-center bg-[#ff4747] text-white font-medium py-3 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneTab;
