
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center bg-[#ff4747] hover:bg-[#ff2727] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4747] text-white font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden h-12"
    >
      {isLoading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        <>
          {label}
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
