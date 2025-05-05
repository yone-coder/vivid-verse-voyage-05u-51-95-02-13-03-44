
import React from 'react';
import { Label } from "@/components/ui/label";
import { Shield, Clock } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface TwoFactorAuthProps {
  twoFactorCode: string;
  setTwoFactorCode: (code: string) => void;
  activeTab: string;
}

const TwoFactorAuth = ({ twoFactorCode, setTwoFactorCode, activeTab }: TwoFactorAuthProps) => {
  return (
    <div className="mb-4 mt-4 p-4 border border-[#eaeaea] rounded-lg bg-[#f9f9f9]">
      <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
        <Shield className="h-4 w-4 mr-2 text-[#ff4747]" />
        Two-Factor Authentication Required
      </h3>
      <p className="text-xs text-gray-600 mb-3">
        We've sent a verification code to your {activeTab === 'email' ? 'email' : 'phone'}.
      </p>
      <div className="mb-4">
        <Label htmlFor="twoFactorCode">Enter 6-digit code</Label>
        <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode} className="mt-2">
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
            <InputOTPSlot index={1} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
            <InputOTPSlot index={2} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
            <InputOTPSlot index={3} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
            <InputOTPSlot index={4} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
            <InputOTPSlot index={5} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex justify-between mt-2">
        <button type="button" className="text-xs text-[#ff4747] hover:text-[#ff2727] transition-colors">
          Resend code
        </button>
        <span className="text-xs text-gray-500">
          <Clock className="h-3 w-3 inline mr-1" />
          Code expires in 4:59
        </span>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
