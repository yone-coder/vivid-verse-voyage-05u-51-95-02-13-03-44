
import React from 'react';
import { Fingerprint, Smartphone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const FloatingButtons = () => {
  const { toast } = useToast();
  
  return (
    <>
      {/* Biometric login option - floating button */}
      <div className="fixed bottom-6 right-6">
        <button 
          type="button"
          onClick={() => {
            toast({
              title: "Biometric authentication",
              description: "Biometric authentication is not available yet",
            });
          }}
          className="bg-white text-[#ff4747] rounded-full p-3 shadow-lg hover:bg-[#fff2f2] transition-all flex items-center justify-center hover:scale-110 transform active:scale-95"
        >
          <Fingerprint className="w-6 h-6" />
        </button>
      </div>

      {/* App download suggestion */}
      <div className="fixed bottom-6 left-6 sm:flex hidden">
        <button 
          type="button"
          onClick={() => {
            toast({
              title: "Mobile app",
              description: "Mobile app download coming soon!",
            });
          }}
          className="bg-white flex items-center rounded-full pl-3 pr-4 py-2 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="bg-[#ff4747] p-1 rounded-full mr-2">
            <Smartphone className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Get our app</span>
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
