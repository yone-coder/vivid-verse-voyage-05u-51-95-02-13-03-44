import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import new component structure
import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthFooter from '@/components/auth/AuthFooter';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [activeTab, setActiveTab] = useState('email');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'email') {
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    if (activeTab === 'phone' && !phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    toast.info("Continue to next step not implemented.");
  };

  const handleSocialLogin = async (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'apple') => {
    toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet`);
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader title="Log in to Mima" />

      <div className="w-full mb-4 space-y-3">
        <AuthSocialButtons handleSocialLogin={handleSocialLogin} />

        <AuthTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          isSignUp={false}
          fullName={''}
          setFullName={() => {}}
          onSubmit={handleSubmit}
          step={1} // Force step 1
        />
      </div>

      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;