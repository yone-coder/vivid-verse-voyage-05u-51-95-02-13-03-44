
import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForms from "@/components/auth/AuthForms";
import AuthFooter from "@/components/auth/AuthFooter";

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ isOverlay, onClose }) => {
  return (
    <AuthContainer>
      <AuthHeader />
      <AuthForms />
      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
