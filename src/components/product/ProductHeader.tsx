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
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "description", label: "Description" },
  { id: "reviews", label: "Reviews (248)" },
  { id: "qna", label: "Q&A (56)" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "related", label: "Related" }
];
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-30 flex flex-col transition-all duration-700"
      style={{
        boxShadow: `0 ${progress * 4}px ${progress * 8}px rgba(0, 0, 0, ${progress * 0.08})`
      }}
    >
      {/* Main Header */}
      <div 
        className="py-2 px-3 w-full transition-all duration-700"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${progress * 0.95})`,
          backdropFilter: `blur(${progress * 8}px)`,
        }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <BackButton progress={progress} />
            {progress < 0.5 ? (
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
              activeColor="#f43f5e" // Changed to more vibrant red
            />

            <HeaderActionButton 
              Icon={Share} 
              progress={progress} 
            />

            <CartButton progress={progress} />
          </div>
        </div>
      </div>

      {/* AliExpress-style Tabs Navigation */}
     <div 
  className="w-full transition-all duration-700 overflow-hidden"
  style={{
    maxHeight: progress > 0.3 ? '40px' : '0px',
    opacity: progress,
    backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
    backdropFilter: `blur(${progress * 8}px)`,
  }}
>
  <div className="w-full px-4 overflow-x-auto no-scrollbar">
    <div className="flex space-x-4 items-center">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`relative px-4 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
            activeTab === tab.id 
              ? "text-red-500" 
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"
              style={{
                marginBottom: 0, 
                paddingBottom: 0 // Ensures flush positioning
              }}
            ></div>
          )}
        </button>
      ))}
    </div>
  </div>
</div>
    </div>
  );
};

export default ProductHeader;