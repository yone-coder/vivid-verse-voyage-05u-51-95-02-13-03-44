
import React, { useState, useEffect } from 'react';
import { KeyRound, Mail, Phone, Eye, EyeOff } from 'lucide-react';

const SpotifyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'username', or 'phone'
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

  // Active tab indicator styles
  const getTabIndicatorStyles = () => {
  let position = "left-0";

  if (activeTab === 'email') position = "left-0";
  else if (activeTab === 'phone') position = "left-1/3";
  else if (activeTab === 'passkey') position = "left-2/3";

  return `absolute bottom-0 w-1/3 h-0.5 bg-green-500 transition-all duration-300 ${position}`;
};

  // Get tab button styles
  const getTabButtonStyles = (tab) => {
    return `flex-1 py-3 text-center relative font-medium text-sm transition-all duration-200 ${
      activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
    }`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* Header with logo */}
      <div className="w-full max-w-md pt-10 pb-8">
        <div className="flex justify-center">
          <svg viewBox="0 0 1134 340" className="h-10 text-green-500">
            <path
              fill="currentColor"
              d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l39 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md pt-2 px-6 pb-6 rounded-lg bg-black">
  <h1 className="text-2xl font-bold text-center mb-6">Log in to Spotify</h1>
        <div className="space-y-4">
          {/* Social login buttons */}
          <button className="w-full py-3 px-4 border border-gray-700 rounded-full font-bold flex items-center justify-center space-x-2 hover:border-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button className="w-full py-3 px-4 border border-gray-700 rounded-full font-bold flex items-center justify-center space-x-2 hover:border-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
            <span>Continue with Facebook</span>
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
        </div>

        {/* Enhanced Tab Switcher */}
        <div className="relative border-b border-gray-700 mb-6 mt-6">
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
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${rememberMe ? 'bg-green-500' : ''}`}
                >
                  <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></span>
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

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">Don't have an account?</p>
          <a href="#" className="block mt-2 border border-gray-700 text-white font-bold py-3 px-4 rounded-full hover:border-green-500 hover:text-green-500 transition-colors">
            Sign up for Spotify
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md py-8 text-center text-xs text-gray-400">
        <p>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="text-white underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-white underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};

export default SpotifyLogin;