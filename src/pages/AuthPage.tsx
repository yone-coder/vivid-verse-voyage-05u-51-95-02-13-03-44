
import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, Mail, Phone, Eye, EyeOff, User, X } from 'lucide-react';
import Logo from "@/components/home/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  // State management for the auth flow
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'phone', or 'passkey'
  const [step, setStep] = useState(1); // Multi-step process
  const [tabTransition, setTabTransition] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // Auth context
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Handle tab switching with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(false);
    }, 150);
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Basic validation
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      setStep(2); // Move to password step
    } else {
      // Password validation
      if (!password) {
        toast.error("Please enter a password.");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }

      try {
        if (isSignUp) {
          await signUp(email, password);
        } else {
          await signIn(email, password, rememberMe);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };

  // Monitor scroll position for pagination indicator
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const totalPages = 3; // Total number of pages in carousel
        const progress = scrollLeft / (scrollWidth - clientWidth);
        const currentPage = Math.round(progress * (totalPages - 1));
        setActivePage(currentPage);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
  const getTabButtonStyles = (tab: string) => {
    return `flex-1 py-3 text-center relative font-medium text-sm transition-all duration-200 ${
      activeTab === tab ? 'text-[#ff4747]' : 'text-[#666] hover:text-[#ff4747]'
    }`;
  };

  const containerClasses = isOverlay 
    ? "flex flex-col justify-between items-center min-h-full bg-white text-[#333] pt-8 pb-4" 
    : "flex flex-col justify-center items-center min-h-screen bg-white text-[#333] py-8";

  return (
    <div className={containerClasses}>
      <div className="w-full max-w-md px-4 flex flex-col items-center justify-center py-4">
        {/* Header with logo - reduced padding */}
        <div className="w-full max-w-md pt-2 pb-2">
          <div className="flex justify-center items-center">
            <Logo width={70} height={70} className="text-[#ff4747]" />
          </div>
        </div>

        {/* Main content - reduced spacing */}
        <div className="w-full mb-4 space-y-3">
          <h1 className="text-2xl font-bold text-center mb-2">
            {isSignUp ? "Create an account" : "Log in to Mima"}
          </h1>
          <div className="space-y-3">
            {/* Social login carousel */}
            <div className="w-screen -mx-4 relative">
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                  scrollPaddingLeft: '16px',
                  scrollPaddingRight: '16px'
                }}
              >
                {/* Left spacer for visual padding */}
                <div className="flex-shrink-0 w-4"></div>
                
                {/* Group 1: Google and Facebook */}
                <div className="flex-shrink-0 snap-start min-w-[calc(100%-2rem)] pr-4">
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
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
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                      <span className="text-[#333]">Continue with Facebook</span>
                    </button>
                  </div>
                </div>
                
                {/* Group 2: Apple and X (Twitter) */}
                <div className="flex-shrink-0 snap-start min-w-[calc(100%-2rem)] pr-4">
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                      <span className="text-[#333]">Continue with Apple</span>
                    </button>
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="text-[#333]">Continue with X</span>
                    </button>
                  </div>
                </div>
                
                {/* Group 3: GitHub and Phone */}
                <div className="flex-shrink-0 snap-start min-w-[calc(100%-2rem)] pr-4">
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      <span className="text-[#333]">Continue with GitHub</span>
                    </button>
                    <button className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md">
                      <Phone className="w-5 h-5" />
                      <span className="text-[#333]">Continue with Phone</span>
                    </button>
                  </div>
                </div>
                
                {/* Right spacer to prevent last item from touching edge */}
                <div className="flex-none w-4"></div>
              </div>
            </div>
            
            {/* Pagination indicators - reduced margin */}
            <div className="flex justify-center items-center space-x-3 mt-2">
              {[0, 1, 2].map((pageIndex) => (
                <div 
                  key={pageIndex}
                  className="h-1 rounded-full w-6 overflow-hidden bg-gray-200"
                >
                  <div 
                    className={`h-full bg-[#ff4747] transition-all duration-300 ease-out ${
                      activePage === pageIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-[#eaeaea]"></div>
            <span className="px-3 text-xs text-[#999]">OR</span>
            <div className="flex-grow border-t border-[#eaeaea]"></div>
          </div>

          {/* Enhanced Tab Switcher - reduced margin */}
          <div className="relative border-b border-[#eaeaea] mb-3 mt-2">
            <div className="flex">
              <button 
                className={getTabButtonStyles('email')}
                onClick={() => handleTabChange('email')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Mail size={14} />
                  <span className="text-sm">Email</span>
                </div>
              </button>
              <button 
                className={getTabButtonStyles('phone')}
                onClick={() => handleTabChange('phone')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Phone size={14} />
                  <span className="text-sm">Phone</span>
                </div>
              </button>
              <button 
                className={getTabButtonStyles('passkey')}
                onClick={() => handleTabChange('passkey')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <KeyRound size={14} />
                  <span className="text-sm">Passkey</span>
                </div>
              </button>
            </div>
            {/* Animated active tab indicator */}
            <div className={getTabIndicatorStyles()}></div>
          </div>

          {/* Login form - reduced spacing */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <div className={`transition-opacity duration-150 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
                <label htmlFor="login-input" className="block text-sm font-medium mb-1 text-[#333]">
                  {activeTab === 'email' ? "Email or username" : activeTab === 'phone' ? "Phone number" : "Passkey"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#999]">
                    {activeTab === 'email' ? <Mail size={16} /> : 
                     activeTab === 'phone' ? <Phone size={16} /> : 
                     <KeyRound size={16} />}
                  </div>
                  <input
                    id="login-input"
                    type={activeTab === 'email' ? "email" : activeTab === 'phone' ? "tel" : "text"}
                    placeholder={activeTab === 'email' ? "Email address or username" : 
                               activeTab === 'phone' ? "Phone number" : "Passkey"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#333]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex items-center mt-2">
                <div className="relative inline-block w-8 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="opacity-0 absolute block w-4 h-4 cursor-pointer" 
                  />
                  <label 
                    htmlFor="remember" 
                    className={`block overflow-hidden h-4 rounded-full bg-[#e8e8e8] cursor-pointer ${rememberMe ? 'bg-[#ff4747]' : ''}`}
                  >
                    <span className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></span>
                  </label>
                </div>
                <label htmlFor="remember" className="text-xs cursor-pointer text-[#666]">
                  Remember me
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ff4747] text-white font-medium py-2 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white mt-3"
            >
              {step === 1 ? 'Next' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>

            {step === 2 && (
              <div className="text-center mt-2">
                <a href="#" className="text-[#ff4747] hover:text-[#ff2727] hover:underline text-xs transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}

            {step === 1 && (
              <div className={`relative transition-opacity duration-150 mt-4 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center justify-center">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full"></div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="inline-block relative">
                    <span className="text-[#999] text-xs">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    </span>{' '}
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSignUp(!isSignUp);
                      }}
                      className="relative inline-block group ml-1"
                    >
                      <span className="text-[#ff4747] font-medium text-xs group-hover:text-[#ff2727] transition-colors">
                        {isSignUp ? "Log in" : "Sign up"}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4747] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Legal disclaimer - reduced padding */}
        <div className="w-full mt-2 py-2 text-center">
          <span className="text-xs text-[#888]">
            By tapping Continue, you agree to our{' '}
            <a href="/terms" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
              Terms
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-red-600 hover:text-red-700 font-medium border-b border-red-200 hover:border-red-500 transition-colors">
              Privacy
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
