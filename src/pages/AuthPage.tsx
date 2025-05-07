
import React from 'react';
import Logo from "@/components/home/Logo";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import SafetyNotice from "@/components/auth/SafetyNotice";

const AuthPage = () => {
  const { toast } = useToast();

  const handleAuth = async (formData: any) => {
    console.log('Authentication data:', formData);
    // This would integrate with your authentication system
    // For now we'll just show a toast
    toast({
      title: formData.authMode === 'signin' ? "Sign In Successful" : "Sign Up Successful",
      description: `Welcome${formData.fullName ? `, ${formData.fullName}` : ''}!`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#333]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8 px-4">
        {/* Header with logo */}
        <div className="mb-6 text-center">
          <Logo width={70} height={70} className="mx-auto text-[#ff4747]" />
          <h1 className="text-2xl font-bold mt-4 mb-1">Welcome to Mima</h1>
          <p className="text-gray-500 text-sm mb-6">Continue to your account</p>
        </div>
        
        {/* Main auth form */}
        <AuthForm onSubmit={handleAuth} />
        
        {/* Safety notice at bottom */}
        <div className="mt-8 w-full max-w-lg mx-auto">
          <SafetyNotice />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
