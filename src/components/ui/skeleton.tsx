
import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, style, ...props }, ref) => (
    <div 
      ref={ref}
      className={className || ""} 
      style={{ 
        background: "#e5e7eb", 
        borderRadius: 4, 
        minHeight: 16, 
        ...style 
      }}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

export default Skeleton;
