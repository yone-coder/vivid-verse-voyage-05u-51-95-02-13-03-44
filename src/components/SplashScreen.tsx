
import React from 'react';

interface SplashScreenProps {
  isVisible: boolean;
}

export default function AnimatedSplashScreen({ isVisible }: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 min-h-screen bg-red-500 flex items-center justify-center overflow-hidden z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Pulse Background */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30">
          <div className="w-full h-full rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"></div>
        </div>

        {/* Logo Container */}
        <div className="relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <svg 
            className="w-[300px] h-[300px] animate-logo-float" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1024 1024"
          >
            <path 
              className="animate-main-path"
              d="M497.5 319.5c64.443-2.7 118.276 19.634 161.5 67 21.949 26.235 36.115 56.235 42.5 90-15.362 1.337-30.695 3.003-46 5-1.333-.333-2.667-.667-4-1-23.809-77.246-76.143-114.08-157-110.5-54.081 8.12-91.914 37.287-113.5 87.5-19.457 52.58-12.457 101.246 21 146 35.061 40.14 79.228 56.64 132.5 49.5 52.235-10.087 89.235-39.254 111-87.5-1.667-.333-3.333-.667-5-1-68.917 8.274-137.917 9.107-207 2.5-7.335-13.165-11.335-27.331-12-42.5 82.616 7.15 164.95 4.816 247-7 23.199-3.345 45.865-8.845 68-16.5 21.813-7.817 22.48-16.817 2-27-7.929-3.184-16.096-5.351-24.5-6.5-1.636-13.236-5.469-25.736-11.5-37.5 24.969 2.656 48.303 10.323 70 23 9.266 5.932 16.432 13.765 21.5 23.5 5.144 16.571 1.311 30.738-11.5 42.5-12.653 10.831-26.986 18.831-43 24-12.847 3.869-25.847 7.035-39 9.5-11.744 54.007-41.078 95.507-88 124.5-57.7 32.2-117.367 36.2-179 12-58.983-27.982-96.316-73.648-112-137-25.568-3.106-49.235-11.439-71-25-34.304-29.96-31.637-56.293 8-79 19.267-9.7 39.601-15.867 61-18.5-2.479 6.968-4.979 13.968-7.5 21-1.89 5.515-2.724 11.181-2.5 17-14.251 1.13-26.917 6.13-38 15-4.143 4.785-3.477 8.951 2 12.5 13.68 7.727 28.347 12.56 44 14.5 5.334-79.466 43.334-137.299 114-173 16.909-7.58 34.575-12.414 53-14.5 4.6.22 8.933-.446 13-2z"
            />
            <path 
              className="animate-accent-path" 
              fill="#edb6b1" 
              d="M497.5 319.5c-4.067 1.554-8.4 2.22-13 2 4.045-1.677 8.378-2.344 13-2z"
            />
          </svg>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes draw-path-complex {
          0% {
            stroke-dashoffset: 2000;
            stroke-width: 1;
            filter: drop-shadow(0 0 5px rgba(254, 253, 253, 0.3));
          }
          30% {
            stroke-width: 4;
            filter: drop-shadow(0 0 15px rgba(254, 253, 253, 0.6));
          }
          60% {
            stroke-dashoffset: 500;
            stroke-width: 3;
            filter: drop-shadow(0 0 25px rgba(254, 253, 253, 0.8));
          }
          100% {
            stroke-dashoffset: 0;
            stroke-width: 3;
            filter: drop-shadow(0 0 20px rgba(254, 253, 253, 0.7));
          }
        }

        @keyframes fill-path-complex {
          0% {
            fill: transparent;
            stroke-width: 3;
            filter: drop-shadow(0 0 20px rgba(254, 253, 253, 0.7));
          }
          50% {
            fill: rgba(254, 253, 253, 0.3);
            stroke-width: 2;
            filter: drop-shadow(0 0 30px rgba(254, 253, 253, 0.9));
          }
          100% {
            fill: #fefdfd;
            stroke-width: 0;
            filter: drop-shadow(0 0 25px rgba(254, 253, 253, 0.6));
          }
        }

        @keyframes glow-complex {
          0% {
            filter: drop-shadow(0 0 15px rgba(254, 253, 253, 0.4)) drop-shadow(0 0 30px rgba(254, 253, 253, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(254, 253, 253, 0.7)) drop-shadow(0 0 50px rgba(254, 253, 253, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 40px rgba(254, 253, 253, 0.9)) drop-shadow(0 0 80px rgba(254, 253, 253, 0.4));
          }
        }

        @keyframes stroke-pulse {
          0% {
            stroke: #fefdfd;
          }
          50% {
            stroke: rgba(254, 253, 253, 0.8);
          }
          100% {
            stroke: #ffffff;
          }
        }

        @keyframes fade-in-pulse-complex {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
            filter: drop-shadow(0 0 5px rgba(237, 182, 177, 0.3));
          }
          30% {
            opacity: 0.7;
            transform: scale(1.3) rotate(5deg);
            filter: drop-shadow(0 0 15px rgba(237, 182, 177, 0.6));
          }
          60% {
            opacity: 0.9;
            transform: scale(0.9) rotate(-2deg);
            filter: drop-shadow(0 0 25px rgba(237, 182, 177, 0.8));
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 20px rgba(237, 182, 177, 0.7));
          }
        }

        @keyframes accent-glow {
          0% {
            filter: drop-shadow(0 0 10px rgba(237, 182, 177, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 30px rgba(237, 182, 177, 0.9)) drop-shadow(0 0 60px rgba(237, 182, 177, 0.4));
          }
        }

        @keyframes fade-in-pulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes logo-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        .animate-main-path {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          stroke: #fefdfd;
          stroke-width: 3;
          fill: transparent;
          animation: draw-path-complex 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     fill-path-complex 1.5s ease-out 4s forwards,
                     glow-complex 3s ease-in-out 5.5s infinite alternate,
                     stroke-pulse 2s ease-in-out 4s infinite alternate;
        }

        .animate-accent-path {
          opacity: 0;
          transform-origin: center;
          animation: fade-in-pulse-complex 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 6s forwards,
                     accent-glow 2s ease-in-out 8s infinite alternate;
        }

        .animate-logo-float {
          animation: logo-float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
