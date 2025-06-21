
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

// Main Logo Path Component with Advanced Physics
interface MainLogoPathProps {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

function MainLogoPath({ 
  className = '', 
  strokeColor = '#ffffff',
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
          transformOrigin: 'center center',
          animation: `
            draw-path-physics 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
            fill-path-physics 1.2s ease-out 2.5s forwards,
            physics-vibration 0.8s ease-in-out 3.7s infinite,
            gravity-bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 4.5s infinite
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

        @keyframes gravity-bounce {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-8px) scale(1.01);
          }
          50% {
            transform: translateY(-15px) scale(1.02);
          }
          75% {
            transform: translateY(-5px) scale(1.005);
          }
        }
      `}</style>
    </>
  );
}

// Accent Path Component with Momentum Physics
interface AccentPathProps {
  className?: string;
  fillColor?: string;
}

function AccentPath({ 
  className = '', 
  fillColor = '#ffffff' 
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
      `}</style>
    </>
  );
}

// Ultra Spectacular Exit Particle System
function ExitParticleSystem() {
  return (
    <>
      {/* Primary Explosion Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: '50%',
              top: '50%',
              animation: `particle-explosion-${i % 6} 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${i * 0.05}s`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Secondary Energy Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-white rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              animation: `energy-wave-${i % 4} 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Dimensional Rifts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: '50%',
              top: '50%',
              width: '2px',
              height: '100px',
              transformOrigin: 'center bottom',
              animation: `dimensional-rift-${i % 3} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0,
              transform: `rotate(${i * 30}deg)`
            }}
          />
        ))}
      </div>

      <style>{`
        /* Particle Explosion Patterns */
        @keyframes particle-explosion-0 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          20% { opacity: 0.8; transform: translate(-150px, -200px) scale(1.5); }
          60% { opacity: 0.4; transform: translate(-300px, -400px) scale(0.5); }
          100% { opacity: 0; transform: translate(-500px, -600px) scale(0); }
        }
        
        @keyframes particle-explosion-1 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          20% { opacity: 0.9; transform: translate(180px, -180px) scale(2); }
          60% { opacity: 0.3; transform: translate(350px, -350px) scale(0.3); }
          100% { opacity: 0; transform: translate(600px, -500px) scale(0); }
        }
        
        @keyframes particle-explosion-2 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          25% { opacity: 0.7; transform: translate(-120px, 160px) scale(1.8); }
          65% { opacity: 0.2; transform: translate(-280px, 320px) scale(0.4); }
          100% { opacity: 0; transform: translate(-450px, 550px) scale(0); }
        }
        
        @keyframes particle-explosion-3 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          30% { opacity: 0.8; transform: translate(200px, 140px) scale(1.6); }
          70% { opacity: 0.3; transform: translate(400px, 280px) scale(0.6); }
          100% { opacity: 0; transform: translate(650px, 450px) scale(0); }
        }
        
        @keyframes particle-explosion-4 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          15% { opacity: 0.9; transform: translate(-80px, -80px) scale(2.2); }
          55% { opacity: 0.4; transform: translate(-200px, -200px) scale(0.2); }
          100% { opacity: 0; transform: translate(-400px, -400px) scale(0); }
        }
        
        @keyframes particle-explosion-5 {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          35% { opacity: 0.6; transform: translate(160px, 200px) scale(1.4); }
          75% { opacity: 0.1; transform: translate(320px, 400px) scale(0.8); }
          100% { opacity: 0; transform: translate(500px, 650px) scale(0); }
        }

        /* Energy Wave Patterns */
        @keyframes energy-wave-0 {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); border-width: 3px; }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(8); border-width: 1px; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(15); border-width: 0px; }
        }
        
        @keyframes energy-wave-1 {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1) rotate(0deg); border-width: 2px; }
          60% { opacity: 0.3; transform: translate(-50%, -50%) scale(12) rotate(180deg); border-width: 1px; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(20) rotate(360deg); border-width: 0px; }
        }
        
        @keyframes energy-wave-2 {
          0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); border-width: 4px; }
          40% { opacity: 0.5; transform: translate(-50%, -50%) scale(6); border-width: 2px; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(18); border-width: 0px; }
        }
        
        @keyframes energy-wave-3 {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1) rotate(0deg); border-width: 2px; }
          70% { opacity: 0.2; transform: translate(-50%, -50%) scale(10) rotate(-270deg); border-width: 1px; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(25) rotate(-360deg); border-width: 0px; }
        }

        /* Dimensional Rift Patterns */
        @keyframes dimensional-rift-0 {
          0% { opacity: 0; height: 50px; filter: blur(0px); }
          30% { opacity: 0.8; height: 300px; filter: blur(2px); }
          70% { opacity: 0.4; height: 600px; filter: blur(8px); }
          100% { opacity: 0; height: 1000px; filter: blur(20px); }
        }
        
        @keyframes dimensional-rift-1 {
          0% { opacity: 0; height: 30px; width: 1px; filter: blur(0px); }
          40% { opacity: 0.9; height: 400px; width: 3px; filter: blur(3px); }
          80% { opacity: 0.2; height: 800px; width: 6px; filter: blur(12px); }
          100% { opacity: 0; height: 1200px; width: 10px; filter: blur(25px); }
        }
        
        @keyframes dimensional-rift-2 {
          0% { opacity: 0; height: 40px; filter: blur(0px) hue-rotate(0deg); }
          50% { opacity: 0.7; height: 500px; filter: blur(5px) hue-rotate(180deg); }
          90% { opacity: 0.1; height: 900px; filter: blur(15px) hue-rotate(360deg); }
          100% { opacity: 0; height: 1400px; filter: blur(30px) hue-rotate(540deg); }
        }
      `}</style>
    </>
  );
}

// Logo Container Component with Ultra Spectacular Exit
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
          ? 'ultra-spectacular-exit 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
          : 'container-physics-float 6s ease-in-out 5s infinite'
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
      {isExiting && <ExitParticleSystem />}
      <style>{`
        @keyframes container-physics-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: drop-shadow(0 10px 25px rgba(255, 255, 255, 0.1));
          }
          25% {
            transform: translateY(-12px) rotate(0.8deg) scale(1.01);
            filter: drop-shadow(0 15px 35px rgba(255, 255, 255, 0.2));
          }
          50% {
            transform: translateY(-20px) rotate(0deg) scale(1.02);
            filter: drop-shadow(0 25px 50px rgba(255, 255, 255, 0.3));
          }
          75% {
            transform: translateY(-8px) rotate(-0.5deg) scale(1.005);
            filter: drop-shadow(0 12px 30px rgba(255, 255, 255, 0.15));
          }
        }

        @keyframes ultra-spectacular-exit {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: brightness(1) blur(0px) saturate(1) hue-rotate(0deg);
          }
          10% {
            transform: scale(1.05) rotate(5deg);
            opacity: 0.95;
            filter: brightness(1.2) blur(1px) saturate(1.2) hue-rotate(30deg);
          }
          20% {
            transform: scale(1.15) rotate(15deg);
            opacity: 0.9;
            filter: brightness(1.8) blur(2px) saturate(1.5) hue-rotate(90deg);
          }
          30% {
            transform: scale(1.3) rotate(35deg);
            opacity: 0.8;
            filter: brightness(2.5) blur(4px) saturate(2) hue-rotate(180deg);
          }
          40% {
            transform: scale(1.6) rotate(60deg);
            opacity: 0.7;
            filter: brightness(3.2) blur(8px) saturate(2.5) hue-rotate(270deg);
          }
          50% {
            transform: scale(2.2) rotate(120deg);
            opacity: 0.6;
            filter: brightness(4) blur(15px) saturate(3) hue-rotate(360deg);
          }
          60% {
            transform: scale(3.5) rotate(200deg);
            opacity: 0.5;
            filter: brightness(5) blur(25px) saturate(4) hue-rotate(450deg);
          }
          70% {
            transform: scale(6) rotate(320deg);
            opacity: 0.4;
            filter: brightness(6) blur(40px) saturate(5) hue-rotate(540deg);
          }
          80% {
            transform: scale(10) rotate(480deg);
            opacity: 0.3;
            filter: brightness(8) blur(60px) saturate(6) hue-rotate(630deg);
          }
          90% {
            transform: scale(18) rotate(720deg);
            opacity: 0.1;
            filter: brightness(10) blur(100px) saturate(8) hue-rotate(720deg);
          }
          100% {
            transform: scale(35) rotate(1080deg);
            opacity: 0;
            filter: brightness(15) blur(200px) saturate(10) hue-rotate(900deg);
          }
        }
      `}</style>
    </div>
  );
}

// Acknowledgment Section Component with Dramatic Exit
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
          ? 'text-dramatic-exit 3s ease-in-out forwards'
          : 'text-physics-entry 1s ease-out 7s forwards'
      }}
    >
      <div style={{ opacity: 0 }}>
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

        @keyframes text-dramatic-exit {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1) rotate(0deg);
            filter: blur(0px) brightness(1);
          }
          20% {
            opacity: 0.9;
            transform: translateY(-15px) scale(1.1) rotate(5deg);
            filter: blur(2px) brightness(1.3);
          }
          40% {
            opacity: 0.7;
            transform: translateY(-40px) scale(1.3) rotate(15deg);
            filter: blur(5px) brightness(1.8);
          }
          60% {
            opacity: 0.5;
            transform: translateY(-80px) scale(1.8) rotate(35deg);
            filter: blur(12px) brightness(2.5);
          }
          80% {
            opacity: 0.2;
            transform: translateY(-150px) scale(2.5) rotate(60deg);
            filter: blur(25px) brightness(3.5);
          }
          100% {
            opacity: 0;
            transform: translateY(-300px) scale(4) rotate(120deg);
            filter: blur(50px) brightness(5);
          }
        }
      `}</style>
    </div>
  );
}

