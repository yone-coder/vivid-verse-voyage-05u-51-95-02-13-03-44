
import React from "react";

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ children }) => <>{children}</>;

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, style, children, ...props }, ref) => (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  )
);
SheetContent.displayName = "SheetContent";
