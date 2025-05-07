
import React, { useState } from 'react';
import { KeyRound, Mail, Phone, Eye, EyeOff, User } from 'lucide-react';
import Logo from "@/components/home/Logo";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col items-center min-h-screen bg-white text-[#333]">
      {/* Header with logo - simplified and centered */}
      <div className="w-full max-w-md pt-6 pb-4">
        <div className="flex justify-center items-center">
          <Logo width={60} height={60} className="text-[#ff4747]" />
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md px-6">
        <h1 className="text-2xl font-bold text-center mb-6">Log in to Mima</h1>
        <div className="space-y-4">
          {/* Social login carousel */}
          <div className="relative w-full">
            <Carousel 
              opts={{ 
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="pl-2 -ml-2">
                {/* Google button */}
                <CarouselItem className="basis-auto pl-2 snap-center">
                  <button className="min-w-[180px] py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-all bg-white shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    <span className="text-[#333]">Google</span>
                  </button>
                </CarouselItem>

                <CarouselItem className="basis-auto pl-2 snap-center">
                  <div className="flex items-center justify-center h-full px-2">
                    <Separator orientation="vertical" className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse" />
                  </div>
                </CarouselItem>

                {/* Facebook button */}
                <CarouselItem className="basis-auto pl-2 snap-center">
                  <button className="min-w-[180px] py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-all bg-white shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                    <span className="text-[#333]">Facebook</span>
                  </button>
                </CarouselItem>

                <CarouselItem className="basis-auto pl-2 snap-center">
                  <div className="flex items-center justify-center h-full px-2">
                    <Separator orientation="vertical" className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse" />
                  </div>
                </CarouselItem>

                {/* Apple button */}
                <CarouselItem className="basis-auto pl-2 snap-center">
                  <button className="min-w-[180px] py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-all bg-white shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="text-[#333]">Apple</span>
                  </button>
                </CarouselItem>

                <CarouselItem className="basis-auto pl-2 snap-center">
                  <div className="flex items-center justify-center h-full px-2">
                    <Separator orientation="vertical" className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent animate-pulse" />
                  </div>
                </CarouselItem>

                {/* X (Twitter) button */}
                <CarouselItem className="basis-auto pl-2 snap-center">
                  <button className="min-w-[180px] py-3 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-all bg-white shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                    <span className="text-[#333]">X</span>
                  </button>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

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
            <div className={`relative transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full"></div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-block relative">
                  <span className="text-[#999] text-sm">Don't have an account?</span>{' '}
                  <a 
                    href="#" 
                    className="relative inline-block group"
                  >
                    <span className="text-[#ff4747] font-medium text-sm group-hover:text-[#ff2727] transition-colors">
                      Sign up
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4747] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
                
                <div className="mt-1">
                  <span className="text-xs text-[#888] leading-snug">
                    By tapping <span className="bg-red-500 text-white px-2 py-0.5 rounded font-medium">Continue</span>, you acknowledge that you've read and agree to our 
                    <a href="/terms" className="text-red-600 hover:text-red-700 font-medium mx-1 border-b border-red-200 hover:border-red-500 transition-colors">Terms of Service</a> and 
                    <a href="/terms" className="text-red-600 hover:text-red-700 font-medium mx-1 border-b border-red-200 hover:border-red-500 transition-colors">Privacy Policy</a>, 
                    ensuring a secure and personalized experience.
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
