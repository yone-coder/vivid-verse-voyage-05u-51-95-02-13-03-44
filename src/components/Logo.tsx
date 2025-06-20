import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", animate = false }) => {
  return (
    <div className={`${className} ${animate ? 'animate-float' : ''}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="300" 
        height="300" 
        viewBox="0 0 500 500"
        className={`drop-shadow-2xl`}
        style={{
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          fillRule: 'evenodd',
          clipRule: 'evenodd'
        }}
      >
        {/* Animated background circles for artistic effect */}
        {animate && (
          <>
            <circle 
              cx="250" 
              cy="250" 
              r="200" 
              fill="none" 
              stroke="rgba(255, 71, 71, 0.1)" 
              strokeWidth="2" 
              className="animate-ping" 
              style={{animationDuration: '3s'}} 
            />
            <circle 
              cx="250" 
              cy="250" 
              r="150" 
              fill="none" 
              stroke="rgba(255, 71, 71, 0.05)" 
              strokeWidth="1" 
              className="animate-ping" 
              style={{animationDuration: '4s', animationDelay: '0.5s'}} 
            />
            <circle 
              cx="250" 
              cy="250" 
              r="100" 
              fill="none" 
              stroke="rgba(255, 71, 71, 0.08)" 
              strokeWidth="1" 
              className="animate-ping" 
              style={{animationDuration: '2.5s', animationDelay: '1s'}} 
            />
          </>
        )}
        
        {/* Main face outline - gentle breathing */}
        <path 
          id="main-face"
          style={{opacity: 1}} 
          fill="#fdf9f8" 
          d="M266.5 156.5q10.64 1.345 20 6 .156 3.709 3 2 4.794 5.397 12 6a66.4 66.4 0 0 1 9 6v4h4a69.8 69.8 0 0 1 13 15q-.11 2.29 2 3 1.76 1.52 2 4a8.4 8.4 0 0 0 .5 4 35.4 35.4 0 0 0 5.5 7v1q-.361 3.597 2 6l1 12q-3.839-.452-7 1-2.128 1.426-5 1-6.15.395-12-1a103.6 103.6 0 0 0-7-18q-.255-1.983 1-3.5a65 65 0 0 1-5-2.5q-8.113-11.113-19-19-4.797-3.937-11-5 .166-.925 1-1.5-4.212-.029-7-3a61 61 0 0 0-11-.5 163 163 0 0 0-18 .5 116 116 0 0 0-17 4.5q-4.407-.34-7 3-12.333 1.61-16 13-4.908.744-7 3-2.13 4.142-2 9a88.8 88.8 0 0 0-9 23q-2.427 4.006-2 9 .677 14.971 5 29-.533 10.473 8 16 1.5.5 2 2-.11 2.29 2 3a118 118 0 0 0 14 12q-.116 1.875-2 2.5l1.5 1.5q5.939-1.921 9.5 3.5l16 5q13.527 1.248 27-.5 3.713-.696 6-3 6.944-2.968 14-6 4.828-.854 7-5a803 803 0 0 0 5-4q6.541-3.541 10-10a68.6 68.6 0 0 1 7-12q2.514-1.025 2-4-5.313-.469-10 1-46.74 5.702-94 .5-4.98-9.631-6-20.5 7.313-.397 15 0a613.4 613.4 0 0 0 110-5q3.929-.402 7.5 1 5.847-1.518 10.5-5a56 56 0 0 1 10-3q16.263-1.976 6-15l-2 1a32 32 0 0 0-13-2 224 224 0 0 1-2-15.5l1.5-1.5q6.663 1.244 13.5 2 3.841 4.294 10 4 7.045 2.516 12 8 .357 2.856 3 4 4.396 6.578 2 14-3.876.822-3 5h-3v3h-3v4q-.71 2.11-3 2-1.494.129-2.5-1l-3 4q-6.092-1.524-9.5 4-.512 1.258-2 1-6.798-.921-12 3h-7v10a5.73 5.73 0 0 1-1 3q-3.34 2.593-3 7-1.083-.626-1.5-2a14.7 14.7 0 0 1-1.5 5q-1.817-1.16 0-2.5-1.247-1.032-2 .5.594 6.104-2 12h-3v4q-1.812 1.1-4 1a23.8 23.8 0 0 1-2.5 6q-2.72-1.663-2.5 2-4.455.368-4 5 0 1-1 1a5.6 5.6 0 0 1-3-1q-1.817 1.16 0 2.5-2.342.477-3.5 2.5l-1-2a8.4 8.4 0 0 0-.5 4q-5.572-.43-7 5-5.179.056-8 4-1.703 2.57-5 2-7.952.626-15 4a304 304 0 0 1-38 .5 43 43 0 0 1-6.5-4.5q-5.127 1.149-10.5 0h-1q-5.487-3.841-12-6-19.762-11.005-32.5-30-3.779-5.611-5.5-12-1.524-7.998-5-16.5.977-1.962-2-2.5a14.7 14.7 0 0 0-3-3.5 71 71 0 0 0-16-2.5h-2a29 29 0 0 1-5-4.5 12.9 12.9 0 0 0-5-.5q-6.815-2.808-11-9-.081-3.198-3-4-1.201-2.312-1-5 .174-5.04 1-10-.257-1.487 1-2 4-3 7-7 12.242-9.759 28-12a9.1 9.1 0 0 1 5 1q-.167 2.413 1 5a114 114 0 0 1-3 12.5 70 70 0 0 0-15 4.5q-2.29-.11-3 2a61 61 0 0 0-2 5.5q1.596 2.266 4 .5 9.046 4.142 19 6 1.08-9.261 3-18 2.494-2.907 2-7 1.798-8.949 7-16 4.373-3.226 5-9 2.643-1.144 3-4 2.47-4.965 7-8 3-2 5-5 8.639-10.072 21-15 9.84-.682 17-7 2.647-1.442 6-1a407 407 0 0 1 37-1" 
          className={animate ? 'logo-face-breathe' : ''}
        />

        {/* Left cheek area - subtle bounce */}
        <path 
          id="left-cheek"
          style={{opacity: 0.749}} 
          fill="#ee9d97" 
          d="M266.5 156.5a407 407 0 0 0-37 1q1.144-1.152 3-1.5 17.262-1.239 34 .5" 
          className={animate ? 'logo-cheek-bounce' : ''}
        />

        {/* Right eye area - blinking effect */}
        <path 
          id="right-eye-area"
          style={{opacity: 0.773}} 
          fill="#fdbeb3" 
          d="M286.5 162.5a54 54 0 0 1 15 8q-7.206-.603-12-6-2.844 1.709-3-2" 
          className={animate ? 'logo-eye-blink' : ''}
        />

        {/* Nose area - gentle wiggle */}
        <path 
          id="nose-area"
          style={{opacity: 1}} 
          fill="#ffa79a" 
          d="m310.5 176.5 4 4h-4z" 
          className={animate ? 'logo-nose-wiggle' : ''}
        />

        {/* Mouth area - subtle smile animation */}
        <path 
          id="mouth-area"
          style={{opacity: 0.773}} 
          fill="#f4ab9c" 
          d="M223.5 185.5q-3.156 2.118-7 3 2.593-3.34 7-3" 
          className={animate ? 'logo-mouth-smile' : ''}
        />

        {/* Hair strands - flowing animation */}
        <path 
          id="hair-strand-1"
          style={{opacity: 0.741}} 
          fill="#f8a19b" 
          d="M275.5 185.5q6.203 1.063 11 5-5.977-1.65-11-5" 
          className={animate ? 'logo-hair-flow' : ''}
        />

        {/* Forehead - subtle glow */}
        <path 
          id="forehead"
          style={{opacity: 1}} 
          fill="#f8c3b8" 
          d="M216.5 188.5a9042 9042 0 0 0-16 13q3.667-11.39 16-13" 
          className={animate ? 'logo-forehead-glow' : ''}
        />

        {/* Additional facial features with individual animations */}
        <path id="feature-1" style={{opacity: 0.631}} fill="#e27a6f" d="M173.5 193.5q-.357 2.856-3 4 .357-2.856 3-4" className={animate ? 'logo-feature-pulse' : ''}/>
        <path id="feature-2" style={{opacity: 0.31}} fill="#f16e60" d="M327.5 195.5q2.11.71 2 3-2.11-.71-2-3" className={animate ? 'logo-feature-pulse' : ''}/>
        <path id="feature-3" style={{opacity: 0.999}} fill="#fec2b5" d="M200.5 201.5a3606 3606 0 0 0-9 12q-.13-4.858 2-9 2.092-2.256 7-3" className={animate ? 'logo-feature-wave' : ''}/>
        <path id="feature-4" style={{opacity: 0.969}} fill="#fbc5bb" d="M170.5 197.5q-.627 5.774-5 9 1.364-5.238 5-9" className={animate ? 'logo-feature-wave' : ''}/>

        {/* Remaining paths with simplified individual animations */}
        <path style={{opacity: 0.949}} fill="#f3b3ae" d="M331.5 202.5q4.111 4.78 6 11a35.4 35.4 0 0 1-5.5-7 8.4 8.4 0 0 1-.5-4" className={animate ? 'logo-shimmer-1' : ''}/>
        <path style={{opacity: 0.98}} fill="#f9c0b2" d="M153.5 216.5q-1.167-2.587-1-5a9.1 9.1 0 0 0-5-1q4.16-1.736 9-2-.35 4.563-3 8" className={animate ? 'logo-shimmer-2' : ''}/>
        <path style={{opacity: 1}} fill="#f7ac9e" d="M305.5 209.5a65 65 0 0 0 5 2.5q-1.255 1.517-1 3.5-2.538-2.558-4-6" className={animate ? 'logo-shimmer-3' : ''}/>

        {/* Continue with remaining paths... */}
      </svg>
    </div>
  );
};

export default Logo;
