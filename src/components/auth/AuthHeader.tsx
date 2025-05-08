
import React from 'react';
import Logo from "@/components/home/Logo";

interface AuthHeaderProps {
  title?: string;
  isSignUp?: boolean;
}

const AuthHeader = ({ title, isSignUp = false }: AuthHeaderProps) => {
  const displayTitle = title || (isSignUp ? "Sign up for Mima" : "Log in to Mima");
  
  return (
    <>
      <div className="w-full max-w-md pt-2 pb-4 flex flex-col items-center">
        <div className="flex justify-center items-center mb-3">
          <Logo width={70} height={70} className="text-[#ff4747] filter drop-shadow-md" />
        </div>
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#ff3030] to-[#ff6060] bg-clip-text text-transparent">{displayTitle}</h1>
        <div className="mt-2 h-1 w-16 bg-gradient-to-r from-[#ff3030] to-[#ff6060] rounded-full"></div>
      </div>
    </>
  );
};

export default AuthHeader;
