import React from 'react';
import Logo from "@/components/home/Logo";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="w-full max-w-md pt-2 pb-4 flex flex-col items-center">
      <div className="flex justify-center items-center mb-3">
        <Logo width={70} height={70} className="text-[#ff4747] filter drop-shadow-md" />
      </div>
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#ff3030] to-[#ff6060] bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1 text-center">{subtitle}</p>
      )}
      <div className="mt-2 h-1 w-16 bg-gradient-to-r from-[#ff3030] to-[#ff6060] rounded-full" />
    </div>
  );
};

export default AuthHeader;