
import React, { useRef, useEffect } from 'react';

const MobileOptimizedReels = () => {
  const scrollContainerRef = useRef(null);

  // Original reels data
  const reels = [
    {
      id: 1,
      title: 'Bali Beach Paradise',
      views: '1.5M',
      thumbnail: 'https://picsum.photos/seed/bali1/200/350',
    },
    {
      id: 2,
      title: '10-Minute Morning Workout',
      views: '825K',
      thumbnail: 'https://picsum.photos/seed/workout2/200/350',
    },
    {
      id: 3,
      title: 'Ultimate Homemade Pasta',
      views: '2.3M',
      thumbnail: 'https://picsum.photos/seed/pasta3/200/350',
    },
    {
      id: 4,
      title: 'New Smartphone Review',
      views: '578K',
      thumbnail: 'https://picsum.photos/seed/phone4/200/350',
    },
    {
      id: 5,
      title: 'Dog Learns Amazing Trick',
      views: '3.2M',
      thumbnail: 'https://picsum.photos/seed/dog5/200/350',
    },
    {
      id: 6,
      title: 'Sunset Mountain Painting',
      views: '1.2M',
      thumbnail: 'https://picsum.photos/seed/sunset6/200/350',
    }
  ];

  // Add CSS to hide scrollbar and ensure proper card sizing
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      /* Set the container width to show exactly 2.5 cards */
      @media (max-width: 640px) {
        .reel-card {
          width: 40vw; /* Each card takes 40% of viewport width */
          margin-right: 3vw; /* Gap between cards */
        }
      }

      /* Custom snap alignment */
      .custom-snap-scroll {
        scroll-padding-left: 8px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Header with red/orange AliExpress-style branding */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-red-600">Hot Videos</h2>
          <div className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-sm">LIVE</div>
        </div>
        <button className="text-sm text-gray-600 font-medium flex items-center">
          More
          <span className="ml-1 text-xs">▶</span>
        </button>
      </div>

      {/* Edge-to-edge container for scrolling, with left padding pl-2 */}
      <div 
        ref={scrollContainerRef}
        className="reels-container flex overflow-x-auto pl-2 hide-scrollbar snap-x snap-mandatory custom-snap-scroll w-full"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
        }}
      >
        {reels.map((reel) => (
          <div 
            key={reel.id} 
            className="reel-card flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-black relative snap-start"
            style={{ width: '40vw', marginRight: '3vw', maxWidth: '180px' }}
          >
            {/* Thumbnail with adjusted height for mobile */}
            <div className="relative bg-gray-200" style={{ height: '56vw', maxHeight: '250px' }}>
              <img 
                src={reel.thumbnail} 
                alt={reel.title} 
                className="w-full h-full object-cover"
              />

              {/* Video duration indicator */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
                0:{Math.floor(Math.random() * 50) + 10}
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <h3 className="font-medium text-white text-xs mb-1 line-clamp-1">{reel.title}</h3>
                <div className="flex items-center text-gray-300 text-xs">
                  <span>{reel.views} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* "See all" card - matching the size of other cards */}
        <div 
          className="reel-card flex-shrink-0 rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-gray-800 to-black relative snap-start flex flex-col items-center justify-center"
          style={{ width: '40vw', maxWidth: '180px', height: '56vw', maxHeight: '250px' }}
        >
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <span className="text-white text-xl">+</span>
          </div>
          <span className="text-white text-xs font-medium">See all videos</span>
        </div>
        
        {/* Add right spacing for proper scrolling to the end */}
        <div className="flex-shrink-0 w-2"></div>
      </div>
    </div>
  );
};

export default MobileOptimizedReels;
