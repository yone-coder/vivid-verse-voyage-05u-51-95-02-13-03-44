
import React from 'react';
import Logo from "@/components/home/Logo";

interface AuthHeaderProps {
  title: string;
}

const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <>
      <div className="w-full max-w-md pt-2 pb-2">
        <div className="flex justify-center items-center">
          <Logo width={70} height={70} className="text-[#ff4747]" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
    </>
  );
};

export default AuthHeader;