// Ultra Spectacular Physics Background with Dimensional Collapse
function UltraSpectacularBackground({ isExiting }: { isExiting: boolean }) {
  return (
    <div 
      className="absolute inset-0"
      style={{
        animation: isExiting 
          ? 'dimensional-collapse 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
          : 'background-physics-pulse 4s ease-in-out infinite'
      }}
    >
      {/* Primary dimensional layer */}
      <div className="absolute inset-0 bg-gradient-radial from-red-400/20 via-red-500/10 to-transparent"></div>
      
      {/* Secondary quantum layer */}
      <div className="absolute inset-0 bg-gradient-conic from-red-500/5 via-transparent to-red-600/5"></div>
      
      {/* Tertiary space-time distortion layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-400/15 to-transparent"></div>
      
      {/* Ultra spectacular exit energy fields */}
      {isExiting && (
        <>
          <div className="absolute inset-0 bg-gradient-radial from-white/30 via-red-300/20 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-conic from-yellow-300/40 via-orange-400/30 to-red-500/40" 
               style={{ animation: 'energy-spiral 1.5s linear infinite' }}></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent"
               style={{ animation: 'dimensional-tear 2s ease-in-out infinite' }}></div>
        </>
      )}
      
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

        @keyframes dimensional-collapse {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: brightness(1) blur(0px) hue-rotate(0deg) saturate(1);
          }
          15% {
            opacity: 0.95;
            transform: scale(1.05) rotate(10deg);
            filter: brightness(1.3) blur(2px) hue-rotate(60deg) saturate(1.2);
          }
          30% {
            opacity: 0.9;
            transform: scale(1.15) rotate(30deg);
            filter: brightness(1.8) blur(5px) hue-rotate(150deg) saturate(1.5);
          }
          45% {
            opacity: 0.8;
            transform: scale(1.3) rotate(70deg);
            filter: brightness(2.5) blur(12px) hue-rotate(270deg) saturate(2);
          }
          60% {
            opacity: 0.6;
            transform: scale(1.6) rotate(140deg);
            filter: brightness(3.5) blur(25px) hue-rotate(420deg) saturate(3);
          }
          75% {
            opacity: 0.4;
            transform: scale(2.2) rotate(250deg);
            filter: brightness(5) blur(50px) hue-rotate(600deg) saturate(4);
          }
          90% {
            opacity: 0.1;
            transform: scale(3.5) rotate(400deg);
            filter: brightness(8) blur(100px) hue-rotate(800deg) saturate(6);
          }
          100% {
            opacity: 0;
            transform: scale(6) rotate(720deg);
            filter: brightness(15) blur(200px) hue-rotate(1080deg) saturate(10);
          }
        }

        @keyframes energy-spiral {
          0% { transform: rotate(0deg) scale(1); opacity: 0.3; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.6; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.3; }
        }

        @keyframes dimensional-tear {
          0%, 100% { 
            transform: skewX(0deg) skewY(0deg) scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: skewX(20deg) skewY(10deg) scale(1.1);
            opacity: 0.5;
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

export default function AnimatedSplashScreen({ 
  isVisible,
  isExiting = false,
  backgroundColor = 'bg-red-500',
  logoWidth = '350px',
  logoHeight = '350px',
  customAcknowledment
}: SplashScreenProps) {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 min-h-screen ${backgroundColor} flex flex-col items-center justify-center overflow-hidden z-50`}>
      <UltraSpectacularBackground isExiting={isExiting} />
      
      <div className="relative flex flex-col items-center justify-center flex-grow">
        <PulseBackground />
        
        <LogoContainer 
          width={logoWidth} 
          height={logoHeight} 
          isExiting={isExiting}
        >
          <MainLogoPath />
          <AccentPath />
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
