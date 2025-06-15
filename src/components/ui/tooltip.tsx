
import React, { ReactNode } from "react";
export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
export const Tooltip: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
export const TooltipContent: React.FC<{ children: ReactNode, side?: string, align?: string, hidden?: boolean }> =
  ({ children, hidden }) => hidden ? null : <div className="z-50 bg-gray-900 text-white p-2 rounded">{children}</div>;
export const TooltipTrigger: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
export default TooltipProvider;
