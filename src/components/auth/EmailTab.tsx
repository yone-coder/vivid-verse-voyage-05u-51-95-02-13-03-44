
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean; // Add optional prop to control button visibility
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  return (
    <div>
      <Label htmlFor="email" className="block text-base font-medium mb-1 text-gray-700">
        Email or username
      </Label>
      <div className="relative group">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address or username"
          className="w-full pl-10 pr-3 py-2 border-[#eaeaea] focus-visible:ring-[#ff4747]"
          required
        />
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

export default EmailTab;
