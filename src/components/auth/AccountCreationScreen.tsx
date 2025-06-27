
import React, { useState } from 'react';
import AccountCreationNameStep from './AccountCreationNameStep';
import AccountCreationPasswordStep from './AccountCreationPasswordStep';
import AccountCreationSuccessStep from './AccountCreationSuccessStep';

interface AccountCreationScreenProps {
  email: string;
  onBack: () => void;
  onAccountCreated: () => void;
}

type Step = 'name' | 'password' | 'success';

const AccountCreationScreen: React.FC<AccountCreationScreenProps> = ({
  email,
  onBack,
  onAccountCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameStepContinue = (newFirstName: string, newLastName: string) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setCurrentStep('password');
  };

  const handlePasswordStepContinue = (newPassword: string) => {
    setPassword(newPassword);
    console.log('Creating account for:', { email, firstName, lastName });
    setCurrentStep('success');
  };

  const handleChangeEmail = () => {
    onBack();
  };

  const handleNameStepBack = () => {
    onBack();
  };

  const handlePasswordStepBack = () => {
    setCurrentStep('name');
  };

  const handleSuccessStepContinue = () => {
    onAccountCreated();
  };

  if (currentStep === 'name') {
    return (
      <AccountCreationNameStep
        email={email}
        onBack={handleNameStepBack}
        onChangeEmail={handleChangeEmail}
        onContinue={handleNameStepContinue}
      />
    );
  }

  if (currentStep === 'password') {
    return (
      <AccountCreationPasswordStep
        email={email}
        firstName={firstName}
        lastName={lastName}
        onBack={handlePasswordStepBack}
        onContinue={handlePasswordStepContinue}
      />
    );
  }

  if (currentStep === 'success') {
    return (
      <AccountCreationSuccessStep
        email={email}
        firstName={firstName}
        lastName={lastName}
        onContinue={handleSuccessStepContinue}
      />
    );
  }

  return null;
};

export default AccountCreationScreen;
