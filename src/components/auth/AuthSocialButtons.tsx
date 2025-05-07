
import React, { useRef, useState, useEffect } from 'react';
import { Twitter, Github } from 'lucide-react';
import { toast } from 'sonner';

interface AuthSocialButtonsProps {
  handleSocialLogin?: (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'apple') => void;
}

const AuthSocialButtons = ({ handleSocialLogin }: AuthSocialButtonsProps) => {
  const [activePage, setActivePage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const onSocialClick = (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'apple') => {
    if (handleSocialLogin) {
      handleSocialLogin(provider);
    } else {
      toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet`);
    }
  };

  return (
    <div className="w-full space-y-3">
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
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => onSocialClick('google')}
              >
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
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => onSocialClick('facebook')}
              >
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
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => onSocialClick('apple')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <span className="text-[#333]">Continue with Apple</span>
              </button>
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => onSocialClick('twitter')}
              >
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
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => onSocialClick('github')}
              >
                <Github className="w-5 h-5" />
                <span className="text-[#333]">Continue with GitHub</span>
              </button>
              <button 
                className="w-full py-2 px-4 border border-[#eaeaea] rounded-lg font-medium flex items-center justify-center space-x-2 hover:border-[#ff4747] transition-colors bg-white shadow-sm hover:shadow-md"
                onClick={() => toast.info("Phone login is not configured yet")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-[#333]">Continue with Phone</span>
              </button>
            </div>
          </div>
          
          {/* Right spacer to prevent last item from touching edge */}
          <div className="flex-none w-4"></div>
        </div>
      </div>
      
      {/* Pagination indicators */}
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
  );
};

export default AuthSocialButtons;
