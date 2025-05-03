
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Truck, ShieldCheck, Clock } from 'lucide-react';

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: "SuperTech Store",
    image: "https://picsum.photos/seed/vendor1/120/120",
    rating: 4.8,
    sales: "10.5k",
    followers: "23.4k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 101, image: "https://picsum.photos/seed/product101/70/70", price: "$19.99" },
      { id: 102, image: "https://picsum.photos/seed/product102/70/70", price: "$24.50" },
      { id: 103, image: "https://picsum.photos/seed/product103/70/70", price: "$15.75" }
    ]
  },
  {
    id: 2,
    name: "EcoFriendly Goods",
    image: "https://picsum.photos/seed/vendor2/120/120",
    rating: 4.9,
    sales: "8.7k",
    followers: "19.2k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    topProducts: [
      { id: 201, image: "https://picsum.photos/seed/product201/70/70", price: "$12.99" },
      { id: 202, image: "https://picsum.photos/seed/product202/70/70", price: "$31.50" },
      { id: 203, image: "https://picsum.photos/seed/product203/70/70", price: "$22.25" }
    ]
  },
  {
    id: 3,
    name: "Fashion Forward",
    image: "https://picsum.photos/seed/vendor3/120/120",
    rating: 4.7,
    sales: "15.3k",
    followers: "32.1k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 301, image: "https://picsum.photos/seed/product301/70/70", price: "$35.99" },
      { id: 302, image: "https://picsum.photos/seed/product302/70/70", price: "$18.50" },
      { id: 303, image: "https://picsum.photos/seed/product303/70/70", price: "$27.75" }
    ]
  },
  {
    id: 4,
    name: "Home Essentials",
    image: "https://picsum.photos/seed/vendor4/120/120",
    rating: 4.6,
    sales: "7.2k",
    followers: "12.5k",
    topSeller: false,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 401, image: "https://picsum.photos/seed/product401/70/70", price: "$42.99" },
      { id: 402, image: "https://picsum.photos/seed/product402/70/70", price: "$15.75" },
      { id: 403, image: "https://picsum.photos/seed/product403/70/70", price: "$29.50" }
    ]
  },
  {
    id: 5,
    name: "Gadget World",
    image: "https://picsum.photos/seed/vendor5/120/120",
    rating: 4.9,
    sales: "20.1k",
    followers: "45.7k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 501, image: "https://picsum.photos/seed/product501/70/70", price: "$89.99" },
      { id: 502, image: "https://picsum.photos/seed/product502/70/70", price: "$64.50" },
      { id: 503, image: "https://picsum.photos/seed/product503/70/70", price: "$112.75" }
    ]
  },
  {
    id: 6,
    name: "Beauty Express",
    image: "https://picsum.photos/seed/vendor6/120/120",
    rating: 4.7,
    sales: "12.3k",
    followers: "28.9k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    topProducts: [
      { id: 601, image: "https://picsum.photos/seed/product601/70/70", price: "$21.99" },
      { id: 602, image: "https://picsum.photos/seed/product602/70/70", price: "$18.50" },
      { id: 603, image: "https://picsum.photos/seed/product603/70/70", price: "$34.75" }
    ]
  },
  {
    id: 7,
    name: "Sports Direct",
    image: "https://picsum.photos/seed/vendor7/120/120",
    rating: 4.5,
    sales: "5.8k",
    followers: "14.2k",
    topSeller: false,
    fastShipping: true,
    verified: false,
    topProducts: [
      { id: 701, image: "https://picsum.photos/seed/product701/70/70", price: "$45.99" },
      { id: 702, image: "https://picsum.photos/seed/product702/70/70", price: "$29.50" },
      { id: 703, image: "https://picsum.photos/seed/product703/70/70", price: "$52.75" }
    ]
  },
  {
    id: 8,
    name: "Electronic Hub",
    image: "https://picsum.photos/seed/vendor8/120/120",
    rating: 4.8,
    sales: "18.7k",
    followers: "37.3k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 801, image: "https://picsum.photos/seed/product801/70/70", price: "$129.99" },
      { id: 802, image: "https://picsum.photos/seed/product802/70/70", price: "$75.50" },
      { id: 803, image: "https://picsum.photos/seed/product803/70/70", price: "$210.75" }
    ]
  }
];

// Compact vendor card component
const CompactVendorCard = ({ vendor }: { vendor: any }) => {
  return (
    <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Store image and badges */}
      <div className="relative">
        <img 
          src={vendor.image} 
          alt={vendor.name} 
          className="w-full h-24 object-cover"
        />
        
        {/* Badges overlay */}
        <div className="absolute top-1 left-1 flex flex-wrap gap-1 max-w-full">
          {vendor.topSeller && (
            <div className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
              <Award size={10} className="mr-0.5" />
              <span className="text-xs">Top</span>
            </div>
          )}
          {vendor.fastShipping && (
            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
              <Truck size={10} className="mr-0.5" />
              <span className="text-xs">Fast</span>
            </div>
          )}
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-1 right-1">
          <div className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded-sm flex items-center">
            <Star size={10} className="mr-0.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{vendor.rating}</span>
          </div>
        </div>
        
        {/* Verified badge */}
        {vendor.verified && (
          <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
            <ShieldCheck size={10} />
          </div>
        )}
      </div>
      
      {/* Store name and stats */}
      <div className="p-2">
        <h3 className="font-bold text-xs truncate">{vendor.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-0.5">
          <span className="text-xs">{vendor.sales} sales</span>
        </div>
      </div>
      
      {/* Products preview */}
      <div className="px-2 pb-2">
        <div className="flex gap-1 justify-between">
          {vendor.topProducts.slice(0, 3).map(product => (
            <div key={product.id} className="relative w-1/3 aspect-square group">
              <img 
                src={product.image} 
                alt="Product" 
                className="w-full h-full object-cover rounded-sm border border-gray-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-sm">
                <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white bg-black bg-opacity-50 px-1 opacity-0 group-hover:opacity-100">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Button */}
      <div className="px-2 pb-2">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-2 rounded-sm transition-colors duration-300">
          Visit Store
        </button>
      </div>
    </div>
  );
};

const TopVendorsCompact = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="w-full bg-gray-50 p-2 sm:p-3 rounded-lg">
      {/* Header with title */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">Top Vendors</h2>
          <div className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-sm">
            HOT
          </div>
        </div>
        
        <button className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center">
          View All <ChevronRight size={14} />
        </button>
      </div>
      
      {/* Categories - horizontal scrollable */}
      <div className="mb-3 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
        <div className="inline-flex gap-1.5">
          {categories.map(category => (
            <button
              key={category}
              className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap transition-colors duration-300 ${
                activeCategory === category 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Scrollable vendors container with navigation arrows */}
      <div className="relative">
        {/* Left scroll button */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1 -ml-1.5"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        
        {/* Vendors container */}
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {vendors.map(vendor => (
            <CompactVendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
        
        {/* Right scroll button */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1 -mr-1.5"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopVendorsCompact;
