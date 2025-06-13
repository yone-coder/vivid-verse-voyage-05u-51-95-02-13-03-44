
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEmailCheck } from '@/hooks/useEmailCheck';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = password
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);

  const { checkEmailExists, isCheckingEmail } = useEmailCheck();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Step 1: Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    
    try {
      const exists = await checkEmailExists(email);
      
      if (exists) {
        console.log("Email exists, going to signin mode");
        setAuthMode('signin');
        setStep(2);
      } else {
        console.log("Email doesn't exist, redirecting to signup");
        toast.info("No account found. Redirecting to signup...");
        setTimeout(() => {
          navigate('/signup');
        }, 1500);
      }
    } catch (error) {
      toast.error("Unable to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      if (authMode === 'signin') {
        await signIn(email, password, false);
        toast.success("Welcome back!");
        navigate('/for-you');
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setPassword('');
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader
        title={step === 1 ? "Continue to Mima" : "Welcome back"}
        subtitle={step === 1 ? "Enter your email address" : "Enter your password to sign in"}
      />

      {step === 1 ? (
        <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              disabled={isLoading || isCheckingEmail}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ff4747] hover:bg-[#ff2727]"
            disabled={isLoading || isCheckingEmail || !email}
          >
            {isLoading || isCheckingEmail ? "Checking..." : "Continue"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">{email}</p>
            <button 
              type="button" 
              onClick={goBack}
              className="text-sm text-[#ff4747] hover:underline"
            >
              Change email
            </button>
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#ff4747] hover:bg-[#ff2727]"
            disabled={isLoading || !password}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      )}

      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
