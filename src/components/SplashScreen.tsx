
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
          ? 'title-ultra-fast-exit 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards'
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

        @keyframes title-ultra-fast-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px) brightness(1);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-15px) scale(0.8);
            filter: blur(2px) brightness(1.5);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
            filter: blur(5px) brightness(2);
          }
        }
      `}</style>
    </div>
  );
}

// Main Logo Path Component with Ultra Fast Exit
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
            ? 'main-logo-ultra-fast-exit 1s cubic-bezier(0.77, 0, 0.175, 1) forwards'
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
            transform: translateY(-20px);
            filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.1));
          }
          15% {
            stroke-width: 6;
            transform: translateY(-15px);
            filter: drop-shadow(0 15px 30px rgba(255, 255, 255, 0.3));
          }
          30% {
            stroke-dashoffset: 3000;
            stroke-width: 8;
            transform: translateY(-10px);
            filter: drop-shadow(0 20px 40px rgba(255, 255, 255, 0.5));
          }
          50% {
            stroke-dashoffset: 1500;
            stroke-width: 6;
            transform: translateY(-5px);
            filter: drop-shadow(0 25px 50px rgba(255, 255, 255, 0.7));
          }
          75% {
            stroke-dashoffset: 500;
            stroke-width: 4;
            transform: translateY(0px);
            filter: drop-shadow(0 30px 60px rgba(255, 255, 255, 0.8));
          }
          90% {
            stroke-dashoffset: 100;
            stroke-width: 3;
            transform: translateY(2px);
            filter: drop-shadow(0 35px 70px rgba(255, 255, 255, 0.9));
          }
          100% {
            stroke-dashoffset: 0;
            stroke-width: 2;
            transform: translateY(0px);
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
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(0.5px) translateY(-0.3px);
          }
          50% {
            transform: translateX(-0.3px) translateY(0.5px);
          }
          75% {
            transform: translateX(0.2px) translateY(-0.2px);
          }
        }

        @keyframes main-logo-ultra-fast-exit {
          0% {
            fill: #ffffff;
            stroke: #ffffff;
            stroke-width: 0;
            stroke-dashoffset: 0;
            transform: scale(1) translateY(0px);
            filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0)) blur(0px);
            opacity: 1;
          }
          30% {
            fill: rgba(255, 255, 255, 0.7);
            stroke: #ffffff;
            stroke-width: 2;
            stroke-dashoffset: 1200;
            transform: scale(1.15) translateY(-25px);
            filter: brightness(2) drop-shadow(0 0 50px rgba(255, 255, 255, 0.9)) blur(3px);
            opacity: 0.8;
          }
          60% {
            fill: rgba(255, 255, 255, 0.3);
            stroke: #ffffff;
            stroke-width: 4;
            stroke-dashoffset: 2800;
            transform: scale(1.4) translateY(-60px);
            filter: brightness(3.5) drop-shadow(0 0 100px rgba(255, 255, 255, 1)) blur(8px);
            opacity: 0.4;
          }
          100% {
            fill: transparent;
            stroke: #ffffff;
            stroke-width: 8;
            stroke-dashoffset: 4000;
            transform: scale(2) translateY(-120px);
            filter: brightness(5) drop-shadow(0 0 150px rgba(255, 255, 255, 1)) blur(20px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

// Accent Path Component with Ultra Fast Exit
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
            ? 'accent-ultra-fast-exit 0.9s cubic-bezier(0.86, 0, 0.07, 1) forwards'
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
            transform: scale(0.1) translateX(-50px) translateY(-30px);
            filter: blur(5px) hue-rotate(180deg);
          }
          15% {
            opacity: 0.1;
            transform: scale(0.3) translateX(-35px) translateY(-20px);
            filter: blur(4px) hue-rotate(120deg);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.6) translateX(-20px) translateY(-10px);
            filter: blur(3px) hue-rotate(60deg);
          }
          45% {
            opacity: 0.5;
            transform: scale(0.9) translateX(-8px) translateY(-3px);
            filter: blur(2px) hue-rotate(30deg);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.1) translateX(3px) translateY(2px);
            filter: blur(1px) hue-rotate(10deg);
          }
          75% {
            opacity: 0.85;
            transform: scale(1.05) translateX(1px) translateY(1px);
            filter: blur(0.5px) hue-rotate(5deg);
          }
          90% {
            opacity: 0.95;
            transform: scale(1.02) translateX(0.5px) translateY(0.2px);
            filter: blur(0.2px) hue-rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0px) translateY(0px);
            filter: blur(0px) hue-rotate(0deg);
          }
        }

        @keyframes elastic-oscillation {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          25% {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
          50% {
            transform: scale(0.98);
            filter: brightness(0.95);
          }
          75% {
            transform: scale(1.02);
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

        @keyframes accent-ultra-fast-exit {
          0% {
            opacity: 1;
            transform: scale(1) translateX(0px) translateY(0px);
            filter: blur(0px) hue-rotate(0deg) brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          }
          40% {
            opacity: 0.6;
            transform: scale(0.4) translateX(-25px) translateY(-15px);
            filter: blur(3px) hue-rotate(90deg) brightness(2.5) drop-shadow(0 0 30px rgba(255, 255, 255, 0.8));
          }
          70% {
            opacity: 0.2;
            transform: scale(0.15) translateX(-45px) translateY(-25px);
            filter: blur(6px) hue-rotate(180deg) brightness(4) drop-shadow(0 0 60px rgba(255, 255, 255, 1));
          }
          100% {
            opacity: 0;
            transform: scale(0.02) translateX(-70px) translateY(-40px);
            filter: blur(10px) hue-rotate(270deg) brightness(6) drop-shadow(0 0 100px rgba(255, 255, 255, 1));
          }
        }
      `}</style>
    </>
  );
}

