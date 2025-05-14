import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Flame, Truck, Tag, Users, ShoppingCart, CheckCircle, Store, Headphones, Shirt, Home, Smartphone, Droplet, Activity, Heart } from 'lucide-react';

// Sample data with locations and categories (using just one vendor for quick deployment)
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

// Modified horizontal vendor card with squared image and split buttons
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

  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
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
          
          {/* Followers indicator */}
          <div className="absolute bottom-0 left-0 bg-white rounded-full p-1 shadow-md flex items-center">
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

// Main carousel component
const VendorCarousel = () => {
  return (
    <div className="w-full">
      {/* Header with Flame icon and "more" button with Chevron */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Flame size={18} className="text-orange-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Top Vendors</h2>
        </div>
        
        <div className="flex items-center">
          {/* More button with Chevron */}
          <button className="flex items-center text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
            More
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Single vendor card for quick deployment */}
      <div className="flex justify-center">
        <HorizontalVendorCard vendor={vendors[0]} />
      </div>
    </div>
  );
};

export default VendorCarousel;