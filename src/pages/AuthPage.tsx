
import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForms from "@/components/auth/AuthForms";
import AuthFooter from "@/components/auth/AuthFooter";

const AuthPage = () => {
  return (
    <AuthContainer>
      <AuthHeader />
      <AuthForms />
      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
