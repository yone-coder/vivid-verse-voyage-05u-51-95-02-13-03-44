import React from 'react';

// Background Pulse Component with Physics
interface PulseBackgroundProps {
  className?: string;
}

function PulseBackground({ className = '' }: PulseBackgroundProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30 ${className}`}>
      <div 
        className="w-full h-full rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"
        style={{
          animation: 'physics-pulse 3s cubic-bezier(0.23, 1, 0.32, 1) infinite'
        }}
      ></div>
      <style>{`
        @keyframes physics-pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
            filter: blur(0px);
          }
          25% {
            transform: scale(1.15);
            opacity: 0.5;
            filter: blur(2px);
          }
          50% {
            transform: scale(0.85);
            opacity: 0.7;
            filter: blur(1px);
          }
          75% {
            transform: scale(1.05);
            opacity: 0.4;
            filter: blur(3px);
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}

// Top Title Component with Physics
interface TopTitleProps {
  className?: string;
  isExiting?: boolean;
}

function TopTitle({ className = '', isExiting = false }: TopTitleProps) {
  return (
    <div 
      className={`absolute top-12 left-0 right-0 text-center text-white px-4 z-10 ${className}`}
      style={{
        opacity: 1,
        animation: isExiting 
          ? 'title-exit 1.5s ease-in-out forwards'
          : 'title-entry 1.5s ease-out 0.5s forwards'
      }}
    >
      <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-white drop-shadow-2xl uppercase">
        #1 app de transfert à Désarmes
      </h1>
      <style>{`
        @keyframes title-entry {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.7);
            filter: blur(5px);
          }
          30% {
            opacity: 0.4;
            transform: translateY(-25px) scale(0.85);
            filter: blur(3px);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-10px) scale(0.95);
            filter: blur(1px);
          }
          80% {
            opacity: 0.95;
            transform: translateY(-2px) scale(0.98);
            filter: blur(0.3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes title-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-30px) scale(1.2);
            filter: blur(5px);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.8);
            filter: blur(15px);
          }
        }
      `}</style>
    </div>
  );
}

// Main Logo Path Component - NO ANIMATIONS
interface MainLogoPathProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  isExiting?: boolean;
}

function MainLogoPath({ 
  className = '', 
  strokeColor = '#ffffff',
  fillColor = '#ffffff',
  isExiting = false
}: MainLogoPathProps) {
  return (
    <path 
      className={className}
      d="M497.5 319.5c64.443-2.7 118.276 19.634 161.5 67 21.949 26.235 36.115 56.235 42.5 90-15.362 1.337-30.695 3.003-46 5-1.333-.333-2.667-.667-4-1-23.809-77.246-76.143-114.08-157-110.5-54.081 8.12-91.914 37.287-113.5 87.5-19.457 52.58-12.457 101.246 21 146 35.061 40.14 79.228 56.64 132.5 49.5 52.235-10.087 89.235-39.254 111-87.5-1.667-.333-3.333-.667-5-1-68.917 8.274-137.917 9.107-207 2.5-7.335-13.165-11.335-27.331-12-42.5 82.616 7.15 164.95 4.816 247-7 23.199-3.345 45.865-8.845 68-16.5 21.813-7.817 22.48-16.817 2-27-7.929-3.184-16.096-5.351-24.5-6.5-1.636-13.236-5.469-25.736-11.5-37.5 24.969 2.656 48.303 10.323 70 23 9.266 5.932 16.432 13.765 21.5 23.5 5.144 16.571 1.311 30.738-11.5 42.5-12.653 10.831-26.986 18.831-43 24-12.847 3.869-25.847 7.035-39 9.5-11.744 54.007-41.078 95.507-88 124.5-57.7 32.2-117.367 36.2-179 12-58.983-27.982-96.316-73.648-112-137-25.568-3.106-49.235-11.439-71-25-34.304-29.96-31.637-56.293 8-79 19.267-9.7 39.601-15.867 61-18.5-2.479 6.968-4.979 13.968-7.5 21-1.89 5.515-2.724 11.181-2.5 17-14.251 1.13-26.917 6.13-38 15-4.143 4.785-3.477 8.951 2 12.5 13.68 7.727 28.347 12.56 44 14.5 5.334-79.466 43.334-137.299 114-173 16.909-7.58 34.575-12.414 53-14.5 4.6.22 8.933-.446 13-2z"
      stroke={strokeColor}
      fill={fillColor}
      style={{
        strokeWidth: '0',
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? 'opacity 1.5s ease-out' : 'opacity 1s ease-in 2s'
      }}
    />
  );
}

