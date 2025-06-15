
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props} style={{ padding: "10px 16px", background: "#e0e7ef", borderRadius: 8, border: "none" }}>
    {children}
  </button>
);

export default Button;
