
import React from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignInBanner() {
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    // Navigate to sign-in page (this will be implemented later)
    navigate("/auth");
  };
  
  return (
    <div className="fixed bottom-12 left-0 right-0 z-40 bg-gradient-to-r from-red-500 to-orange-500 py-2 px-4 flex items-center justify-between">
      <div className="text-white text-sm font-medium">Sign in to explore more</div>
      <Button 
        onClick={handleSignIn} 
        size="sm" 
        className="bg-white hover:bg-white/90 text-red-500 shadow-sm flex items-center gap-1 px-3 py-1 h-7 rounded-full"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">Sign in</span>
      </Button>
    </div>
  );
}
