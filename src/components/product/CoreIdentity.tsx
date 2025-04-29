
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CoreIdentity = () => {
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [pulseBadge, setPulseBadge] = useState(false);
  
  // Sample data
  const title = "Bluetooth 5.0 Wireless Earbuds With Charging Case";
  const badge = "Limited Edition";
  const description = "Original TWS Earphones Touch Control Stereo Headphone with Mic Sports Waterproof Earbuds Premium Sound Quality For All Smartphones - 2025 Newest Version With 45h Playtime and Active Noise Cancellation";
  
  // Pulse badge periodically with faster interval for AliExpress vibe
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseBadge(true);
      setTimeout(() => setPulseBadge(false), 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-full px-2 py-0.5">
      {/* Sub-Row 1.1: Title + Badge - Fixed to be in same line */}
      <div className="flex items-center justify-between mb-2">
        <h2 
          className={`font-bold text-orange-600 cursor-pointer transition-all duration-300 ${isTitleExpanded ? '' : 'truncate'}`}
          style={isTitleExpanded ? {} : { maxWidth: '75%' }}
          onClick={() => setIsTitleExpanded(!isTitleExpanded)}
        >
          {isTitleExpanded ? title : (
            <>
              {title.substring(0, 24)}
              <span className="whitespace-nowrap inline-flex items-center">... 
                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </>
          )}
        </h2>
        <span className={`text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded whitespace-nowrap transition-all duration-300 flex items-center ${pulseBadge ? 'animate-pulse' : ''}`}>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
          {badge}
        </span>
      </div>
      
      {/* Sub-Row 1.2: Description with proper truncation */}
      <div className="relative mb-2">
        {isDescriptionExpanded ? (
          <div className="text-sm text-gray-700">
            <span style={{ wordBreak: "break-word" }}>{description}</span>
            {/* Moving See less button to a separate div below */}
          </div>
        ) : (
          <p className="text-sm text-gray-700 overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {description}
          </p>
        )}
      </div>
      
      {/* New Read more/less button centered at the bottom */}
      <div className="text-center mt-1">
        <button 
          className={`text-xs text-red-600 font-medium flex items-center justify-center mx-auto transition-all duration-300 hover:text-red-700`}
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          {isDescriptionExpanded ? 'See less' : 'Read more'}
          {isDescriptionExpanded ? 
            <ChevronUp className="w-3 h-3 ml-1" /> : 
            <ChevronDown className="w-3 h-3 ml-1" />
          }
        </button>
        
        {isDescriptionExpanded && (
          <button 
            className="text-xs font-medium mt-2 transition-all duration-300 bg-blue-100 text-blue-700 hover:bg-blue-200 py-1 px-2 rounded inline-flex items-center mx-auto"
            onClick={() => alert('Full product description')}
          >
            <span>Full Description</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CoreIdentity;
