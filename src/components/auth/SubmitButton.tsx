
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center bg-[#ff4747] hover:bg-[#ff2727] text-white font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden h-12 shadow-sm hover:shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-[#ff4747]/50 dark:focus:ring-offset-gray-900"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <span className="flex items-center gap-2">
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </Button>
  );
};

export default SubmitButton;
