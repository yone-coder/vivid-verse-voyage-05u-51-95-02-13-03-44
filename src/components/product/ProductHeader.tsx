import React, { useState } from "react";
import { Heart, Share, ShoppingCart, Search } from "lucide-react";
import { useScrollProgress } from "./header/useScrollProgress";
import LiveBadge from "./header/LiveBadge";
import SearchBar from "./header/SearchBar";
import BackButton from "./header/BackButton";
import HeaderActionButton from "./header/HeaderActionButton";
import CartButton from "./header/CartButton";

const ProductHeader = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { progress } = useScrollProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const tabs = [
    { id: "details", label: "Details" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
    { id: "related", label: "Related" }
  ];

  // Determine if tabs should be shown (when progress > 0.2)
  const showTabs = progress > 0.2;
  
  // Calculate total header height based on whether tabs are shown
  const headerHeight = showTabs ? "88px" : "56px";

  return (
    <>
      {/* Main container with dynamic height */}
      <div 
        className="w-full fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          height: headerHeight,
          backgroundColor: `rgba(255, 255, 255, ${progress * 0.95})`,
          backdropFilter: `blur(${progress * 8}px)`,
          boxShadow: `0 ${progress * 4}px ${progress * 8}px rgba(0, 0, 0, ${progress * 0.1})`
        }}
      >
        {/* Top header section - always visible */}
        <div className="py-2 px-3 h-14">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2 flex-1">
              <BackButton progress={progress} />
              {progress < 0.2 ? (
                <LiveBadge progress={progress} />
              ) : (
                <SearchBar 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                  progress={progress} 
                />
              )}
            </div>

            <div className="flex gap-2">
              <HeaderActionButton 
                Icon={Heart} 
                active={isFavorite} 
                onClick={toggleFavorite} 
                progress={progress} 
                activeColor="#f97316" 
              />

              <HeaderActionButton 
                Icon={Share} 
                progress={progress} 
              />

              <CartButton progress={progress} />
            </div>
          </div>
        </div>
        
        {/* Tabs section - conditionally rendered and positioned */}
        {showTabs && (
          <div className="absolute top-14 left-0 right-0 h-8 border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-3 h-full">
              <div className="flex space-x-6 h-full">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`h-full px-2 text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                      activeTab === tab.id 
                        ? "border-blue-500 text-blue-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Spacer to prevent content from being hidden under the fixed header */}
      <div style={{ height: headerHeight }}></div>
    </>
  );
};

export default ProductHeader;