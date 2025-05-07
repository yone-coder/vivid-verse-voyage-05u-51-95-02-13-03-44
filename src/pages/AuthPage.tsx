import React, { useState } from 'react';
import { User, Mail, Phone, Eye, EyeOff } from 'lucide-react';

const SpotifyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [step, setStep] = useState(1);
  const [tabTransition, setTabTransition] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(false);
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Login attempted with:', {
        [activeTab]: email,
        password,
        rememberMe,
      });
    }
  };

  const renderInputField = () => {
    let placeholder = '';
    let type = 'text';
    let label = '';
    let icon;

    switch (activeTab) {
      case 'email':
        placeholder = 'Email address or username';
        type = 'email';
        label = 'Email or username';
        icon = <Mail size={18} />;
        break;
      case 'username':
        placeholder = 'Username';
        type = 'text';
        label = 'Username';
        icon = <User size={18} />;
        break;
      case 'phone':
        placeholder = 'Phone number';
        type = 'tel';
        label = 'Phone number';
        icon = <Phone size={18} />;
        break;
      default:
        placeholder = 'Email';
        type = 'email';
        label = 'Email';
        icon = <Mail size={18} />;
    }

    return (
      <div className={`transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
        <label htmlFor="login-input" className="block text-sm font-medium mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
          <input
            id="login-input"
            type={type}
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    );
  };

  const getTabIndicatorStyles = () => {
    let position = "left-0";
    if (activeTab === 'username') position = "left-1/3";
    else if (activeTab === 'phone') position = "left-2/3";
    return `absolute bottom-0 w-1/3 h-0.5 bg-green-500 transition-all duration-300 ${position}`;
  };

  const getTabButtonStyles = (tab) => {
    return `flex-1 py-3 text-center relative font-medium text-sm transition-all duration-200 ${
      activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
    }`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md pt-2 px-6 pb-6 rounded-lg bg-black">

        <h1 className="text-2xl font-bold mb-4">Log in to Spotify</h1>

        {/* Social login buttons */}
        <div className="space-y-4 mb-4">
          <button className="w-full py-3 px-4 border border-gray-700 rounded-full font-bold flex items-center justify-center space-x-2 hover:border-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-700" />
          <span className="px-4 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-700" />
        </div>

        {/* Tab Switcher */}
        <div className="relative border-b border-gray-700 mb-6 mt-6">
          <div className="flex">
            <button className={getTabButtonStyles('email')} onClick={() => handleTabChange('email')}>
              <div className="flex items-center justify-center space-x-1">
                <Mail size={16} />
                <span>Email</span>
              </div>
            </button>
            <button className={getTabButtonStyles('username')} onClick={() => handleTabChange('username')}>
              <div className="flex items-center justify-center space-x-1">
                <User size={16} />
                <span>Username</span>
              </div>
            </button>
            <button className={getTabButtonStyles('phone')} onClick={() => handleTabChange('phone')}>
              <div className="flex items-center justify-center space-x-1">
                <Phone size={16} />
                <span>Phone</span>
              </div>
            </button>
          </div>
          <div className={getTabIndicatorStyles()} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            renderInputField()
          ) : (
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="opacity-0 absolute block w-6 h-6 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    rememberMe ? 'bg-green-500' : ''
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                      rememberMe ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
              <label htmlFor="remember" className="text-sm cursor-pointer">
                Remember me
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-bold py-3 px-4 rounded-full hover:scale-105 hover:bg-green-400 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {step === 1 ? 'Next' : 'Log In'}
          </button>

          {step === 2 && (
            <div className="text-center">
              <a href="#" className="text-gray-400 hover:text-white hover:underline text-sm transition-colors">
                Forgot your password?
              </a>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{' '}
              <a href="#" className="text-green-500 hover:underline">
                Sign up
              </a>
            </div>
          )}

          {step === 1 && (
            <div className={`text-center transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-sm text-gray-400">
                {activeTab === 'email' && "We'll send you a link to log in"}
                {activeTab === 'username' && "Enter your Spotify username"}
                {activeTab === 'phone' && "We'll send you a confirmation code"}
              </span>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="w-full max-w-md py-8 text-center text-xs text-gray-400">
          <p>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-white underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-white underline">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyLogin;