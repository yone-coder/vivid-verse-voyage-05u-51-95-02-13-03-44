import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCheck } from 'lucide-react';

interface FullNameFieldProps {
  fullName: string;
  setFullName: (name: string) => void;
}

const FullNameField = ({ fullName, setFullName }: FullNameFieldProps) => {
  return (
    <div className="mb-3">
      <Label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</Label>
      <div className="relative group">
        <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full pl-10 pr-3 py-2 border-[#eaeaea] focus-visible:ring-[#ff4747]"
          required
        />
      </div>
    </div>
  );
};

export default FullNameField;
