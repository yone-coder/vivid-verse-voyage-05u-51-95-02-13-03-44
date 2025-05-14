import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Flame, Truck, Tag, Users, ShoppingCart, CheckCircle, Store, Headphones, Shirt, Home, Smartphone, Droplet, Activity } from 'lucide-react';

// Sample data with locations and categories
const vendors = [
  {
    id: 1,
    name: "SuperTech Store",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/windows.svg",
    rating: 4.8,
    sales: "10.5k",
    followers: "23.4k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "15%",
    location: "New York",
    category: "Electronics",
    topProducts: [
      { id: 101, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/headphones.svg", price: "$19.99", discount: "-10%" },
      { id: 102, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/keyboard.svg", price: "$24.50" },
      { id: 103, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/mouse.svg", price: "$15.75" }
    ]
  },
  {
    id: 2,
    name: "EcoFriendly Goods",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/greensock.svg",
    rating: 4.9,
    sales: "8.7k",
    followers: "19.2k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    discount: "20%",
    location: "New York",
    category: "Sustainable",
    topProducts: [
      { id: 201, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/leaf.svg", price: "$12.99" },
      { id: 202, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/bamboo.svg", price: "$31.50", discount: "-25%" },
      { id: 203, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/seeds.svg", price: "$22.25" }
    ]
  },
  {
    id: 3,
    name: "Fashion Forward",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/prada.svg",
    rating: 4.7,
    sales: "15.3k",
    followers: "32.1k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    location: "Boston",
    category: "Fashion",
    topProducts: [
      { id: 301, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nike.svg", price: "$35.99" },
      { id: 302, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/adidas.svg", price: "$18.50", discount: "-15%" },
      { id: 303, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/lacoste.svg", price: "$27.75" }
    ]
  },
  {
    id: 4,
    name: "Home Essentials",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/homeadvisor.svg",
    rating: 4.6,
    sales: "7.2k",
    followers: "12.5k",
    topSeller: false,
    fastShipping: true,
    verified: true,
    location: "New York",
    category: "Home",
    topProducts: [
      { id: 401, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/ikea.svg", price: "$42.99", discount: "-5%" },
      { id: 402, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/lamp.svg", price: "$15.75" },
      { id: 403, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/homeassistant.svg", price: "$29.50" }
    ]
  },
  {
    id: 5,
    name: "Gadget World",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/apple.svg",
    rating: 4.9,
    sales: "20.1k",
    followers: "45.7k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "10%",
    location: "Chicago",
    category: "Electronics",
    topProducts: [
      { id: 501, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/iphone.svg", price: "$89.99" },
      { id: 502, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/samsung.svg", price: "$64.50", discount: "-20%" },
      { id: 503, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/xiaomi.svg", price: "$112.75" }
    ]
  },
  {
    id: 6,
    name: "Beauty Express",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/sephora.svg",
    rating: 4.7,
    sales: "12.3k",
    followers: "28.9k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    discount: "25%",
    location: "New York",
    category: "Beauty",
    topProducts: [
      { id: 601, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nivea.svg", price: "$21.99" },
      { id: 602, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/loreal.svg", price: "$18.50", discount: "-30%" },
      { id: 603, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/avon.svg", price: "$34.75" }
    ]
  },
  {
    id: 7,
    name: "Sports Direct",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/puma.svg",
    rating: 4.5,
    sales: "5.8k",
    followers: "14.2k",
    topSeller: false,
    fastShipping: true,
    verified: false,
    location: "Miami",
    category: "Sports",
    topProducts: [
      { id: 701, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nike.svg", price: "$45.99", discount: "-10%" },
      { id: 702, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/underarmour.svg", price: "$29.50" },
      { id: 703, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/newbalance.svg", price: "$52.75" }
    ]
  },
  {
    id: 8,
    name: "Electronic Hub",
    image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/bestbuy.svg",
    rating: 4.8,
    sales: "18.7k",
    followers: "37.3k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    discount: "15%",
    location: "Los Angeles",
    category: "Electronics",
    topProducts: [
      { id: 801, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/playstation.svg", price: "$129.99", discount: "-15%" },
      { id: 802, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/xbox.svg", price: "$75.50" },
      { id: 803, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nintendo.svg", price: "$210.75" }
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
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    primary: "bg-blue-500 text-white",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
};

// Get category icon
const getCategoryIcon = (category) => {
  switch(category) {
    case "Electronics":
      return <Smartphone size={14} className="mr-1" />;
    case "Sustainable":
      return <Droplet size={14} className="mr-1" />;
    case "Fashion":
      return <Shirt size={14} className="mr-1" />;
    case "Home":
      return <Home size={14} className="mr-1" />;
    case "Beauty":
      return <Droplet size={14} className="mr-1" />;
    case "Sports":
      return <Activity size={14} className="mr-1" />;
    default:
      return <Store size={14} className="mr-1" />;
  }
};

// Horizontal curvy vendor card
const HorizontalVendorCard = ({ vendor }) => {
  // Map categories to colors
  const categoryColors = {
    "Electronics": "blue",
    "Sustainable": "green",
    "Fashion": "pink",
    "Home": "yellow",
    "Beauty": "purple",
    "Sports": "orange",
    "Variety": "gray",
  };

  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="flex">
        {/* Vendor image - left side */}
        <div className="relative w-1/3">
          <img 
            src={vendor.image} 
            alt={vendor.name} 
            className="w-full h-full object-cover p-2"
          />
          
          {/* Discount flag if available */}
          {vendor.discount && (
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-br-lg">
              {vendor.discount} OFF
            </div>
          )}
          
          {/* Followers indicator (replacing heart icon) */}
          <div className="absolute bottom-1 left-1 bg-white rounded-full p-1 shadow-md flex items-center">
            <div className="relative flex -space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </div>
            <span className="text-xs ml-1 font-medium">{vendor.followers}</span>
          </div>
        </div>
        
        {/* Vendor info - right side */}
        <div className="w-2/3 p-2 flex flex-col justify-between">
          {/* Header */}
          <div>
                          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="font-medium text-xs truncate mr-1">{vendor.name}</h3>
                {vendor.verified && (
                  <CheckCircle size={14} className="text-blue-500 fill-blue-50" />
                )}
              </div>
              <div className="text-xs font-bold bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center">
                #{vendor.id}
              </div>
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
          
          {/* Category badge - now expanded to replace others */}
          <div className="flex mt-1">
            <Badge color={categoryColors[vendor.category] || "gray"} className="flex items-center text-xs w-full justify-center">
              {getCategoryIcon(vendor.category)}
              {vendor.category}
            </Badge>
          </div>

          {/* Product thumbnails */}
          <div className="flex gap-1 mt-1">
            {vendor.topProducts.slice(0, 3).map(product => (
              <div key={product.id} className="relative w-8 h-8 group/product">
                <img 
                  src={product.image} 
                  alt="" 
                  className="w-full h-full object-cover rounded-md shadow-sm border border-gray-100 p-1" 
                />
                
                {/* Quick add overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/product:bg-opacity-30 flex items-center justify-center opacity-0 group-hover/product:opacity-100 transition-all rounded-md">
                  <button className="bg-white rounded-full p-1 shadow-md hover:bg-blue-500 hover:text-white transition-colors">
                    <ShoppingCart size={8} />
                  </button>
                </div>
                
                {/* Discount tag */}
                {product.discount && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
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
const VendorCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  
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
    <div className="w-full">
      {/* Header with Flame icon and "more" button with Chevron */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Flame size={18} className="text-orange-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Top Vendors</h2>
        </div>
        
        <div className="flex items-center">
          {/* More button with Chevron instead of Arrow */}
          <button className="flex items-center text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
            More
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Vendors carousel */}
      <div className="relative">
        {/* Left scroll button */}
        {showLeft && (
          <button 
            onClick={() => scroll("left")} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 -ml-3 text-gray-500 hover:text-blue-700"
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
            {vendors.map(vendor => (
              <HorizontalVendorCard key={vendor.id} vendor={vendor} />
            ))}
            <div className="flex-none w-2" /> {/* Right spacing */}
          </div>
        </div>
        
        {/* Right scroll button */}
        {showRight && (
          <button 
            onClick={() => scroll("right")} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 -mr-3 text-gray-500 hover:text-blue-700"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorCarousel;