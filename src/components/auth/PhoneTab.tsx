
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Smartphone } from 'lucide-react';

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const PhoneTab = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode,
  onSubmit
}: PhoneTabProps) => {
  return (
    <div>
      <Label htmlFor="phone" className="block text-base font-medium mb-1 text-gray-700">Phone number</Label>
      <div className="flex">
        <div className="relative w-24 mr-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="h-10 w-full rounded-md border border-[#eaeaea] bg-background px-3 py-1.5 text-base focus-visible:ring-[#ff4747] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+33">+33</option>
            <option value="+49">+49</option>
            <option value="+86">+86</option>
            <option value="+91">+91</option>
            <option value="+234">+234</option>
            <option value="+27">+27</option>
            <option value="+81">+81</option>
            <option value="+55">+55</option>
          </select>
        </div>
        <div className="relative group flex-1">
          <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
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
      {onSubmit && (
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
      <p className="text-xs text-gray-500 text-center mt-2">
        We'll send a verification code to this number
      </p>
    </div>
  );
};

export default PhoneTab;
