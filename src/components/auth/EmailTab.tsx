
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
}

const EmailTab = ({ email, setEmail }: EmailTabProps) => {
  return (
    <div className="mb-4">
      <Label htmlFor="email" className="block text-gray-700 mb-1">Email address</Label>
      <div className="relative group">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
          required
        />
      </div>
    </div>
  );
};

export default EmailTab;
