
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ResetPasswordFormProps {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  resetSent: boolean;
  isLoading: boolean;
  goBack: () => void;
}

const ResetPasswordForm = ({ 
  resetEmail, 
  setResetEmail, 
  resetSent,
  isLoading,
  goBack
}: ResetPasswordFormProps) => {
  return (
    <div className="mb-4">
      {!resetSent ? (
        <div>
          <Label htmlFor="resetEmail" className="block text-gray-700 mb-1">Email address</Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
            <Input
              id="resetEmail"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
              required
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            We'll send a password reset link to this email address.
          </p>
        </div>
      ) : (
        <div className="text-center p-8">
          <div className="bg-[#fff2f2] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-[#ff4747]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your inbox</h3>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to <strong>{resetEmail}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive an email? Check your spam folder or try again.
          </p>
        </div>
      )}

      {resetSent && (
        <Button
          type="button"
          onClick={goBack}
          className="w-full mt-4 border-[#ff4747] text-[#ff4747] hover:bg-[#fff2f2]"
          variant="outline"
        >
          Back to sign in
        </Button>
      )}
    </div>
  );
};

export default ResetPasswordForm;
