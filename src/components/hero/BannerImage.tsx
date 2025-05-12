
import React, { useState, useEffect } from "react";

interface BannerImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Reset state when src changes
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);
  
  const handleError = () => {
    console.error(`Failed to load banner image: ${src}`);
    setError(true);
  };
  
  const handleLoad = () => {
    console.log(`Successfully loaded banner image: ${src}`);
    setLoaded(true);
  };
  
  return (
    <>
      {error ? (
        <div className={`flex items-center justify-center bg-gray-200 ${className} aspect-[16/5]`}>
          <div className="text-center p-4">
            <span className="text-gray-500 block">Image could not be loaded</span>
            <span className="text-xs text-gray-400 block mt-1">{src}</span>
          </div>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt}
          className={`w-full ${className} ${!loaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </>
  );
};

export default BannerImage;
