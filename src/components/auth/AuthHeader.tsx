
import React from "react";
import { ShoppingBag } from "lucide-react";

const AuthHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="rounded-full bg-red-100 p-3 mb-2">
        <ShoppingBag className="h-6 w-6 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
      <p className="text-gray-500 text-sm text-center mt-1">
        Sign in to your account to continue
      </p>
    </div>
  );
};

export default AuthHeader;
