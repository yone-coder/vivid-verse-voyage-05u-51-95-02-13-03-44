
import React from 'react';
import { Shield } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="px-6 pt-8 pb-2 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </h1>
      <p className="text-gray-500 text-center mb-4">
        {description}
      </p>
      <div className="flex justify-center mb-4">
        <div className="bg-[#fff2f2] text-[#ff4747] text-xs px-3 py-1 rounded-full flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          <span>Enhanced security protocols active</span>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
