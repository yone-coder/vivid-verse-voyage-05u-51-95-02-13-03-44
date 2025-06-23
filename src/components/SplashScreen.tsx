
import React from 'react';
import { SplashScreenProps } from './splash/types';
import { SPLASH_ANIMATIONS } from './splash/animations';
import PulseBackground from './splash/PulseBackground';
import QuantumBackground from './splash/QuantumBackground';
import TopTitle from './splash/TopTitle';
import LogoContainer from './splash/LogoContainer';
import MainLogoPath from './splash/MainLogoPath';
import AccentPath from './splash/AccentPath';
import Acknowledgment from './splash/Acknowledgment';
import ProgressiveWhiteOverlay from './splash/ProgressiveWhiteOverlay';

// Accessibility and performance optimized splash screen
const SplashScreen: React.FC<SplashScreenProps> = ({ 
  isVisible,
  isExiting = false,
  backgroundColor = 'bg-red-500',
  logoWidth = '350px',
  logoHeight = '350px',
  customAcknowledment
}) => {
  // Early return for performance
  if (!isVisible) return null;

  // Check for reduced motion preference
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, []);

  return (
    <>
      <style>{SPLASH_ANIMATIONS.keyframes}</style>
      <div 
        className={`fixed inset-0 min-h-screen ${backgroundColor} flex flex-col items-center justify-center overflow-hidden z-50`}
        style={{
          animation: isExiting && !prefersReducedMotion
            ? SPLASH_ANIMATIONS.configs.containerExit
            : undefined,
          willChange: isExiting ? 'background' : 'auto'
        }}
        role="dialog"
        aria-label="Application loading screen"
        aria-live="polite"
      >
        <QuantumBackground isExiting={isExiting && !prefersReducedMotion} />
        
        <TopTitle isExiting={isExiting && !prefersReducedMotion} />
        
        <div className="relative flex flex-col items-center justify-center flex-grow">
          <PulseBackground />
          
          <LogoContainer 
            width={logoWidth} 
            height={logoHeight} 
            isExiting={isExiting && !prefersReducedMotion}
          >
            <MainLogoPath isExiting={isExiting && !prefersReducedMotion} />
            <AccentPath is
            isExiting={isExiting && !prefersReducedMotion} />
          </LogoContainer>
        </div>

        <Acknowledgment 
          madeInText={customAcknowledment?.madeInText}
          authorizedText={customAcknowledment?.authorizedText}
          isExiting={isExiting && !prefersReducedMotion}
        />

        {!prefersReducedMotion && (
          <ProgressiveWhiteOverlay isExiting={isExiting} />
        )}
        
        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="assertive">
          {isExiting ? 'Loading complete' : 'Application is loading'}
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
