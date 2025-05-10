
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthModeToggleProps {
  authMode: 'signin' | 'signup';
  setAuthMode?: (mode: 'signin' | 'signup') => void;
}

const AuthModeToggle = ({ authMode, setAuthMode }: AuthModeToggleProps) => {
  return (
    <div className="px-6 py-4 bg-[#f9f9f9] flex items-center justify-between max-w-4xl mx-auto w-full">
      <p className="text-sm text-gray-600">
        {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
      </p>
      
      {setAuthMode ? (
        // Use onClick handler when toggle is used within the same page
        <button 
          type="button"
          onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
          className="inline-flex items-center text-sm font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors cursor-pointer group"
        >
          {authMode === 'signin' ? "Register now" : "Sign in"}
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      ) : (
        // Use Link for navigation between separate pages
        <Link 
          to={authMode === 'signin' ? "/signup" : "/auth"}
          className="inline-flex items-center text-sm font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors cursor-pointer group"
        >
          {authMode === 'signin' ? "Register now" : "Sign in"}
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default AuthModeToggle;
