import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ShoppingBag, Facebook, Github } from 'lucide-react';

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('email');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempt with:', { email, password, rememberMe });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      {/* Header with logo */}
      <div className="bg-orange-500  text-center">
        <div className="flex items-center justify-center">
          <ShoppingBag className="text-white mr-2" size={24} />
          <h1 className="text-xl font-bold text-white">AliExpress</h1>
        </div>
        <p className="text-white text-xs mt-1">Global marketplace. Unlimited possibilities.</p>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Tab navigation */}
        <div className="flex border-b mb-6">
          {['email', 'phone', 'qr'].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-4 text-sm font-medium ${activeTab === tab ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'email' ? 'Email' : tab === 'phone' ? 'Phone' : 'QR Code'}
            </button>
          ))}
        </div>

        {activeTab === 'email' && (
          <div className="space-y-4">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="text-xs font-medium text-gray-600 mb-1 block">Email / Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-xs font-medium text-orange-600 hover:text-orange-500">
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign in
            </button>
          </div>
        )}

        {activeTab === 'phone' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Phone Number</label>
              <div className="flex">
                <select className="w-1/4 mr-2 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
                  <option>+1</option>
                  <option>+44</option>
                  <option>+86</option>
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  className="w-3/4 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Verification Code</label>
              <div className="flex">
                <input
                  type="text"
                  className="w-2/3 mr-2 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="6-digit code"
                />
                <button className="w-1/3 py-2 px-3 border border-transparent rounded-lg text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none">
                  Get Code
                </button>
              </div>
            </div>

            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign in
            </button>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">QR Code Scanner</span>
            </div>
            <p className="mt-4 text-xs text-gray-500">Scan with the AliExpress app to sign in instantly</p>
          </div>
        )}

        {/* Social sign-in options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 text-xs">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <Facebook size={16} />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <Github size={16} />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <User size={16} />
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Not a member yet?{' '}
          <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
            Create an account
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 text-center text-xs text-gray-500">
        <p>
          By signing in, you agree to our{' '}
          <a href="#" className="text-orange-600">Terms</a> and{' '}
          <a href="#" className="text-orange-600">Privacy Policy</a>
        </p>
      </div>

      {/* Language selector */}
      <div className="mt-4 text-xs text-gray-500 flex items-center justify-center">
        <span>English</span>
        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SignInScreen;