// Logo Container Component with Ultra Fast Exit
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
          ? 'container-ultra-fast-exit 1.1s cubic-bezier(0.895, 0.03, 0.685, 0.22) forwards'
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
        @keyframes container-ultra-fast-exit {
          0% {
            transform: scale(1) translateY(0px);
            opacity: 1;
            filter: blur(0px) brightness(1) contrast(1);
          }
          40% {
            transform: scale(0.7) translateY(-40px);
            opacity: 0.6;
            filter: blur(5px) brightness(1.8) contrast(1.5);
          }
          70% {
            transform: scale(0.4) translateY(-80px);
            opacity: 0.2;
            filter: blur(12px) brightness(2.8) contrast(2);
          }
          100% {
            transform: scale(0.1) translateY(-140px);
            opacity: 0;
            filter: blur(25px) brightness(4) contrast(3);
          }
        }
      `}</style>
    </div>
  );
}

// Acknowledgment Section Component with Ultra Fast Exit
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
          ? 'text-ultra-fast-exit 0.7s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards'
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

        @keyframes text-ultra-fast-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px) brightness(1);
          }
          50% {
            opacity: 0.3;
            transform: translateY(25px) scale(0.7);
            filter: blur(3px) brightness(2);
          }
          100% {
            opacity: 0;
            transform: translateY(60px) scale(0.4);
            filter: blur(8px) brightness(3.5);
          }
        }
      `}</style>
    </div>
  );
}

// Ultra Fast Progressive White Overlay
interface ProgressiveWhiteOverlayProps {
  isExiting: boolean;
}

