
import React, { useState, useEffect } from 'react';
import { KeyRound, Mail, Phone, Eye, EyeOff, User } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'phone', or 'passkey'
  const [step, setStep] = useState(1); // Multi-step process
  const [tabTransition, setTabTransition] = useState(false);

  // Handle tab switching with animation
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
      setStep(2); // Move to password step
    } else {
      console.log('Login attempted with:', { 
        [activeTab]: activeTab === 'email' ? email : activeTab === 'username' ? email : email, // Using email state for all for simplicity
        password, 
        rememberMe 
      });
    }
  };

  const renderInputField = () => {
    let placeholder = '';
    let type = 'text';
    let label = '';
    let icon = <Mail size={18} />;
    
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
        <label htmlFor="login-input" className="block text-sm font-medium mb-2 text-[#333]">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#999]">
            {icon}
          </div>
          <input
            id="login-input"
            type={type}
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
            required
          />
        </div>
      </div>
    );
  };

  // Active tab indicator styles
  const getTabIndicatorStyles = () => {
    let position = "left-0";

    if (activeTab === 'email') position = "left-0";
    else if (activeTab === 'phone') position = "left-1/3";
    else if (activeTab === 'passkey') position = "left-2/3";

    return `absolute bottom-0 w-1/3 h-0.5 bg-[#ff4747] transition-all duration-300 ${position}`;
  };

  // Get tab button styles
  const getTabButtonStyles = (tab) => {
    return `flex-1 py-3 text-center relative font-medium text-sm transition-all duration-200 ${
      activeTab === tab ? 'text-[#ff4747]' : 'text-[#666] hover:text-[#ff4747]'
    }`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f5f5f5] text-[#333]">
      {/* Header with logo */}
      <div className="w-full max-w-md pt-10 pb-8">
        <div className="flex justify-center">
          <svg viewBox="0 0 180 40" className="h-8 text-[#ff4747]">
            <path
              fill="currentColor"
              d="M8.65 19.2H17v2.14H8.65V29H6.4V11.14h11.62v2.13H8.65v5.93zm16.44 3.9c.2 2.06 1.76 3.72 4.38 3.72 1.68 0 3.1-.84 3.74-2.07l1.9.95c-.95 1.8-3.03 3-5.67 3-3.87 0-6.44-2.73-6.44-6.9s2.53-6.9 6.44-6.9c3.92 0 6.2 2.9 6.2 6.9 0 .38-.04.9-.08 1.3H25.1zm8.5-1.85c-.27-2.1-1.8-3.5-4.17-3.5s-3.95 1.46-4.22 3.5h8.38zm9.6-5.14h2.22v1.7h-2.23v8.08c0 .95.42 1.4 1.36 1.4.34 0 .65-.04.88-.11v1.9c-.27.04-.88.1-1.33.1-2.37 0-3.44-1.02-3.44-3.05v-8.33h-1.9v-1.7h1.9v-4h2.52v4zm12.3 13.8c-4.1 0-6.68-2.82-6.68-6.9s2.56-6.9 6.67-6.9c4.1 0 6.66 2.82 6.66 6.9s-2.55 6.9-6.66 6.9zm0-11.93c-2.56 0-4.14 1.96-4.14 5.02 0 3.07 1.58 5.03 4.13 5.03s4.06-1.96 4.06-5.03c0-3.06-1.52-5.03-4.07-5.03zm17.13 11.74h-2.48V28.2c-.8.6-1.95 1-3.22 1-3.55 0-5.9-2.67-5.9-6.86 0-4.2 2.35-6.94 5.9-6.94 1.24 0 2.4.42 3.22 1.06v-.88h2.48v12.32zm-5.37-.27c1.41 0 2.52-.53 2.9-1.06v-7.72c-.38-.53-1.5-1.1-2.9-1.1-2.37 0-3.7 1.9-3.7 4.94 0 2.97 1.33 4.94 3.7 4.94zm7.05-12.05h2.51v1.62c.65-1.1 2.03-1.82 3.67-1.82 2.75 0 4.44 1.7 4.44 4.6v7.92h-2.52v-7.38c0-1.96-1.1-3.07-2.79-3.07-1.68 0-2.8 1.14-2.8 3.11v7.34h-2.52V17.4zm18.97 12.5c-3.89 0-6.48-2.66-6.48-6.9 0-4.06 2.6-6.9 6.02-6.9 3.47 0 5.9 2.67 5.9 6.67 0 .34 0 .57-.04.88h-9.33c.16 2.52 1.6 4.28 3.97 4.28 1.56 0 2.86-.69 3.5-2.1l2.22.68c-.92 2.18-3.07 3.38-5.75 3.38zm-3.9-8.23h6.9c-.31-2.06-1.6-3.65-3.47-3.65-1.9 0-3.16 1.56-3.43 3.65zm16.03-6.62v2.26c-2.21 0-3.58 1.14-3.58 3.46v6.14h-2.52V17.4h2.52v2.17c.65-1.36 1.9-2.25 3.58-2.52zm5.25 2.37c.65-1.33 2.29-2.56 4.33-2.56v2.56c-2.6-.27-4.33 1.14-4.33 3.8v6.03h-2.52V17.4h2.52v1.9zm12.38 12.47c-4.1 0-6.67-2.82-6.67-6.9s2.56-6.9 6.67-6.9c4.1 0 6.67 2.82 6.67 6.9s-2.56 6.9-6.67 6.9zm0-11.93c-2.56 0-4.14 1.96-4.14 5.02 0 3.07 1.58 5.03 4.14 5.03 2.55 0 4.06-1.96 4.06-5.03 0-3.06-1.5-5.03-4.06-5.03zm16.2 11.93c-3.88 0-6.47-2.66-6.47-6.9 0-4.06 2.6-6.9 6.03-6.9 3.46 0 5.9 2.67 5.9 6.67 0 .34 0 .57-.04.88h-9.34c.15 2.52 1.6 4.28 3.97 4.28 1.56 0 2.86-.69 3.5-2.1l2.22.68c-.92 2.18-3.07 3.38-5.76 3.38zm-3.88-8.23h6.9c-.31-2.06-1.6-3.65-3.48-3.65-1.9 0-3.15 1.56-3.42 3.65z"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md px-6 py-8 rounded-lg bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Log in to AliExpress</h1>
        <div className="space-y-4">
          {/* Social login buttons */}
          <button className="w-full py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span className="text-[#333]">Continue with Google</span>
          </button>

          <button className="w-full py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
            <span className="text-[#333]">Continue with Facebook</span>
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-[#eaeaea]"></div>
            <span className="px-4 text-sm text-[#999]">OR</span>
            <div className="flex-grow border-t border-[#eaeaea]"></div>
          </div>
        </div>

        {/* Enhanced Tab Switcher */}
        <div className="relative border-b border-[#eaeaea] mb-6 mt-6">
          <div className="flex">
            <button 
              className={getTabButtonStyles('email')}
              onClick={() => handleTabChange('email')}
            >
              <div className="flex items-center justify-center space-x-1">
                <Mail size={16} />
                <span>Email</span>
              </div>
            </button>
            <button 
              className={getTabButtonStyles('phone')}
              onClick={() => handleTabChange('phone')}
            >
              <div className="flex items-center justify-center space-x-1">
                <Phone size={16} />
                <span>Phone</span>
              </div>
            </button>
            <button 
              className={getTabButtonStyles('passkey')}
              onClick={() => handleTabChange('passkey')}
            >
              <div className="flex items-center justify-center space-x-1">
                <KeyRound size={16} />
                <span>Passkey</span>
              </div>
            </button>
          </div>
          {/* Animated active tab indicator */}
          <div className={getTabIndicatorStyles()}></div>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            renderInputField()
          ) : (
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-[#333]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
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
                  className={`block overflow-hidden h-6 rounded-full bg-[#e8e8e8] cursor-pointer ${rememberMe ? 'bg-[#ff4747]' : ''}`}
                >
                  <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </label>
              </div>
              <label htmlFor="remember" className="text-sm cursor-pointer text-[#666]">
                Remember me
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#ff4747] text-white font-medium py-3 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white"
          >
            {step === 1 ? 'Next' : 'Log In'}
          </button>

          {step === 2 && (
            <div className="text-center">
              <a href="#" className="text-[#ff4747] hover:text-[#ff2727] hover:underline text-sm transition-colors">
                Forgot your password?
              </a>
            </div>
          )}

          {step === 1 && (
            <div className={`text-center transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-sm text-[#999]">
                {activeTab === 'email' && "We'll send you a link to log in"}
                {activeTab === 'username' && "Enter your AliExpress username"}
                {activeTab === 'phone' && "We'll send you a confirmation code"}
              </span>
            </div>
          )}
        </form>

        <div className="mt-8 border-t border-[#eaeaea] pt-6 text-center">
          <p className="text-[#999] text-sm">Don't have an account?</p>
          <a href="#" className="block mt-2 border border-[#eaeaea] text-[#ff4747] font-medium py-3 px-4 rounded-md hover:border-[#ff4747] hover:bg-[#fff0f0] transition-colors">
            Sign up for AliExpress
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md py-8 text-center text-xs text-[#999]">
        <p>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="text-[#ff4747] underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-[#ff4747] underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