// Accent Path Component - NO ANIMATIONS
interface AccentPathProps {
  className?: string;
  fillColor?: string;
  isExiting?: boolean;
}

function AccentPath({ 
  className = '', 
  fillColor = '#ffffff',
  isExiting = false
}: AccentPathProps) {
  return (
    <path 
      className={className}
      fill={fillColor}
      d="M497.5 319.5c-4.067 1.554-8.4 2.22-13 2 4.045-1.677 8.378-2.344 13-2z"
      style={{
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? 'opacity 1.5s ease-out' : 'opacity 1s ease-in 3s'
      }}
    />
  );
}

// Logo Container Component - NO ANIMATIONS
interface LogoContainerProps {
  className?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  isExiting?: boolean;
}

function LogoContainer({ 
  className = '', 
  width = '300px', 
  height = '300px',
  children,
  isExiting = false
}: LogoContainerProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        transform: isExiting ? 'scale(0.8)' : 'scale(1)',
        opacity: isExiting ? 0 : 1,
        transition: 'all 1.5s ease-out'
      }}
    >
      <svg 
        style={{ 
          width, 
          height
        }}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
      >
        {children}
      </svg>
    </div>
  );
}

// Acknowledgment Section Component
interface AcknowledgmentProps {
  className?: string;
  madeInText?: string;
  authorizedText?: string;
  isExiting?: boolean;
}

function Acknowledgment({ 
  className = '',
  madeInText = "Made in Désarmes with",
  authorizedText = "Legalized and authorized by BRH",
  isExiting = false
}: AcknowledgmentProps) {
  return (
    <div 
      className={`absolute bottom-8 left-0 right-0 text-center text-white px-6 ${className}`}
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(30px)' : 'translateY(0px)',
        transition: 'all 1.5s ease-out'
      }}
    >
      <div>
        <p className="text-sm opacity-90 mb-2">
          {madeInText} <span className="text-pink-200">❤️</span>
        </p>
        <p className="text-xs opacity-80">
          {authorizedText}
        </p>
      </div>
    </div>
  );
}

// Quantum Background Component
function QuantumBackground({ isExiting }: { isExiting: boolean }) {
  return (
    <div 
      className="absolute inset-0"
      style={{
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 1.5s ease-out'
      }}
    >
      {/* Multiple quantum physics layers */}
      <div className="absolute inset-0 bg-gradient-radial from-red-400/20 via-red-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-conic from-red-500/5 via-transparent to-red-600/5"></div>
      
      {/* Quantum particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isExiting ? 0 : 0.3,
              transition: `opacity 1.5s ease-out ${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Main Splash Screen Component
interface SplashScreenProps {
  isVisible: boolean;
  isExiting?: boolean;
  backgroundColor?: string;
  logoWidth?: string;
  logoHeight?: string;
  customAcknowledment?: {
    madeInText?: string;
    authorizedText?: string;
  };
}

export default function UltraSleekSplashScreen({ 
  isVisible,
  isExiting = false,
  backgroundColor = 'bg-red-500',
  logoWidth = '350px',
  logoHeight = '350px',
  customAcknowledment
}: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 min-h-screen ${backgroundColor} flex flex-col items-center justify-center overflow-hidden z-50`}
      style={{
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 1.5s ease-out'
      }}
    >
      <QuantumBackground isExiting={isExiting} />
      
      <TopTitle isExiting={isExiting} />
      
      <div className="relative flex flex-col items-center justify-center flex-grow">
        <PulseBackground />
        
        <LogoContainer 
          width={logoWidth} 
          height={logoHeight} 
          isExiting={isExiting}
        >
          <MainLogoPath isExiting={isExiting} />
          <AccentPath isExiting={isExiting} />
        </LogoContainer>
      </div>

      <Acknowledgment 
        madeInText={customAcknowledment?.madeInText}
        authorizedText={customAcknowledment?.authorizedText}
        isExiting={isExiting}
      />
    </div>
  );
}