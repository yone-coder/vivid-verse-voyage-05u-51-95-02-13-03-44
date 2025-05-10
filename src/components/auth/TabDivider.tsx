
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface TabDividerProps {
  text?: string;
  className?: string;
}

const TabDivider = ({ text = "OR", className = "" }: TabDividerProps) => {
  return (
    <div className={`relative flex items-center justify-center my-4 ${className}`}>
      <Separator className="w-full" />
      <span className="px-3 text-xs font-medium text-muted-foreground bg-background absolute">
        {text}
      </span>
    </div>
  );
};

export default TabDivider;
