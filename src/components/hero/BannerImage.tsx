
import React, { useState } from "react";

interface BannerImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    console.error(`Failed to load banner image: ${src}`);
    setError(true);
  };
  
  return (
    <>
      {error ? (
        <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
          <span className="text-gray-500">Image could not be loaded</span>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt}
          className={`object-cover ${className}`}
          onError={handleError}
        />
      )}
    </>
  );
};

export default BannerImage;
