
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Flame, Truck, Tag, Users, ShoppingCart, CheckCircle, Store, Headphones, Shirt, Home, Smartphone, Droplet, Activity, Heart, ArrowRight } from 'lucide-react';

// Sample data with locations and categories (expanded top products)
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
{ id: 103, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/mouse.svg", price: "$15.75" },
{ id: 104, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/monitor.svg", price: "$129.99", discount: "-20%" },
{ id: 105, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/apple.svg", price: "$49.99" },
{ id: 106, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/arduino.svg", price: "$35.99" }
]
},
{
id: 2,
name: "Fashion Trends",
image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/hm.svg",
rating: 4.7,
sales: "8.3k",
followers: "15.7k",
topSeller: true,
fastShipping: true,
verified: true,
discount: "20%",
location: "Paris",
category: "Fashion",
topProducts: [
{ id: 201, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/puma.svg", price: "$49.99", discount: "-15%" },
{ id: 202, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nike.svg", price: "$89.50" },
{ id: 203, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/adidas.svg", price: "$75.25" },
{ id: 204, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/uniqlo.svg", price: "$29.99", discount: "-10%" }
]
},
{
id: 3,
name: "EcoLife Home",
image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/ikea.svg",
rating: 4.6,
sales: "7.2k",
followers: "12.3k",
topSeller: false,
fastShipping: true,
verified: true,
location: "Stockholm",
category: "Home",
topProducts: [
{ id: 301, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/homeassistant.svg", price: "$129.99", discount: "-10%" },
{ id: 302, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/lighting.svg", price: "$59.50" },
{ id: 303, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/airbnb.svg", price: "$89.75" },
{ id: 304, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/instacart.svg", price: "$45.99", discount: "-5%" }
]
},
{
id: 4,
name: "Beauty & Care",
image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/sephora.svg",
rating: 4.9,
sales: "12.8k",
followers: "27.5k",
topSeller: true,
fastShipping: true,
verified: true,
discount: "10%",
location: "Seoul",
category: "Beauty",
topProducts: [
{ id: 401, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/nivea.svg", price: "$24.99", discount: "-20%" },
{ id: 402, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/lush.svg", price: "$35.50" },
{ id: 403, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/loreal.svg", price: "$42.75" },
{ id: 404, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/avon.svg", price: "$18.99", discount: "-15%" }
]
},
{
id: 5,
name: "Sports Outlet",
image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/underarmour.svg",
rating: 4.5,
sales: "9.1k",
followers: "14.2k",
topSeller: false,
fastShipping: true,
verified: true,
discount: "25%",
location: "Berlin",
category: "Sports",
topProducts: [
{ id: 501, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/reebok.svg", price: "$59.99", discount: "-30%" },
{ id: 502, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/newbalance.svg", price: "$89.50" },
{ id: 503, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/asics.svg", price: "$75.25" },
{ id: 504, image: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/columbia.svg", price: "$119.99", discount: "-15%" }
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

// Enhanced horizontal vendor card with exactly four products
const HorizontalVendorCard = ({ vendor }) => {
  const [isFollowing, setIsFollowing] = useState(false);

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

  // Always display exactly the first 4 products
  const displayProducts = vendor.topProducts.slice(0, 4);

  return (
    <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start p-2">
        {/* Vendor image - truly square 1:1 ratio */}
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 flex items-center justify-center">
            <img   
              src={vendor.image}   
              alt={vendor.name}   
              className="w-12 h-12 object-contain rounded-md"  
            />
          </div>

          {/* Discount flag if available */}  
          {vendor.discount && (  
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-br-lg">  
              {vendor.discount}  
            </div>  
          )}  

          {/* Followers indicator - moved lower */}  
          <div className="absolute -bottom-2 left-0 bg-white rounded-full p-1 shadow-md flex items-center">  
            <div className="relative flex -space-x-1">  
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>  
              <div className="w-2 h-2 rounded-full bg-green-500"></div>  
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>  
            </div>  
            <span className="text-xs ml-1 font-medium">{vendor.followers}</span>  
          </div>  
        </div>  

        {/* Vendor info - right side */}  
        <div className="flex-1 pl-3 flex flex-col justify-between">  
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
        </div>  
      </div>  

      {/* Products grid section - without heading */}  
      <div className="px-2 pt-1 pb-2">  
        {/* Product grid with exactly 4 products */}  
        <div className="grid grid-cols-4 gap-1">  
          {displayProducts.map(product => (  
            <div key={product.id} className="relative group/product">  
              <div className="aspect-square rounded-md border border-gray-100 bg-gray-50 p-1 flex items-center justify-center">  
                <img   
                  src={product.image}   
                  alt=""   
                  className="w-full h-full object-contain"   
                />  
              </div>  

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

              {/* Price tag - small and subtle */}  
              <div className="absolute -bottom-1 right-0 bg-white text-gray-800 text-xs px-1 rounded shadow-sm border border-gray-100">  
                {product.price}  
              </div>  
            </div>  
          ))}  
        </div>  
      </div>  

      {/* Split buttons: Visit Store and Follow */}  
      <div className="px-2 pb-2 pt-1 grid grid-cols-2 gap-2">  
        <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-medium py-1.5 px-2 rounded-full transition-colors">  
          Visit Store  
        </button>  
        <button   
          className={`flex items-center justify-center text-xs font-medium py-1.5 px-2 rounded-full transition-colors ${  
            isFollowing   
              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"   
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"  
          }`}  
          onClick={() => setIsFollowing(!isFollowing)}  
        >  
          <Heart size={12} className={`mr-1 ${isFollowing ? "fill-gray-800" : ""}`} />  
          {isFollowing ? "Following" : "Follow"}  
        </button>  
      </div>  
    </div>
  );
};

// Custom hook to detect if mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile;
};

// Improved edge-to-edge Vendor Carousel component
const VendorCarousel = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Calculate card widths
  const cardWidth = isMobile ? "66%" : "33.333%"; // 66% for 1.5 cards on mobile, 33.333% for 3 cards on desktop
  
  // Hide scrollbar for all browsers
  useEffect(() => {
    if (scrollContainerRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        #vendor-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);
  
  // Handle scroll navigation
  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
        setActiveIndex(index);
      }
    }
  };
  
  // Update active index on scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidthPx = container.offsetWidth * (isMobile ? 0.66 : 0.33333);
      const newIndex = Math.round(scrollPosition / cardWidthPx);
      setActiveIndex(newIndex);
    }
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  return (
    <div className="w-full relative">
      {/* Updated header to match FlashDeals style */}
      <div className="px-2 py-2">
        <div className="flex items-center justify-between mb-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 px-2 py-1 -mx-2">
          {/* First element (Top Vendors) - now on the far left */}
          <div className="flex items-center gap-1 text-white text-xs font-bold uppercase tracking-wide">
            <Store className="w-4 h-4" />
            TOP VENDORS
          </div>
          
          {/* Middle element (Verified count) */}
          <div className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-0.5 rounded-full backdrop-blur-sm">
            <Users className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">5K+ Vendors</span>
          </div>
          
          {/* Last element (View All) - now on the far right */}
          <a
            href="/vendors"
            className="text-xs text-white hover:underline flex items-center font-medium"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
          </a>
        </div>

        {/* Custom scroll container with edge-to-edge scrolling */}
        <div className="relative w-full">
          <div 
            id="vendor-scroll-container"
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none", 
              msOverflowStyle: "none"
            }}
          >
            {/* Left spacer to create padding effect while maintaining edge scrolling */}
            <div style={{ flex: "0 0 16px" }} className="flex-shrink-0"></div>
            
            {vendors.map((vendor, index) => (
              <div 
                key={vendor.id}
                style={{ 
                  flex: `0 0 ${cardWidth}`,
                  scrollSnapAlign: "start"
                }}
                className="px-2"
              >
                <HorizontalVendorCard vendor={vendor} />
              </div>
            ))}
            
            {/* Right spacer to create padding effect while maintaining edge scrolling */}
            <div style={{ flex: "0 0 16px" }} className="flex-shrink-0"></div>
          </div>
        </div>
        
        {/* Custom navigation buttons */}
        <div className="flex justify-center mt-2 gap-2 px-4 pb-2">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Dots indicator */}
          <div className="flex items-center gap-1">
            {vendors.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex 
                    ? "bg-blue-500 w-4" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => scrollToCard(Math.min(vendors.length - 1, activeIndex + 1))}
            disabled={activeIndex === vendors.length - 1}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCarousel;