function ProgressiveWhiteOverlay({ isExiting }: ProgressiveWhiteOverlayProps) {
  if (!isExiting) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] pointer-events-none"
      style={{
        animation: 'progressive-white-overlay-ultra-fast 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }}
    >
      {/* Ultra fast expanding white circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${100 + i * 150}px`,
              height: `${100 + i * 150}px`,
              transform: 'scale(0)',
              opacity: 0.15 + (i * 0.05),
              animation: `ultra-fast-white-circle-expand-${i + 1} ${0.6 + i * 0.1}s cubic-bezier(0.23, 1, 0.32, 1) ${0.2 + i * 0.03}s forwards`
            }}
          />
        ))}
      </div>
      
      {/* Ultra fast gradient waves */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${0.1 + i * 0.15}) 0%, transparent 70%)`,
              opacity: 0,
              animation: `ultra-fast-wave-expand-${i + 1} ${0.5 + i * 0.1}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.05}s forwards`
            }}
          />
        ))}
      </div>
      
      {/* Ultra fast final white overlay */}
      <div 
        className="absolute inset-0 bg-white"
        style={{
          opacity: 0,
          animation: 'final-ultra-fast-white-complete 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards'
        }}
      ></div>
      
      <style>{`
        @keyframes progressive-white-overlay-ultra-fast {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        ${[...Array(6)].map((_, i) => `
          @keyframes ultra-fast-white-circle-expand-${i + 1} {
            0% {
              transform: scale(0);
              opacity: 0;
              filter: blur(1px);
            }
            60% {
              transform: scale(0.8);
              opacity: ${0.4 + i * 0.05};
              filter: blur(0.3px);
            }
            100% {
              transform: scale(1);
              opacity: ${0.6 + i * 0.05};
              filter: blur(0px);
            }
          }
        `).join('')}

        ${[...Array(3)].map((_, i) => `
          @keyframes ultra-fast-wave-expand-${i + 1} {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            100% {
              opacity: ${0.8 + i * 0.1};
              transform: scale(1.5);
            }
          }
        `).join('')}

        @keyframes final-ultra-fast-white-complete {
          0% {
            opacity: 0;
            transform: scale(0.9);
            filter: blur(2px);
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

// Ultra Fast Quantum Background
function QuantumBackground({ isExiting }: { isExiting: boolean }) {
  return (
    <div 
      className="absolute inset-0"
      style={{
        animation: isExiting 
          ? 'background-ultra-fast-exit 1s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          : 'background-physics-pulse 4s ease-in-out infinite'
      }}
    >
      {/* Enhanced gradient layers */}
      <div className="absolute inset-0 bg-gradient-radial from-red-400/20 via-red-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-conic from-red-500/5 via-transparent to-red-600/5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-300/15 via-transparent to-red-700/15"></div>
      
      {/* Ultra fast quantum particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animation: isExiting 
                ? `particle-ultra-fast-exit ${0.6 + Math.random() * 0.3}s cubic-bezier(0.77, 0, 0.175, 1) ${Math.random() * 0.2}s forwards`
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

        @keyframes background-ultra-fast-exit {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px) brightness(1) hue-rotate(0deg) contrast(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.02);
            filter: blur(3px) brightness(2) hue-rotate(30deg) contrast(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
            filter: blur(10px) brightness(3.5) hue-rotate(60deg) contrast(2);
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

        @keyframes particle-ultra-fast-exit {
          0% {
            transform: scale(1) translateY(0px);
            opacity: 0.3;
            filter: brightness(1) blur(0px);
          }
          50% {
            transform: scale(1.5) translateY(-30px);
            opacity: 0.7;
            filter: brightness(3) blur(2px);
          }
          100% {
            transform: scale(0) translateY(-80px);
            opacity: 0;
            filter: brightness(5) blur(8px);
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
          ? 'sophisticated-ultra-fast-red-to-white-transform 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards'
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
        @keyframes sophisticated-ultra-fast-red-to-white-transform {
          0% {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
          }
          40% {
            background: linear-gradient(135deg, #fca5a5 0%, #f87171 50%, #ef4444 100%);
          }
          70% {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%);
          }
          100% {
            background: linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ffffff 100%);
          }
        }
      `}</style>
    </div>
  );
}
