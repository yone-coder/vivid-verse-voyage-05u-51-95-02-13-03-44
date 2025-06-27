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
  const [error, setError] = useState<string | null>(null);

  const handleNameStepContinue = (newFirstName: string, newLastName: string) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setCurrentStep('password');
  };

  const handlePasswordStepContinue = () => {
    // Account creation happens in the password step now
    console.log('Account created successfully for:', { email, firstName, lastName });
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

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    // You might want to show a toast notification here
    console.error('Account creation error:', errorMessage);
    
    // Optional: Clear error after a few seconds
    setTimeout(() => setError(null), 5000);
  };

  const clearError = () => {
    setError(null);
  };

  if (currentStep === 'name') {
    return (
      <div>
        {error && (
          <div className="fixed top-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-red-600 text-sm font-medium">
                  {error}
                </div>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <AccountCreationNameStep
          email={email}
          onBack={handleNameStepBack}
          onChangeEmail={handleChangeEmail}
          onContinue={handleNameStepContinue}
        />
      </div>
    );
  }

  if (currentStep === 'password') {
    return (
      <div>
        {error && (
          <div className="fixed top-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-red-600 text-sm font-medium">
                  {error}
                </div>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <AccountCreationPasswordStep
          email={email}
          firstName={firstName}
          lastName={lastName}
          onBack={handlePasswordStepBack}
          onContinue={handlePasswordStepContinue}
          onError={handleError}
        />
      </div>
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
