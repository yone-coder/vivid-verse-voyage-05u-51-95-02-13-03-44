
import React from 'react';

// Background Pulse Component
interface PulseBackgroundProps {
  className?: string;
}

function PulseBackground({ className = '' }: PulseBackgroundProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30 ${className}`}>
      <div className="w-full h-full rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"></div>
    </div>
  );
}

// Main Logo Path Component
interface MainLogoPathProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

function MainLogoPath({ 
  className = '', 
  strokeColor = '#ef4444',
  fillColor = 'transparent' 
}: MainLogoPathProps) {
  return (
    <>
      <path 
        className={`animate-main-path ${className}`}
        d="M497.5 319.5c64.443-2.7 118.276 19.634 161.5 67 21.949 26.235 36.115 56.235 42.5 90-15.362 1.337-30.695 3.003-46 5-1.333-.333-2.667-.667-4-1-23.809-77.246-76.143-114.08-157-110.5-54.081 8.12-91.914 37.287-113.5 87.5-19.457 52.58-12.457 101.246 21 146 35.061 40.14 79.228 56.64 132.5 49.5 52.235-10.087 89.235-39.254 111-87.5-1.667-.333-3.333-.667-5-1-68.917 8.274-137.917 9.107-207 2.5-7.335-13.165-11.335-27.331-12-42.5 82.616 7.15 164.95 4.816 247-7 23.199-3.345 45.865-8.845 68-16.5 21.813-7.817 22.48-16.817 2-27-7.929-3.184-16.096-5.351-24.5-6.5-1.636-13.236-5.469-25.736-11.5-37.5 24.969 2.656 48.303 10.323 70 23 9.266 5.932 16.432 13.765 21.5 23.5 5.144 16.571 1.311 30.738-11.5 42.5-12.653 10.831-26.986 18.831-43 24-12.847 3.869-25.847 7.035-39 9.5-11.744 54.007-41.078 95.507-88 124.5-57.7 32.2-117.367 36.2-179 12-58.983-27.982-96.316-73.648-112-137-25.568-3.106-49.235-11.439-71-25-34.304-29.96-31.637-56.293 8-79 19.267-9.7 39.601-15.867 61-18.5-2.479 6.968-4.979 13.968-7.5 21-1.89 5.515-2.724 11.181-2.5 17-14.251 1.13-26.917 6.13-38 15-4.143 4.785-3.477 8.951 2 12.5 13.68 7.727 28.347 12.56 44 14.5 5.334-79.466 43.334-137.299 114-173 16.909-7.58 34.575-12.414 53-14.5 4.6.22 8.933-.446 13-2z"
        stroke={strokeColor}
        fill={fillColor}
        style={{
          strokeDasharray: '4000',
          strokeDashoffset: '4000',
          strokeWidth: '2',
          animation: `
            draw-path-enhanced 8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            fill-path-enhanced 3s ease-out 8s forwards,
            glow-continuous 4s ease-in-out 11s infinite alternate,
            stroke-flow 3s ease-in-out 8s infinite alternate
          `
        }}
      />
      <style>{`
        @keyframes draw-path-enhanced {
          0% {
            stroke-dashoffset: 4000;
            stroke-width: 1;
            filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.3));
          }
          10% {
            stroke-width: 4;
            filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.5));
          }
          25% {
            stroke-dashoffset: 3000;
            stroke-width: 6;
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.7));
          }
          50% {
            stroke-dashoffset: 1500;
            stroke-width: 5;
            filter: drop-shadow(0 0 35px rgba(239, 68, 68, 0.9));
          }
          75% {
            stroke-dashoffset: 500;
            stroke-width: 3;
            filter: drop-shadow(0 0 45px rgba(239, 68, 68, 1));
          }
          90% {
            stroke-dashoffset: 100;
            stroke-width: 2;
            filter: drop-shadow(0 0 40px rgba(239, 68, 68, 0.9));
          }
          100% {
            stroke-dashoffset: 0;
            stroke-width: 2;
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.8));
          }
        }

        @keyframes fill-path-enhanced {
          0% {
            fill: transparent;
            stroke-width: 2;
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.8));
          }
          20% {
            fill: rgba(239, 68, 68, 0.1);
            stroke-width: 1.8;
            filter: drop-shadow(0 0 35px rgba(239, 68, 68, 0.85));
          }
          50% {
            fill: rgba(239, 68, 68, 0.4);
            stroke-width: 1.2;
            filter: drop-shadow(0 0 45px rgba(239, 68, 68, 0.95));
          }
          80% {
            fill: rgba(239, 68, 68, 0.8);
            stroke-width: 0.5;
            filter: drop-shadow(0 0 50px rgba(239, 68, 68, 1));
          }
          100% {
            fill: #ef4444;
            stroke-width: 0;
            filter: drop-shadow(0 0 40px rgba(239, 68, 68, 0.9));
          }
        }

        @keyframes glow-continuous {
          0% {
            filter: drop-shadow(0 0 25px rgba(239, 68, 68, 0.6)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 45px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 90px rgba(239, 68, 68, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 60px rgba(239, 68, 68, 1)) drop-shadow(0 0 120px rgba(239, 68, 68, 0.6));
          }
        }

        @keyframes stroke-flow {
          0% {
            stroke: #ef4444;
            stroke-opacity: 1;
          }
          20% {
            stroke: rgba(239, 68, 68, 0.9);
            stroke-opacity: 0.95;
          }
          40% {
            stroke: #dc2626;
            stroke-opacity: 0.85;
          }
          60% {
            stroke: rgba(239, 68, 68, 0.8);
            stroke-opacity: 0.9;
          }
          80% {
            stroke: rgba(239, 68, 68, 0.9);
            stroke-opacity: 0.98;
          }
          100% {
            stroke: #ef4444;
            stroke-opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

// Accent Path Component
interface AccentPathProps {
  className?: string;
  fillColor?: string;
}

function AccentPath({ 
  className = '', 
  fillColor = '#edb6b1' 
}: AccentPathProps) {
  return (
    <>
      <path 
        className={`animate-accent-path ${className}`}
        fill={fillColor}
        d="M497.5 319.5c-4.067 1.554-8.4 2.22-13 2 4.045-1.677 8.378-2.344 13-2z"
        style={{
          opacity: '0',
          transformOrigin: 'center',
          animation: `
            fade-in-dramatic 3s cubic-bezier(0.34, 1.56, 0.64, 1) 11s forwards,
            accent-glow-intense 3s ease-in-out 14s infinite alternate
          `
        }}
      />
      <style>{`
        @keyframes fade-in-dramatic {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(-25deg);
            filter: drop-shadow(0 0 5px rgba(237, 182, 177, 0.3));
          }
          15% {
            opacity: 0.3;
            transform: scale(0.6) rotate(15deg);
            filter: drop-shadow(0 0 15px rgba(237, 182, 177, 0.5));
          }
          35% {
            opacity: 0.6;
            transform: scale(1.6) rotate(-8deg);
            filter: drop-shadow(0 0 25px rgba(237, 182, 177, 0.7));
          }
          60% {
            opacity: 0.8;
            transform: scale(0.7) rotate(3deg);
            filter: drop-shadow(0 0 35px rgba(237, 182, 177, 0.85));
          }
          85% {
            opacity: 0.95;
            transform: scale(1.1) rotate(-1deg);
            filter: drop-shadow(0 0 40px rgba(237, 182, 177, 0.9));
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 35px rgba(237, 182, 177, 0.8));
          }
        }

        @keyframes accent-glow-intense {
          0% {
            filter: drop-shadow(0 0 20px rgba(237, 182, 177, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 50px rgba(237, 182, 177, 1)) drop-shadow(0 0 100px rgba(237, 182, 177, 0.6));
          }
        }
      `}</style>
    </>
  );
}

// Logo Container Component
interface LogoContainerProps {
  className?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

function LogoContainer({ 
  className = '', 
  width = '300px', 
  height = '300px',
  children 
}: LogoContainerProps) {
  return (
    <div className={`relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${className}`}>
      <svg 
        className="animate-logo-enhanced-float"
        style={{ 
          width, 
          height,
          animation: 'logo-enhanced-float 10s ease-in-out infinite'
        }}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
      >
        {children}
      </svg>
      <style>{`
        @keyframes logo-enhanced-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          15% {
            transform: translateY(-12px) rotate(0.8deg) scale(1.02);
          }
          30% {
            transform: translateY(-20px) rotate(0deg) scale(1.03);
          }
          45% {
            transform: translateY(-8px) rotate(-0.6deg) scale(1.01);
          }
          60% {
            transform: translateY(-25px) rotate(0.4deg) scale(1.025);
          }
          75% {
            transform: translateY(-15px) rotate(0deg) scale(1.015);
          }
          90% {
            transform: translateY(-5px) rotate(0.2deg) scale(1.005);
          }
        }
      `}</style>
    </div>
  );
}

// Acknowledgment Section Component
interface AcknowledmentProps {
  className?: string;
  madeInText?: string;
  authorizedText?: string;
}

function Acknowledgment({ 
  className = '',
  madeInText = "Made in Désarmes with",
  authorizedText = "Legalized and authorized by BRH"
}: AcknowledmentProps) {
  return (
    <div className={`absolute bottom-8 left-0 right-0 text-center text-white px-6 ${className}`}>
      <div 
        style={{
          animation: 'fade-in-delayed 2s ease-out forwards'
        }}
      >
        <p className="text-sm opacity-90 mb-2">
          {madeInText} <span className="text-pink-200">❤️</span>
        </p>
        <p className="text-xs opacity-80">
          {authorizedText}
        </p>
      </div>
      <style>{`
        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          70% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Global Animations Component
function GlobalAnimations() {
  return (
    <style>{`
      @keyframes draw-path-smooth {
        0% {
          stroke-dashoffset: 3000;
          stroke-width: 1;
          filter: drop-shadow(0 0 3px rgba(254, 253, 253, 0.2));
        }
        15% {
          stroke-width: 3;
          filter: drop-shadow(0 0 8px rgba(254, 253, 253, 0.4));
        }
        35% {
          stroke-dashoffset: 2000;
          stroke-width: 4;
          filter: drop-shadow(0 0 15px rgba(254, 253, 253, 0.6));
        }
        65% {
          stroke-dashoffset: 800;
          stroke-width: 3;
          filter: drop-shadow(0 0 25px rgba(254, 253, 253, 0.8));
        }
        85% {
          stroke-dashoffset: 200;
          stroke-width: 2;
          filter: drop-shadow(0 0 30px rgba(254, 253, 253, 0.9));
        }
        100% {
          stroke-dashoffset: 0;
          stroke-width: 2;
          filter: drop-shadow(0 0 20px rgba(254, 253, 253, 0.7));
        }
      }

      @keyframes fill-path-smooth {
        0% {
          fill: transparent;
          stroke-width: 2;
          filter: drop-shadow(0 0 20px rgba(254, 253, 253, 0.7));
        }
        30% {
          fill: rgba(254, 253, 253, 0.1);
          stroke-width: 1.5;
          filter: drop-shadow(0 0 25px rgba(254, 253, 253, 0.8));
        }
        70% {
          fill: rgba(254, 253, 253, 0.6);
          stroke-width: 1;
          filter: drop-shadow(0 0 35px rgba(254, 253, 253, 0.9));
        }
        100% {
          fill: #fefdfd;
          stroke-width: 0;
          filter: drop-shadow(0 0 30px rgba(254, 253, 253, 0.8));
        }
      }

      @keyframes glow-enhanced {
        0% {
          filter: drop-shadow(0 0 20px rgba(254, 253, 253, 0.5)) drop-shadow(0 0 40px rgba(254, 253, 253, 0.2));
        }
        50% {
          filter: drop-shadow(0 0 35px rgba(254, 253, 253, 0.8)) drop-shadow(0 0 70px rgba(254, 253, 253, 0.4));
        }
        100% {
          filter: drop-shadow(0 0 50px rgba(254, 253, 253, 1)) drop-shadow(0 0 100px rgba(254, 253, 253, 0.5));
        }
      }

      @keyframes stroke-shimmer {
        0% {
          stroke: #fefdfd;
          stroke-opacity: 1;
        }
        25% {
          stroke: rgba(254, 253, 253, 0.9);
          stroke-opacity: 0.9;
        }
        50% {
          stroke: #ffffff;
          stroke-opacity: 0.8;
        }
        75% {
          stroke: rgba(254, 253, 253, 0.85);
          stroke-opacity: 0.95;
        }
        100% {
          stroke: #fefdfd;
          stroke-opacity: 1;
        }
      }

      @keyframes fade-in-pulse-smooth {
        0% {
          opacity: 0;
          transform: scale(0.3) rotate(-15deg);
          filter: drop-shadow(0 0 3px rgba(237, 182, 177, 0.2));
        }
        20% {
          opacity: 0.4;
          transform: scale(0.8) rotate(8deg);
          filter: drop-shadow(0 0 10px rgba(237, 182, 177, 0.4));
        }
        40% {
          opacity: 0.7;
          transform: scale(1.4) rotate(-3deg);
          filter: drop-shadow(0 0 20px rgba(237, 182, 177, 0.6));
        }
        70% {
          opacity: 0.9;
          transform: scale(0.8) rotate(1deg);
          filter: drop-shadow(0 0 30px rgba(237, 182, 177, 0.8));
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
          filter: drop-shadow(0 0 25px rgba(237, 182, 177, 0.7));
        }
      }

      @keyframes accent-glow-enhanced {
        0% {
          filter: drop-shadow(0 0 15px rgba(237, 182, 177, 0.6));
        }
        100% {
          filter: drop-shadow(0 0 40px rgba(237, 182, 177, 1)) drop-shadow(0 0 80px rgba(237, 182, 177, 0.5));
        }
      }

      @keyframes fade-in-delayed {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        70% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes logo-float-enhanced {
        0%, 100% {
          transform: translateY(0px) rotate(0deg) scale(1);
        }
        20% {
          transform: translateY(-8px) rotate(0.5deg) scale(1.01);
        }
        40% {
          transform: translateY(-12px) rotate(0deg) scale(1.02);
        }
        60% {
          transform: translateY(-6px) rotate(-0.5deg) scale(1.01);
        }
        80% {
          transform: translateY(-18px) rotate(0.3deg) scale(1.015);
        }
      }
    `}</style>
  );
}

// Main Splash Screen Component
interface SplashScreenProps {
  isVisible: boolean;
  backgroundColor?: string;
  logoWidth?: string;
  logoHeight?: string;
  customAcknowledment?: {
    madeInText?: string;
    authorizedText?: string;
  };
}

export default function AnimatedSplashScreen({ 
  isVisible,
  backgroundColor = 'bg-white',
  logoWidth = '300px',
  logoHeight = '300px',
  customAcknowledment
}: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <>
      <GlobalAnimations />
      <div className={`fixed inset-0 min-h-screen ${backgroundColor} flex flex-col items-center justify-center overflow-hidden z-50`}>
        <div className="relative flex flex-col items-center justify-center flex-grow">
          <PulseBackground />
          
          <LogoContainer width={logoWidth} height={logoHeight}>
            <MainLogoPath />
            <AccentPath />
          </LogoContainer>
        </div>

        <Acknowledgment 
          madeInText={customAcknowledment?.madeInText}
          authorizedText={customAcknowledment?.authorizedText}
        />
      </div>
    </>
  );
}
