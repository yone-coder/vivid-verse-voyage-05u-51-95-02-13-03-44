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

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-30 flex flex-col transition-all duration-300"
      style={{
        boxShadow: progress > 0.1 ? "0 1px 4px rgba(0, 0, 0, 0.1)" : "none"
      }}
    >
      {/* Main Header */}
      <div 
        className="py-2 px-4 w-full transition-all duration-300"
        style={{
          backgroundColor: "white",
          height: "52px"
        }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <BackButton progress={progress} />
            {progress < 0.3 ? (
              <LiveBadge progress={progress} />
            ) : (
              <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                progress={progress} 
              />
            )}
          </div>

          <div className="flex gap-1">
            <HeaderActionButton 
              Icon={Heart} 
              active={isFavorite} 
              onClick={toggleFavorite} 
              progress={progress} 
              activeColor="#ff4646" // AliExpress red
            />

            <HeaderActionButton 
              Icon={Share} 
              progress={progress} 
            />

            <CartButton progress={progress} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div 
        className="w-full transition-all duration-300 overflow-hidden"
        style={{
          height: progress > 0.3 ? '40px' : '0px',
          backgroundColor: "white",
          borderBottom: "1px solid #f2f2f2"
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex-1 py-2 px-1 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "text-red-500 border-t-2 border-red-500" 
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;