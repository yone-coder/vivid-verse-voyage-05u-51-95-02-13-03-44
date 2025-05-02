import React, { useState } from "react"; import { Heart, Share, ShoppingCart, Search } from "lucide-react"; import { useScrollProgress } from "./header/useScrollProgress"; import LiveBadge from "./header/LiveBadge"; import SearchBar from "./header/SearchBar"; import BackButton from "./header/BackButton"; import HeaderActionButton from "./header/HeaderActionButton"; import CartButton from "./header/CartButton";

const AliExpressHeader = () => { const [isFavorite, setIsFavorite] = useState(false); const { progress } = useScrollProgress(); const [searchQuery, setSearchQuery] = useState(""); const [activeTab, setActiveTab] = useState("overview");

const toggleFavorite = () => { setIsFavorite(!isFavorite); };

const tabs = [ { id: "overview", label: "Overview" }, { id: "deals", label: "Deals" }, { id: "categories", label: "Categories" }, { id: "brands", label: "Top Brands" }, { id: "recommendations", label: "Recommended" }, { id: "reviews", label: "Reviews" }, ];

return ( <div className="fixed top-0 left-0 right-0 z-30 flex flex-col transition-all duration-700" style={{ boxShadow: 0 ${progress * 4}px ${progress * 8}px rgba(0, 0, 0, ${progress * 0.08}), backgroundColor: rgba(255, 255, 255, ${progress * 0.95}), backdropFilter: blur(${progress * 8}px) }} > {/* Top header row */} <div className="py-2 px-3 w-full"> <div className="flex items-center justify-between max-w-6xl mx-auto"> <div className="flex items-center gap-2 flex-1"> <BackButton progress={progress} /> {progress < 0.5 ? ( <LiveBadge progress={progress} /> ) : ( <SearchBar 
searchQuery={searchQuery} 
setSearchQuery={setSearchQuery} 
progress={progress} 
/> )} </div>

<div className="flex gap-2">
        <HeaderActionButton 
          Icon={Heart} 
          active={isFavorite} 
          onClick={toggleFavorite} 
          progress={progress} 
          activeColor="#f43f5e"
        />
        <HeaderActionButton Icon={Share} progress={progress} />
        <CartButton progress={progress} />
      </div>
    </div>
  </div>

  {/* Tabs navigation */}
  <div
    className="w-full overflow-hidden transition-all duration-700"
    style={{
      maxHeight: progress > 0.3 ? "40px" : "0px",
      opacity: progress,
      backgroundColor: `rgba(255, 255, 255, ${progress * 0.98})`,
      backdropFilter: `blur(${progress * 8}px)`
    }}
  >
    <div className="w-full px-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 relative px-2 py-2 text-xs font-medium whitespace-nowrap text-center transition-all duration-200 ${
              activeTab === tab.id
                ? "text-red-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={{ flexBasis: "25%" }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
</div>

); };

export default AliExpressHeader;

