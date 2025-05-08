
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import AuthHeader from './AuthHeader';
import AuthTabs from './AuthTabs';
import VerificationStep from './VerificationStep';
import StepProgress from "@/components/ui/step-progress";

interface AuthContainerProps {
  isSignUp?: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ isSignUp = false }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [step, setStep] = useState(1);
  
  const handleSetActiveTab = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };
  
  const totalSteps = 2;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <div className="p-6">
        <AuthHeader isSignUp={isSignUp} />
        
        <StepProgress 
          currentStep={step}
          totalSteps={totalSteps}
          className="my-6"
        />
        
        {step === 1 ? (
          <AuthTabs 
            activeTab={activeTab}
            setActiveTab={handleSetActiveTab}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            isSignUp={isSignUp}
            onSubmit={handleSubmit}
            step={step}
          />
        ) : (
          <VerificationStep 
            onBack={handleBack}
            method={activeTab}
            value={activeTab === 'email' ? email : phone}
            isSignUp={isSignUp}
          />
        )}
      </div>
    </Card>
  );
};

export default AuthContainer;
