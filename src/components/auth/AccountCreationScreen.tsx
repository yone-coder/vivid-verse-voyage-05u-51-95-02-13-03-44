
import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';

interface AccountCreationScreenProps {
  onBack: () => void;
  email: string;
  onAccountCreated: () => void;
}

const AccountCreationScreen: React.FC<AccountCreationScreenProps> = ({
  onBack,
  email,
  onAccountCreated,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = firstName.trim() && lastName.trim() && password.length >= 8 && password === confirmPassword;

  const handleCreateAccount = async () => {
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Account created for:', email, firstName, lastName);
      onAccountCreated();
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Header */}
      <div className="pt-2 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Go back"
          disabled={isLoading}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Create Account
        </h2>

        <button
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Help"
          onClick={() => alert('Need help? Contact support@example.com')}
          type="button"
          disabled={isLoading}
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 px-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Fill in your details to get started
          </p>
        </div>

        {/* Email display */}
        <div className="mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">{email}</span>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 8 characters)"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
        </div>

        {/* Create Account Button */}
        <button
          disabled={!isFormValid || isLoading}
          onClick={handleCreateAccount}
          className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-lg font-medium transition-all mb-8 ${
            isFormValid && !isLoading
              ? 'bg-red-500 text-white hover:bg-red-600 active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          type="button"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <User className="w-5 h-5" />
              <span>Create Account</span>
            </>
          )}
        </button>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z"/>
            </svg>
            <span className="text-gray-500 text-sm">Your information is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationScreen;
