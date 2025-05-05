
import { useState, useEffect } from 'react';
import { LoginTabs } from '@/components/auth/LoginTabs';
import { EmailLoginForm } from '@/components/auth/EmailLoginForm';
import { PhoneLoginForm } from '@/components/auth/PhoneLoginForm';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { RememberMeToggle } from '@/components/auth/RememberMeToggle';
import { ForgotPassword } from '@/components/auth/ForgotPassword';
import { LoginButton } from '@/components/auth/LoginButton';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { QuickLoginPanel } from '@/components/auth/QuickLoginPanel';
import { RegistrationLink } from '@/components/auth/RegistrationLink';
import { SecurityTipsPanel } from '@/components/auth/SecurityTipsPanel';
import { FeatureTogglePanel } from '@/components/auth/FeatureTogglePanel';
import { FeatureOptions } from '@/components/auth/FeatureOptions';
import { LoginHeader } from '@/components/auth/LoginHeader';

export default function UltraModernLogin() {
  // Core state
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // UI settings
  const [showSecurityTips, setShowSecurityTips] = useState(false);
  const [loginMethod, setLoginMethod] = useState('normal');
  const [theme, setTheme] = useState('light');
  const [showFeaturePanel, setShowFeaturePanel] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call  
    setTimeout(() => {  
      setIsLoading(false);  
      console.log('Login attempted with:', activeTab === 'email' ? { email, password } : { phone, password });  
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-gray-50 to-gray-100';

  const primaryColorClasses = theme === 'dark' 
    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
    : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500';

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-all duration-500 w-full ${themeClasses}`}>
      <div className="w-full flex flex-col">
        {/* Login container */}
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 relative">
          {/* Feature toggles */}
          <FeatureTogglePanel 
            theme={theme} 
            toggleTheme={toggleTheme}
            showFeaturePanel={showFeaturePanel}
            setShowFeaturePanel={setShowFeaturePanel}
          />

          {/* Feature panel */}
          <FeatureOptions theme={theme} showFeaturePanel={showFeaturePanel} />

          {/* Login header */}
          <LoginHeader 
            loginMethod={loginMethod} 
            theme={theme} 
            setLoginMethod={setLoginMethod} 
          />

          {loginMethod === 'normal' ? (
            <>
              {/* Login tabs */}  
              <LoginTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                theme={theme} 
              />

              {/* Login Form Fields */}  
              <form onSubmit={handleSubmit} className="py-6 w-full">  
                <div className={`transition-all duration-300 ${activeTab === 'email' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>  
                  <EmailLoginForm 
                    email={email} 
                    setEmail={setEmail} 
                    theme={theme} 
                  />
                </div>  
                  
                <div className={`transition-all duration-300 ${activeTab === 'phone' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>  
                  <PhoneLoginForm 
                    phone={phone} 
                    setPhone={setPhone} 
                    countryCode={countryCode} 
                    setCountryCode={setCountryCode} 
                    theme={theme} 
                  />
                </div>  

                <PasswordInput 
                  password={password} 
                  setPassword={setPassword} 
                  theme={theme} 
                />

                <div className="flex items-center justify-between mb-6">  
                  <RememberMeToggle 
                    rememberMe={rememberMe} 
                    setRememberMe={setRememberMe} 
                    theme={theme} 
                  />
                  <ForgotPassword theme={theme} />
                </div>  

                <LoginButton 
                  isLoading={isLoading} 
                  primaryColorClasses={primaryColorClasses} 
                />
              </form> 
            </>
          ) : (
            // Quick login UI
            <QuickLoginPanel theme={theme} primaryColorClasses={primaryColorClasses} />
          )}

          {/* Social logins */}  
          <SocialLogin theme={theme} />

          {/* Registration link and security toggle */}  
          <RegistrationLink 
            theme={theme} 
            showSecurityTips={showSecurityTips} 
            setShowSecurityTips={setShowSecurityTips} 
          />

          {/* Security tips */}
          <SecurityTipsPanel 
            showSecurityTips={showSecurityTips} 
            theme={theme} 
          />
        </div>  
      </div>  
    </div>
  );
}
