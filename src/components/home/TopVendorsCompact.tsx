import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Truck, Tag, Heart, ShoppingCart } from 'lucide-react';

// Sample data with locations
const vendors = [
  {
    id: 1,
    name: "SuperTech Store",
    image: "/api/placeholder/120/120",
    rating: 4.8,
    sales: "10.5k",
    followers: "23.4k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "15%",
    location: "New York",
    topProducts: [
      { id: 101, image: "/api/placeholder/70/70", price: "$19.99", discount: "-10%" },
      { id: 102, image: "/api/placeholder/70/70", price: "$24.50" },
      { id: 103, image: "/api/placeholder/70/70", price: "$15.75" }
    ]
  },
  {
    id: 2,
    name: "EcoFriendly Goods",
    image: "/api/placeholder/120/120",
    rating: 4.9,
    sales: "8.7k",
    followers: "19.2k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    discount: "20%",
    location: "New York",
    topProducts: [
      { id: 201, image: "/api/placeholder/70/70", price: "$12.99" },
      { id: 202, image: "/api/placeholder/70/70", price: "$31.50", discount: "-25%" },
      { id: 203, image: "/api/placeholder/70/70", price: "$22.25" }
    ]
  },
  {
    id: 3,
    name: "Fashion Forward",
    image: "/api/placeholder/120/120",
    rating: 4.7,
    sales: "15.3k",
    followers: "32.1k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    location: "Boston",
    topProducts: [
      { id: 301, image: "/api/placeholder/70/70", price: "$35.99" },
      { id: 302, image: "/api/placeholder/70/70", price: "$18.50", discount: "-15%" },
      { id: 303, image: "/api/placeholder/70/70", price: "$27.75" }
    ]
  },
  {
    id: 4,
    name: "Home Essentials",
    image: "/api/placeholder/120/120",
    rating: 4.6,
    sales: "7.2k",
    followers: "12.5k",
    topSeller: false,
    fastShipping: true,
    verified: true,
    location: "New York",
    topProducts: [
      { id: 401, image: "/api/placeholder/70/70", price: "$42.99", discount: "-5%" },
      { id: 402, image: "/api/placeholder/70/70", price: "$15.75" },
      { id: 403, image: "/api/placeholder/70/70", price: "$29.50" }
    ]
  },
  {
    id: 5,
    name: "Gadget World",
    image: "/api/placeholder/120/120",
    rating: 4.9,
    sales: "20.1k",
    followers: "45.7k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "10%",
    location: "Chicago",
    topProducts: [
      { id: 501, image: "/api/placeholder/70/70", price: "$89.99" },
      { id: 502, image: "/api/placeholder/70/70", price: "$64.50", discount: "-20%" },
      { id: 503, image: "/api/placeholder/70/70", price: "$112.75" }
    ]
  },
  {
    id: 6,
    name: "Beauty Express",
    image: "/api/placeholder/120/120",
    rating: 4.7,
    sales: "12.3k",
    followers: "28.9k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    discount: "25%",
    location: "New York",
    topProducts: [
      { id: 601, image: "/api/placeholder/70/70", price: "$21.99" },
      { id: 602, image: "/api/placeholder/70/70", price: "$18.50", discount: "-30%" },
      { id: 603, image: "/api/placeholder/70/70", price: "$34.75" }
    ]
  },
  {
    id: 7,
    name: "Sports Direct",
    image: "/api/placeholder/120/120",
    rating: 4.5,
    sales: "5.8k",
    followers: "14.2k",
    topSeller: false,
    fastShipping: true,
    verified: false,
    location: "Miami",
    topProducts: [
      { id: 701, image: "/api/placeholder/70/70", price: "$45.99", discount: "-10%" },
      { id: 702, image: "/api/placeholder/70/70", price: "$29.50" },
      { id: 703, image: "/api/placeholder/70/70", price: "$52.75" }
    ]
  },
  {
    id: 8,
    name: "Electronic Hub",
    image: "/api/placeholder/120/120",
    rating: 4.8,
    sales: "18.7k",
    followers: "37.3k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "15%",
    location: "Los Angeles",
    topProducts: [
      { id: 801, image: "/api/placeholder/70/70", price: "$129.99", discount: "-15%" },
      { id: 802, image: "/api/placeholder/70/70", price: "$75.50" },
      { id: 803, image: "/api/placeholder/70/70", price: "$210.75" }
    ]
  }
];

