
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AuthFooterProps {
  children?: React.ReactNode;
}

const AuthFooter = ({ children }: AuthFooterProps) => {
  return (
    <div className="w-full mt-4 py-3 text-center">
      {children || (
        <>
          <div className="flex items-center justify-center mb-2">
            <ShieldCheck className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500 font-medium">Secure Authentication</span>
          </div>
          <span className="text-xs text-[#888]">
            By proceeding, you confirm that you've read and agree to our{' '}
            <a href="/terms" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
              Privacy Policy
            </a>
            .
          </span>
        </>
      )}
    </div>
  );
};

export default AuthFooter;
