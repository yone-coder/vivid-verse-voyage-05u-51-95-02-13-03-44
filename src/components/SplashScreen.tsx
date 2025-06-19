
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center z-50">
      <Logo animate={true} className="mb-8" />
    </div>
  );
};

export default SplashScreen;
