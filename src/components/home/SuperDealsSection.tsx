
import React, { useRef } from 'react';
import { ChevronRight, Tv, Smartphone, Coffee, Headphones, Watch, Speaker, Star } from 'lucide-react';

const SuperDeals = () => {
  const scrollContainerRef = useRef(null);
  
  const allDeals = [
    {
      id: 1,
      title: 'Smart 4K TV 55-inch',
      currentPrice: 499.99,
      originalPrice: 699.99,
      discount: 29,
      color: 'bg-blue-500',
      icon: <Tv size={24} color="white" />,
      shortLabel: 'Smart TV'
    },
    {
      id: 2,
      title: 'Robot Vacuum Cleaner',
      currentPrice: 189.99,
      originalPrice: 299.99,
      discount: 37,
      color: 'bg-green-500',
      icon: <Smartphone size={24} color="white" />,
      shortLabel: 'Robot Vacuum'
    },
    {
      id: 3,
      title: 'Coffee Machine with Grinder',
      currentPrice: 129.99,
      originalPrice: 199.99,
      discount: 35,
      color: 'bg-purple-500',
      icon: <Coffee size={24} color="white" />,
      shortLabel: 'Coffee Machine'
    },
    {
      id: 4,
      title: 'Wireless Earbuds Pro',
      currentPrice: 89.99,
      originalPrice: 149.99,
      discount: 40,
      color: 'bg-red-500',
      icon: <Headphones size={24} color="white" />,
      shortLabel: 'Earbuds'
    },
    {
      id: 5,
      title: 'Smart Watch Series 5',
      currentPrice: 199.99,
      originalPrice: 279.99,
      discount: 29,
      color: 'bg-yellow-500',
      icon: <Watch size={24} color="white" />,
      shortLabel: 'Smart Watch'
    },
    {
      id: 6,
      title: 'Bluetooth Speaker Portable',
      currentPrice: 59.99,
      originalPrice: 99.99,
      discount: 40,
      color: 'bg-indigo-500',
      icon: <Speaker size={24} color="white" />,
      shortLabel: 'Speaker'
    },
    {
      id: 7,
      title: 'Air Fryer 5.5L',
      currentPrice: 79.99,
      originalPrice: 129.99,
      discount: 38,
      color: 'bg-pink-500',
      icon: <Coffee size={24} color="white" />,
      shortLabel: 'Air Fryer'
    },
    {
      id: 8,
      title: 'Gaming Keyboard RGB',
      currentPrice: 49.99,
      originalPrice: 89.99,
      discount: 44,
      color: 'bg-blue-400',
      icon: <Smartphone size={24} color="white" />,
      shortLabel: 'Keyboard'
    },
    {
      id: 9,
      title: 'Wireless Charging Pad',
      currentPrice: 19.99,
      originalPrice: 39.99,
      discount: 50,
      color: 'bg-gray-500',
      icon: <Smartphone size={24} color="white" />,
      shortLabel: 'Charger'
    }
  ];

  // Group deals into columns of 3
  const groupedDeals = [];
  for (let i = 0; i < allDeals.length; i += 3) {
    groupedDeals.push(allDeals.slice(i, i + 3));
  }

  // Function to render a product card
  const renderProductCard = (deal) => (
    <div key={deal.id} className="border border-gray-200 rounded-lg mb-3 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-br">
            SUPER
          </div>
          <div className={`${deal.color} p-2 w-24 h-24 flex items-center justify-center`}>
            <div className="flex flex-col items-center">
              {deal.icon}
              <span className="text-xs font-medium text-white mt-1 text-center">
                {deal.shortLabel}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-2 flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 text-xs mb-1 whitespace-nowrap overflow-hidden text-ellipsis pr-1" title={deal.title}>
            {deal.title}
          </h3>
          <div className="flex flex-col">
            <span className="text-base font-bold text-orange-500">
              US ${deal.currentPrice}
            </span>
            <span className="text-gray-500 line-through text-xs">
              US ${deal.originalPrice}
            </span>
            <span className="mt-1 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded inline-block w-fit">
              {deal.discount}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white">
      {/* Header with enhanced styling and reduced bottom padding */}
      <div className="px-4 py-1.5">
        <div className="flex justify-between items-center mb-0.5">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-orange-500" strokeWidth={2.5} fill="#FEF7CD" />
            <h2 className="text-sm font-medium">Super Deals</h2>
          </div>
          <button className="flex items-center text-orange-500 hover:text-orange-600 transition-colors text-xs">
            More <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroll container with proper padding effect */}
      <div className="relative">
        <div 
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ 
            scrollPaddingLeft: '1rem',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          ref={scrollContainerRef}
        >
          <div className="flex pl-4">
            {/* Actual content columns */}
            {groupedDeals.map((column, colIndex) => (
              <div 
                key={`column-${colIndex}`}
                className="flex-none w-64 snap-start"
                style={{ marginRight: colIndex < groupedDeals.length - 1 ? '1rem' : '0' }}
              >
                {column.map(deal => renderProductCard(deal))}
              </div>
            ))}
            
            {/* Right padding spacer */}
            <div className="flex-none w-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperDeals;
