
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
      ></div>
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
          ? 'title-reverse-physics-exit 2.8s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s forwards'
          : 'title-physics-entry 1.5s ease-out 0.5s forwards'
      }}
    >
      <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-white drop-shadow-2xl uppercase">
        #1 app de transfert à Désarmes
      </h1>
      <style>{`
        @keyframes title-physics-entry {
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

        @keyframes title-reverse-physics-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px) brightness(1);
          }
          15% {
            opacity: 0.95;
            transform: translateY(-2px) scale(0.98) rotate(1deg);
            filter: blur(0.3px) brightness(1.1);
          }
          30% {
            opacity: 0.8;
            transform: translateY(-10px) scale(0.95) rotate(3deg);
            filter: blur(1px) brightness(1.3);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-25px) scale(0.85) rotate(8deg);
            filter: blur(3px) brightness(1.6);
          }
          75% {
            opacity: 0.1;
            transform: translateY(-40px) scale(0.7) rotate(15deg);
            filter: blur(5px) brightness(2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5) rotate(25deg);
            filter: blur(8px) brightness(3);
          }
        }
      `}</style>
    </div>
  );
}

// Main Logo Path Component with Enhanced Reverse Physics
interface MainLogoPathProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  isExiting?: boolean;
}

function MainLogoPath({ 
  className = '', 
  strokeColor = '#ffffff',
  fillColor = 'transparent',
  isExiting = false
}: MainLogoPathProps) {
  return (
    <>
      <path 
        className={`animate-main-path ${className}`}
        d="M497.5 319.5c64.443-2.7 118.276 19.634 161.5 67 21.949 26.235 36.115 56.235 42.5 90-15.362 1.337-30.695 3.003-46 5-1.333-.333-2.667-.667-4-1-23.809-77.246-76.143-114.08-157-110.5-54.081 8.12-91.914 37.287-113.5 87.5-19.457 52.58-12.457 101.246 21 146 35.061 40.14 79.228 56.64 132.5 49.5 52.235-10.087 89.235-39.254 111-87.5-1.667-.333-3.333-.667-5-1-68.917 8.274-137.917 9.107-207 2.5-7.335-13.165-11.335-27.331-12-42.5 82.616 7.15 164.95 4.816 247-7 23.199-3.345 45.865-8.845 68-16.5 21.813-7.817 22.48-16.817 2-27-7.929-3.184-16.096-5.351-24.5-6.5-1.636-13.236-5.469-25.736-11.5-37.5 24.969 2.656 48.303 10.323 70 23 9.266 5.932 16.432 13.765 21.5 23.5 5.144 16.571 1.311 30.738-11.5 42.5-12.653 10.831-26.986 18.831-43 24-12.847 3.869-25.847 7.035-39 9.5-11.744 54.007-41.078 95.507-88 124.5-57.7 32.2-117.367 36.2-179 12-58.983-27.982-96.316-73.648-112-137-25.568-3.106-49.235-11.439-71-25-34.304-29.96-31.637-56.293 8-79 19.267-9.7 39.601-15.867 61-18.5-2.479 6.968-4.979 13.968-7.5 21-1.89 5.515-2.724 11.181-2.5 17-14.251 1.13-26.917 6.13-38 15-4.143 4.785-3.477 8.951 2 12.5 13.68 7.727 28.347 12.56 44 14.5 5.334-79.466 43.334-137.299 114-173 16.909-7.58 34.575-12.414 53-14.5 4.6.22 8.933-.446 13-2z"
        stroke={strokeColor}
        fill={isExiting ? '#ffffff' : fillColor}
        style={{
          strokeDasharray: '4000',
          strokeDashoffset: isExiting ? '4000' : '4000',
          strokeWidth: '2',
          transformOrigin: 'center center',
          animation: isExiting 
            ? 'main-logo-enhanced-reverse-exit 3.5s cubic-bezier(0.77, 0, 0.175, 1) forwards'
            : `
              draw-path-physics 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
              fill-path-physics 1.2s ease-out 2.5s forwards,
              physics-vibration 0.8s ease-in-out 3.7s infinite
            `
        }}
      />
      <style>{`
        @keyframes draw-path-physics {
          0% {
            stroke-dashoffset: 4000;
            stroke-width: 1;
            transform: translateY(-20px) rotate(-5deg);
            filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.1));
          }
          15% {
            stroke-width: 6;
            transform: translateY(-15px) rotate(-3deg);
            filter: drop-shadow(0 15px 30px rgba(255, 255, 255, 0.3));
          }
          30% {
            stroke-dashoffset: 3000;
            stroke-width: 8;
            transform: translateY(-10px) rotate(-1deg);
            filter: drop-shadow(0 20px 40px rgba(255, 255, 255, 0.5));
          }
          50% {
            stroke-dashoffset: 1500;
            stroke-width: 6;
            transform: translateY(-5px) rotate(1deg);
            filter: drop-shadow(0 25px 50px rgba(255, 255, 255, 0.7));
          }
          75% {
            stroke-dashoffset: 500;
            stroke-width: 4;
            transform: translateY(0px) rotate(0.5deg);
            filter: drop-shadow(0 30px 60px rgba(255, 255, 255, 0.8));
          }
          90% {
            stroke-dashoffset: 100;
            stroke-width: 3;
            transform: translateY(2px) rotate(-0.2deg);
            filter: drop-shadow(0 35px 70px rgba(255, 255, 255, 0.9));
          }
          100% {
            stroke-dashoffset: 0;
            stroke-width: 2;
            transform: translateY(0px) rotate(0deg);
            filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          }
        }

        @keyframes fill-path-physics {
          0% {
            fill: transparent;
            stroke-width: 2;
            transform: scale(1);
            filter: brightness(1);
          }
          25% {
            fill: rgba(255, 255, 255, 0.1);
            stroke-width: 1.5;
            transform: scale(1.02);
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
          }
          50% {
            fill: rgba(255, 255, 255, 0.4);
            stroke-width: 1;
            transform: scale(1.05);
            filter: brightness(1.5) drop-shadow(0 0 40px rgba(255, 255, 255, 0.8));
          }
          75% {
            fill: rgba(255, 255, 255, 0.8);
            stroke-width: 0.5;
            transform: scale(1.02);
            filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
          }
          100% {
            fill: #ffffff;
            stroke-width: 0;
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes physics-vibration {
          0%, 100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(0.5px) translateY(-0.3px) rotate(0.2deg);
          }
          50% {
            transform: translateX(-0.3px) translateY(0.5px) rotate(-0.15deg);
          }
          75% {
            transform: translateX(0.2px) translateY(-0.2px) rotate(0.1deg);
          }
        }

        @keyframes main-logo-enhanced-reverse-exit {
          0% {
            fill: #ffffff;
            stroke: #ffffff;
            stroke-width: 0;
            stroke-dashoffset: 0;
            transform: scale(1) rotate(0deg) translateY(0px);
            filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0)) blur(0px);
            opacity: 1;
          }
          8% {
            fill: rgba(255, 255, 255, 0.95);
            stroke: #ffffff;
            stroke-width: 0.5;
            stroke-dashoffset: 150;
            transform: scale(1.01) rotate(-2deg) translateY(-2px);
            filter: brightness(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) blur(0.2px);
            opacity: 0.98;
          }
          18% {
            fill: rgba(255, 255, 255, 0.85);
            stroke: #ffffff;
            stroke-width: 1;
            stroke-dashoffset: 400;
            transform: scale(1.03) rotate(-5deg) translateY(-8px);
            filter: brightness(1.3) drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) blur(0.5px);
            opacity: 0.95;
          }
          28% {
            fill: rgba(255, 255, 255, 0.7);
            stroke: #ffffff;
            stroke-width: 1.5;
            stroke-dashoffset: 800;
            transform: scale(1.06) rotate(-10deg) translateY(-18px);
            filter: brightness(1.5) drop-shadow(0 0 35px rgba(255, 255, 255, 0.8)) blur(1px);
            opacity: 0.9;
          }
          40% {
            fill: rgba(255, 255, 255, 0.5);
            stroke: #ffffff;
            stroke-width: 2;
            stroke-dashoffset: 1400;
            transform: scale(1.1) rotate(-18deg) translateY(-35px);
            filter: brightness(1.8) drop-shadow(0 0 50px rgba(255, 255, 255, 0.9)) blur(2px);
            opacity: 0.8;
          }
          52% {
            fill: rgba(255, 255, 255, 0.3);
            stroke: #ffffff;
            stroke-width: 3;
            stroke-dashoffset: 2200;
            transform: scale(1.15) rotate(-28deg) translateY(-55px);
            filter: brightness(2.2) drop-shadow(0 0 70px rgba(255, 255, 255, 1)) blur(4px);
            opacity: 0.65;
          }
          65% {
            fill: rgba(255, 255, 255, 0.15);
            stroke: #ffffff;
            stroke-width: 4;
            stroke-dashoffset: 3000;
            transform: scale(1.2) rotate(-40deg) translateY(-80px);
            filter: brightness(2.8) drop-shadow(0 0 90px rgba(255, 255, 255, 1)) blur(7px);
            opacity: 0.45;
          }
          78% {
            fill: rgba(255, 255, 255, 0.08);
            stroke: #ffffff;
            stroke-width: 6;
            stroke-dashoffset: 3600;
            transform: scale(1.3) rotate(-55deg) translateY(-110px);
            filter: brightness(3.5) drop-shadow(0 0 120px rgba(255, 255, 255, 1)) blur(12px);
            opacity: 0.25;
          }
          90% {
            fill: rgba(255, 255, 255, 0.02);
            stroke: #ffffff;
            stroke-width: 8;
            stroke-dashoffset: 3900;
            transform: scale(1.5) rotate(-75deg) translateY(-150px);
            filter: brightness(4.5) drop-shadow(0 0 160px rgba(255, 255, 255, 1)) blur(20px);
            opacity: 0.08;
          }
          100% {
            fill: transparent;
            stroke: #ffffff;
            stroke-width: 1;
            stroke-dashoffset: 4000;
            transform: scale(2) rotate(-90deg) translateY(-200px);
            filter: brightness(6) drop-shadow(0 0 200px rgba(255, 255, 255, 1)) blur(30px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

// Accent Path Component with Enhanced Reverse Physics
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
    <>
      <path 
        className={`animate-accent-path ${className}`}
        fill={fillColor}
        d="M497.5 319.5c-4.067 1.554-8.4 2.22-13 2 4.045-1.677 8.378-2.344 13-2z"
        style={{
          opacity: isExiting ? '1' : '0',
          transformOrigin: 'center',
          animation: isExiting 
            ? 'accent-enhanced-reverse-exit 3.2s cubic-bezier(0.86, 0, 0.07, 1) 0.1s forwards'
            : `
              momentum-entry 3.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 3s forwards,
              elastic-oscillation 1.5s ease-in-out 6.5s infinite,
              magnetic-pull 2.5s cubic-bezier(0.23, 1, 0.32, 1) 8s infinite
            `
        }}
      />
      <style>{`
        @keyframes momentum-entry {
          0% {
            opacity: 0;
            transform: scale(0.1) rotate(-45deg) translateX(-50px) translateY(-30px);
            filter: blur(5px) hue-rotate(180deg);
          }
          15% {
            opacity: 0.1;
            transform: scale(0.3) rotate(-30deg) translateX(-35px) translateY(-20px);
            filter: blur(4px) hue-rotate(120deg);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.6) rotate(-15deg) translateX(-20px) translateY(-10px);
            filter: blur(3px) hue-rotate(60deg);
          }
          45% {
            opacity: 0.5;
            transform: scale(0.9) rotate(-5deg) translateX(-8px) translateY(-3px);
            filter: blur(2px) hue-rotate(30deg);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.1) rotate(2deg) translateX(3px) translateY(2px);
            filter: blur(1px) hue-rotate(10deg);
          }
          75% {
            opacity: 0.85;
            transform: scale(1.05) rotate(1deg) translateX(1px) translateY(1px);
            filter: blur(0.5px) hue-rotate(5deg);
          }
          90% {
            opacity: 0.95;
            transform: scale(1.02) rotate(0.5deg) translateX(0.5px) translateY(0.2px);
            filter: blur(0.2px) hue-rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateX(0px) translateY(0px);
            filter: blur(0px) hue-rotate(0deg);
          }
        }

        @keyframes elastic-oscillation {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
          }
          25% {
            transform: scale(1.05) rotate(1deg);
            filter: brightness(1.1);
          }
          50% {
            transform: scale(0.98) rotate(-0.5deg);
            filter: brightness(0.95);
          }
          75% {
            transform: scale(1.02) rotate(0.3deg);
            filter: brightness(1.05);
          }
        }

        @keyframes magnetic-pull {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
            filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          }
          25% {
            transform: translateX(-1px) translateY(-0.5px);
            filter: drop-shadow(2px 1px 5px rgba(255, 255, 255, 0.3));
          }
          50% {
            transform: translateX(1px) translateY(0.5px);
            filter: drop-shadow(-2px -1px 8px rgba(255, 255, 255, 0.5));
          }
          75% {
            transform: translateX(-0.5px) translateY(-0.2px);
            filter: drop-shadow(1px 0.5px 3px rgba(255, 255, 255, 0.2));
          }
        }

        @keyframes accent-enhanced-reverse-exit {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateX(0px) translateY(0px);
            filter: blur(0px) hue-rotate(0deg) brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          }
          6% {
            opacity: 0.98;
            transform: scale(1.02) rotate(0.5deg) translateX(0.5px) translateY(0.2px);
            filter: blur(0.2px) hue-rotate(2deg) brightness(1.1) drop-shadow(1px 0.5px 3px rgba(255, 255, 255, 0.2));
          }
          12% {
            opacity: 0.95;
            transform: scale(1.05) rotate(1deg) translateX(1px) translateY(1px);
            filter: blur(0.5px) hue-rotate(5deg) brightness(1.3) drop-shadow(2px 1px 5px rgba(255, 255, 255, 0.3));
          }
          20% {
            opacity: 0.85;
            transform: scale(1.1) rotate(2deg) translateX(3px) translateY(2px);
            filter: blur(1px) hue-rotate(10deg) brightness(1.6) drop-shadow(-2px -1px 8px rgba(255, 255, 255, 0.5));
          }
          30% {
            opacity: 0.7;
            transform: scale(0.9) rotate(-5deg) translateX(-8px) translateY(-3px);
            filter: blur(2px) hue-rotate(30deg) brightness(2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.7));
          }
          42% {
            opacity: 0.5;
            transform: scale(0.6) rotate(-15deg) translateX(-20px) translateY(-10px);
            filter: blur(3px) hue-rotate(60deg) brightness(2.5) drop-shadow(0 0 25px rgba(255, 255, 255, 0.8));
          }
          56% {
            opacity: 0.3;
            transform: scale(0.3) rotate(-30deg) translateX(-35px) translateY(-20px);
            filter: blur(4px) hue-rotate(120deg) brightness(3.2) drop-shadow(0 0 40px rgba(255, 255, 255, 0.9));
          }
          72% {
            opacity: 0.1;
            transform: scale(0.1) rotate(-45deg) translateX(-50px) translateY(-30px);
            filter: blur(5px) hue-rotate(180deg) brightness(4) drop-shadow(0 0 60px rgba(255, 255, 255, 1));
          }
          88% {
            opacity: 0.02;
            transform: scale(0.05) rotate(-65deg) translateX(-70px) translateY(-45px);
            filter: blur(8px) hue-rotate(240deg) brightness(5) drop-shadow(0 0 90px rgba(255, 255, 255, 1));
          }
          100% {
            opacity: 0;
            transform: scale(0.01) rotate(-90deg) translateX(-100px) translateY(-60px);
            filter: blur(12px) hue-rotate(360deg) brightness(6) drop-shadow(0 0 120px rgba(255, 255, 255, 1));
          }
        }
      `}</style>
    </>
  );
}

// Logo Container Component with Enhanced Physics
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
        animation: isExiting 
          ? 'container-enhanced-reverse-exit 3.8s cubic-bezier(0.895, 0.03, 0.685, 0.22) 0.8s forwards'
          : undefined
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
      <style>{`
        @keyframes container-enhanced-reverse-exit {
          0% {
            transform: scale(1) rotate(0deg) translateY(0px);
            opacity: 1;
            filter: blur(0px) brightness(1) contrast(1);
          }
          10% {
            transform: scale(0.98) rotate(-2deg) translateY(-5px);
            opacity: 0.95;
            filter: blur(0.5px) brightness(1.1) contrast(1.1);
          }
          22% {
            transform: scale(0.94) rotate(-6deg) translateY(-15px);
            opacity: 0.85;
            filter: blur(1.5px) brightness(1.3) contrast(1.2);
          }
          35% {
            transform: scale(0.88) rotate(-12deg) translateY(-30px);
            opacity: 0.7;
            filter: blur(3px) brightness(1.6) contrast(1.4);
          }
          50% {
            transform: scale(0.8) rotate(-20deg) translateY(-50px);
            opacity: 0.5;
            filter: blur(6px) brightness(2) contrast(1.6);
          }
          65% {
            transform: scale(0.7) rotate(-32deg) translateY(-75px);
            opacity: 0.3;
            filter: blur(10px) brightness(2.5) contrast(1.8);
          }
          78% {
            transform: scale(0.55) rotate(-48deg) translateY(-105px);
            opacity: 0.15;
            filter: blur(15px) brightness(3.2) contrast(2);
          }
          88% {
            transform: scale(0.35) rotate(-68deg) translateY(-140px);
            opacity: 0.05;
            filter: blur(22px) brightness(4) contrast(2.5);
          }
          100% {
            transform: scale(0.1) rotate(-90deg) translateY(-200px);
            opacity: 0;
            filter: blur(35px) brightness(5) contrast(3);
          }
        }
      `}</style>
    </div>
  );
}

// Acknowledgment Section Component with Enhanced Reverse Physics
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
        animation: isExiting 
          ? 'text-enhanced-reverse-exit 2.8s cubic-bezier(0.755, 0.05, 0.855, 0.06) 0.6s forwards'
          : 'text-physics-entry 1s ease-out 7s forwards'
      }}
    >
      <div style={{ opacity: isExiting ? 1 : 0 }}>
        <p className="text-sm opacity-90 mb-2">
          {madeInText} <span className="text-pink-200">❤️</span>
        </p>
        <p className="text-xs opacity-80">
          {authorizedText}
        </p>
      </div>
      <style>{`
        @keyframes text-physics-entry {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
            filter: blur(3px);
          }
          30% {
            opacity: 0.3;
            transform: translateY(20px) scale(0.9);
            filter: blur(2px);
          }
          60% {
            opacity: 0.7;
            transform: translateY(10px) scale(0.95);
            filter: blur(1px);
          }
          80% {
            opacity: 0.9;
            transform: translateY(5px) scale(0.98);
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes text-enhanced-reverse-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1) rotate(0deg);
            filter: blur(0px) brightness(1);
          }
          15% {
            opacity: 0.9;
            transform: translateY(5px) scale(0.98) rotate(1deg);
            filter: blur(0.5px) brightness(1.2);
          }
          30% {
            opacity: 0.7;
            transform: translateY(15px) scale(0.95) rotate(3deg);
            filter: blur(1px) brightness(1.5);
          }
          50% {
            opacity: 0.4;
            transform: translateY(30px) scale(0.9) rotate(8deg);
            filter: blur(2px) brightness(2);
          }
          70% {
            opacity: 0.2;
            transform: translateY(50px) scale(0.8) rotate(15deg);
            filter: blur(4px) brightness(2.8);
          }
          85% {
            opacity: 0.05;
            transform: translateY(70px) scale(0.6) rotate(25deg);
            filter: blur(7px) brightness(3.5);
          }
          100% {
            opacity: 0;
            transform: translateY(100px) scale(0.3) rotate(40deg);
            filter: blur(12px) brightness(5);
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced Progressive White Overlay with Multiple Wave Effects
interface ProgressiveWhiteOverlayProps {
  isExiting: boolean;
}

function ProgressiveWhiteOverlay({ isExiting }: ProgressiveWhiteOverlayProps) {
  if (!isExiting) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] pointer-events-none"
      style={{
        animation: 'progressive-white-overlay 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s forwards'
      }}
    >
      {/* Multiple expanding white circles with staggered timing */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${80 + i * 120}px`,
              height: `${80 + i * 120}px`,
              transform: 'scale(0)',
              opacity: 0.1 + (i * 0.02),
              animation: `enhanced-white-circle-expand-${i + 1} ${2.2 + i * 0.25}s cubic-bezier(0.23, 1, 0.32, 1) ${1.2 + i * 0.08}s forwards`
            }}
          />
        ))}
      </div>
      
      {/* Gradient transition waves */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${0.05 + i * 0.08}) 0%, transparent 70%)`,
              opacity: 0,
              animation: `wave-expand-${i + 1} ${1.8 + i * 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${1.5 + i * 0.2}s forwards`
            }}
          />
        ))}
      </div>
      
      {/* Final complete white overlay with smooth transition */}
      <div 
        className="absolute inset-0 bg-white"
        style={{
          opacity: 0,
          animation: 'final-enhanced-white-complete 1.8s cubic-bezier(0.23, 1, 0.32, 1) 2.5s forwards'
        }}
      ></div>
      
      <style>{`
        @keyframes progressive-white-overlay {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        ${[...Array(12)].map((_, i) => `
          @keyframes enhanced-white-circle-expand-${i + 1} {
            0% {
              transform: scale(0);
              opacity: 0;
              filter: blur(2px);
            }
            40% {
              transform: scale(0.4);
              opacity: ${0.3 + i * 0.02};
              filter: blur(1px);
            }
            70% {
              transform: scale(0.8);
              opacity: ${0.5 + i * 0.02};
              filter: blur(0.5px);
            }
            100% {
              transform: scale(1);
              opacity: ${0.6 + i * 0.02};
              filter: blur(0px);
            }
          }
        `).join('')}

        ${[...Array(6)].map((_, i) => `
          @keyframes wave-expand-${i + 1} {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              opacity: ${0.4 + i * 0.1};
              transform: scale(1.2);
            }
            100% {
              opacity: ${0.8 + i * 0.05};
              transform: scale(2);
            }
          }
        `).join('')}

        @keyframes final-enhanced-white-complete {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(3px);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.95);
            filter: blur(1.5px);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.02);
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced Quantum Background with Advanced Physics
function QuantumBackground({ isExiting }: { isExiting: boolean }) {
  return (
    <div 
      className="absolute inset-0"
      style={{
        animation: isExiting 
          ? 'background-enhanced-reverse-exit 4.2s cubic-bezier(0.77, 0, 0.175, 1) 0.3s forwards'
          : 'background-physics-pulse 4s ease-in-out infinite'
      }}
    >
      {/* Enhanced gradient layers */}
      <div className="absolute inset-0 bg-gradient-radial from-red-400/20 via-red-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-conic from-red-500/5 via-transparent to-red-600/5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-300/15 via-transparent to-red-700/15"></div>
      
      {/* Enhanced quantum particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animation: isExiting 
                ? `particle-enhanced-reverse-exit ${2.2 + Math.random() * 1.2}s cubic-bezier(0.77, 0, 0.175, 1) ${0.8 + Math.random() * 0.6}s forwards`
                : `particle-float ${3 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes background-physics-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
            filter: hue-rotate(10deg) brightness(1.1);
          }
        }

        @keyframes background-enhanced-reverse-exit {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px) brightness(1) hue-rotate(0deg) contrast(1);
          }
          12% {
            opacity: 0.95;
            transform: scale(1.02);
            filter: blur(0.5px) brightness(1.1) hue-rotate(5deg) contrast(1.1);
          }
          25% {
            opacity: 0.85;
            transform: scale(1.05);
            filter: blur(1px) brightness(1.3) hue-rotate(15deg) contrast(1.2);
          }
          40% {
            opacity: 0.7;
            transform: scale(1.03);
            filter: blur(2px) brightness(1.6) hue-rotate(30deg) contrast(1.4);
          }
          55% {
            opacity: 0.5;
            transform: scale(1.01);
            filter: blur(4px) brightness(2) hue-rotate(50deg) contrast(1.6);
          }
          70% {
            opacity: 0.3;
            transform: scale(0.98);
            filter: blur(8px) brightness(2.5) hue-rotate(80deg) contrast(1.8);
          }
          82% {
            opacity: 0.15;
            transform: scale(0.95);
            filter: blur(15px) brightness(3.2) hue-rotate(120deg) contrast(2);
          }
          92% {
            opacity: 0.05;
            transform: scale(0.9);
            filter: blur(25px) brightness(4) hue-rotate(160deg) contrast(2.5);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(40px) brightness(5) hue-rotate(200deg) contrast(3);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-5px) scale(0.8);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-25px) translateX(-15px) scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes particle-enhanced-reverse-exit {
          0% {
            transform: scale(1) rotate(0deg) translateY(0px);
            opacity: 0.3;
            filter: brightness(1) blur(0px);
          }
          15% {
            transform: scale(1.2) rotate(30deg) translateY(-10px);
            opacity: 0.6;
            filter: brightness(1.5) blur(0.5px);
          }
          30% {
            transform: scale(1.8) rotate(90deg) translateY(-25px);
            opacity: 0.8;
            filter: brightness(2.2) blur(1px);
          }
          50% {
            transform: scale(2.2) rotate(180deg) translateY(-45px);
            opacity: 0.6;
            filter: brightness(3) blur(2px);
          }
          70% {
            transform: scale(1.8) rotate(270deg) translateY(-70px);
            opacity: 0.3;
            filter: brightness(4) blur(4px);
          }
          85% {
            transform: scale(1.2) rotate(330deg) translateY(-100px);
            opacity: 0.1;
            filter: brightness(5) blur(8px);
          }
          100% {
            transform: scale(0) rotate(360deg) translateY(-150px);
            opacity: 0;
            filter: brightness(6) blur(15px);
          }
        }
      `}</style>
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
        animation: isExiting 
          ? 'sophisticated-enhanced-red-to-white-transform 4.8s cubic-bezier(0.23, 1, 0.32, 1) forwards'
          : undefined
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

      <ProgressiveWhiteOverlay isExiting={isExiting} />
      
      <style>{`
        @keyframes sophisticated-enhanced-red-to-white-transform {
          0% {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
          }
          15% {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 50%, #c53030 100%);
          }
          25% {
            background: linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%);
          }
          35% {
            background: linear-gradient(135deg, #fca5a5 0%, #f87171 50%, #ef4444 100%);
          }
          45% {
            background: linear-gradient(135deg, #fecaca 0%, #fca5a5 50%, #f87171 100%);
          }
          55% {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
          }
          65% {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%);
          }
          75% {
            background: linear-gradient(135deg, #fefefe 0%, #fef2f2 50%, #fee2e2 100%);
          }
          85% {
            background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #fef2f2 100%);
          }
          95% {
            background: linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #fefefe 100%);
          }
          100% {
            background: linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ffffff 100%);
          }
        }
      `}</style>
    </div>
  );
}
