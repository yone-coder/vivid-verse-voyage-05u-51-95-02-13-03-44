import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLoginScreen from './MainLoginScreen';
import EmailAuthScreen from './EmailAuthScreen';
import PasswordAuthScreen from './PasswordAuthScreen';
import VerificationCodeScreen from './VerificationCodeScreen';
import AccountCreationScreen from './AccountCreationScreen';
import SuccessScreen from './SuccessScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import OTPResetScreen from './OTPResetScreen';
import NewPasswordScreen from './NewPasswordScreen';

type ScreenType = 'login' | 'email' | 'password' | 'verification' | 'create-account' | 'success' | 'forgot-password' | 'otp-reset' | 'new-password';

export default function LoginPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [emailForPassword, setEmailForPassword] = useState('');
  const [resetOTP, setResetOTP] = useState('');

  const navigate = useNavigate();

  // Check for Google OAuth data on component mount
  useEffect(() => {
    const googleUserData = localStorage.getItem('googleUserData');
    if (googleUserData) {
      try {
        const userData = JSON.parse(googleUserData);
        console.log('Google user data found, redirecting to account creation:', userData);
        
        // Set the email from Google data
        setEmailForPassword(userData.email || '');
        
        // Clear the temporary Google user data
        localStorage.removeItem('googleUserData');
        
        // Redirect to account creation screen
        setCurrentScreen('create-account');
      } catch (error) {
        console.error('Error parsing Google user data:', error);
        localStorage.removeItem('googleUserData');
      }
    }
  }, []);

  const handleContinueWithEmail = () => {
    setCurrentScreen('email');
  };

  const handleBack = () => {
    if (currentScreen === 'success') {
      setCurrentScreen('login');
    } else if (currentScreen === 'verification') {
      setCurrentScreen('email');
    } else if (currentScreen === 'password') {
      setCurrentScreen('email');
    } else if (currentScreen === 'create-account') {
      setCurrentScreen('email');
    } else if (currentScreen === 'email') {
      setCurrentScreen('login');
      setEmailForPassword('');
    } else if (currentScreen === 'forgot-password') {
      setCurrentScreen('password');
    } else if (currentScreen === 'otp-reset') {
      setCurrentScreen('forgot-password');
    } else if (currentScreen === 'new-password') {
      setCurrentScreen('otp-reset');
    }
  };

  const handleContinueWithPassword = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('password');
  };

  const handleContinueWithCode = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('verification');
    console.log('Sending verification code to:', email);
  };

  const handleCreateAccount = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('create-account');
  };

  const handleSignInSuccess = () => {
    console.log('Sign in completed successfully');
    setCurrentScreen('success');
  };

  const handleAccountCreated = () => {
    console.log('Account created successfully');
    setCurrentScreen('success');
  };

  const handleContinueToDashboard = () => {
    console.log('Manual redirect to homepage from success screen');
    navigate('/');
  };

  const handleSignUpClick = () => {
    setCurrentScreen('create-account');
  };

  const handleResetSuccess = (email: string) => {
    console.log('Password reset code sent to:', email);
    setCurrentScreen('otp-reset');
  };

  const handleOTPVerified = (email: string, otp: string) => {
    console.log('OTP verified for password reset:', email);
    setResetOTP(otp);
    setCurrentScreen('new-password');
  };

  const handlePasswordResetSuccess = () => {
    console.log('Password reset completed successfully');
    setCurrentScreen('success');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'login' && (
        <MainLoginScreen
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onContinueWithEmail={handleContinueWithEmail}
        />
      )}
      
      {currentScreen === 'email' && (
        <EmailAuthScreen
          onBack={handleBack}
          selectedLanguage={selectedLanguage}
          onContinueWithPassword={handleContinueWithPassword}
          onContinueWithCode={handleContinueWithCode}
          onCreateAccount={handleCreateAccount}
          onSignUpClick={handleSignUpClick}
          initialEmail={emailForPassword}
        />
      )}
      
      {currentScreen === 'password' && (
        <PasswordAuthScreen 
          email={emailForPassword} 
          onBack={handleBack}
          onSignInSuccess={handleSignInSuccess}
          onForgotPasswordClick={() => setCurrentScreen('forgot-password')}
        />
      )}

      {currentScreen === 'forgot-password' && (
        <ResetPasswordScreen 
          initialEmail={emailForPassword}
          onBack={handleBack}
          onResetSuccess={handleResetSuccess}
        />
      )}

      {currentScreen === 'otp-reset' && (
        <OTPResetScreen 
          email={emailForPassword}
          onBack={handleBack}
          onOTPVerified={handleOTPVerified}
        />
      )}

      {currentScreen === 'new-password' && (
        <NewPasswordScreen 
          email={emailForPassword}
          otp={resetOTP}
          onBack={handleBack}
          onPasswordResetSuccess={handlePasswordResetSuccess}
        />
      )}
      
      {currentScreen === 'verification' && (
        <VerificationCodeScreen 
          email={emailForPassword} 
          onBack={handleBack}
          onVerificationSuccess={handleSignInSuccess}
        />
      )}
      
      {currentScreen === 'create-account' && (
        <AccountCreationScreen
          email={emailForPassword}
          onBack={handleBack}
          onAccountCreated={handleAccountCreated}
        />
      )}
      
      {currentScreen === 'success' && (
        <SuccessScreen 
          email={emailForPassword}
          onContinue={handleContinueToDashboard}
        />
      )}
    </div>
  );
}
