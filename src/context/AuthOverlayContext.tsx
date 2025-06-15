
import React, { createContext } from "react";
export const AuthOverlayContext = createContext({});
export const AuthOverlayProvider: React.FC<{children: React.ReactNode}> = ({children}) => <>{children}</>;
