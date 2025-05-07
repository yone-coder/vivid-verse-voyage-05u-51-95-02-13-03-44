
import React from 'react';

interface AuthFooterProps {
  children?: React.ReactNode;
}

const AuthFooter = ({ children }: AuthFooterProps) => {
  return (
    <div className="w-full mt-2 py-2 text-center">
      {children || (
        <span className="text-xs text-[#888]">
          By tapping Continue, you agree to our{' '}
          <a href="/terms" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
            Terms
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
            Privacy
          </a>
          .
        </span>
      )}
    </div>
  );
};

export default AuthFooter;
