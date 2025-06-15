
import React from "react";
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className || ""} style={{ background: "#e5e7eb", borderRadius: 4, minHeight: 16 }}></div>
);
export default Skeleton;