// Badge component for reusability
const Badge = ({ children, color = "gray", className = "" }) => {
  const colorClasses = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    primary: "bg-blue-500 text-white",
  };

  return (
    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
};

// Horizontal curvy vendor card
const HorizontalVendorCard = ({ vendor }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Toggle favorite
  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="flex">
        {/* Vendor image - left side */}
        <div className="relative w-1/3">
          <img 
            src={vendor.image} 
            alt={vendor.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Discount flag if available */}
          {vendor.discount && (
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-br-lg">
              {vendor.discount} OFF
            </div>
          )}
          
          {/* Favorite button */}
          <button 
            onClick={toggleLike}
            className="absolute bottom-1 left-1 bg-white rounded-full p-1 shadow-md transition-all hover:scale-110"
          >
            <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
        
        {/* Vendor info - right side */}
        <div className="w-2/3 p-2 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-xs truncate mr-1">{vendor.name}</h3>
              {vendor.verified && (
                <Tag size={14} className="text-blue-500 fill-blue-50" />
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center mt-1">
              <div className="flex items-center text-yellow-500">
                <Star size={12} className="fill-yellow-500" />
                <span className="text-xs font-medium ml-0.5">{vendor.rating}</span>
              </div>
              <span className="mx-1 text-gray-300">•</span>
              <div className="text-xs text-gray-500">
                {vendor.sales} sales
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex gap-1 mt-1">
            {vendor.topSeller && (
              <Badge color="orange" className="flex items-center text-xs">
                <Award size={10} className="mr-0.5" />TOP
              </Badge>
            )}
            {vendor.fastShipping && (
              <Badge color="green" className="flex items-center text-xs">
                <Truck size={10} className="mr-0.5" />FAST
              </Badge>
            )}
          </div>

          {/* Product thumbnails */}
          <div className="flex gap-1 mt-1">
            {vendor.topProducts.slice(0, 3).map(product => (
              <div key={product.id} className="relative w-8 h-8 group/product">
                <img 
                  src={product.image} 
                  alt="" 
                  className="w-full h-full object-cover rounded-md shadow-sm border border-gray-100" 
                />
                
                {/* Quick add overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/product:bg-opacity-30 flex items-center justify-center opacity-0 group-hover/product:opacity-100 transition-all rounded-md">
                  <button className="bg-white rounded-full p-1 shadow-md hover:bg-blue-500 hover:text-white transition-colors">
                    <ShoppingCart size={8} />
                  </button>
                </div>
                
                {/* Discount tag */}
                {product.discount && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-2xs px-1 rounded-full">
                    {product.discount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit button */}
      <div className="px-2 pb-2 pt-1">
        <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-medium py-1.5 px-2 rounded-full transition-colors">
          Visit Store
        </button>
      </div>
    </div>
  );
};

// Main carousel component
const LocationBasedVendors = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('New York');
  
  // Filter vendors by current location
  const locationVendors = vendors.filter(vendor => vendor.location === currentLocation);

  // Handle scroll events for navigation arrows
  const handleScroll = () => {
    const node = scrollRef.current;
    if (!node) return;
    const { scrollLeft, scrollWidth, clientWidth } = node;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll left or right
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-4">
      {/* Header with location */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Top Vendors in {currentLocation}
          </h2>
          <Badge color="red" className="ml-2">HOT</Badge>
        </div>
        
        {/* Location selector */}
        <div className="relative">
          <select
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="text-xs bg-white border border-purple-200 rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none pr-6"
          >
            {[...new Set(vendors.map(v => v.location))].map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronRight size={14} className="rotate-90 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Vendors carousel */}
      <div className="relative">
        {/* Left scroll button */}
        {showLeft && (
          <button 
            onClick={() => scroll("left")} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 -ml-3 text-purple-500 hover:text-purple-700"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        
        {/* Scrollable container */}
        <div 
          ref={scrollRef} 
          className="overflow-x-auto scroll-smooth px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 pb-2">
            {locationVendors.length > 0 ? (
              locationVendors.map(vendor => (
                <HorizontalVendorCard key={vendor.id} vendor={vendor} />
              ))
            ) : (
              <div className="w-full text-center py-6 text-gray-500">
                No vendors available in {currentLocation}
              </div>
            )}
            <div className="flex-none w-2" /> {/* Right spacing */}
          </div>
        </div>
        
        {/* Right scroll button */}
        {showRight && (
          <button 
            onClick={() => scroll("right")} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 -mr-3 text-purple-500 hover:text-purple-700"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationBasedVendors;