
import React from "react";

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ border: "1px solid #ececec", borderRadius: 12, padding: 16 }}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
