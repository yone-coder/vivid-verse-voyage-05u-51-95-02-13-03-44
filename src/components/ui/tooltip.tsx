
import React, { ReactNode } from "react";

export interface TooltipProviderProps {
  children: ReactNode;
  delayDuration?: number;
}

export interface TooltipProps {
  children: ReactNode;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  hidden?: boolean;
}

export interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => <>{children}</>;

export const Tooltip: React.FC<TooltipProps> = ({ children }) => <>{children}</>;

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, hidden, className, ...props }, ref) => 
    hidden ? null : (
      <div 
        ref={ref}
        className={`z-50 bg-gray-900 text-white p-2 rounded ${className || ""}`} 
        {...props}
      >
        {children}
      </div>
    )
);
TooltipContent.displayName = "TooltipContent";

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  if (asChild) {
    return <>{children}</>;
  }
  return <span>{children}</span>;
};

export default TooltipProvider;
