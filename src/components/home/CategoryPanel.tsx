
import React, { useState, useEffect } from 'react';
import { X, Truck, Percent, Star } from 'lucide-react';

interface CategoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CategoryPanel = ({ isOpen, onClose, activeTab, setActiveTab }: CategoryPanelProps) => {
  const [animatePanel, setAnimatePanel] = useState(false);
  
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'bestseller', label: 'Bestseller' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'home', label: 'Home' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'kids', label: 'Kids' },
    { id: 'sports', label: 'Sports' },
    { id: 'auto', label: 'Auto' },
    { id: 'toys', label: 'Toys' },
    { id: 'pets', label: 'Pets' }
  ];
  
  const deals = [
    { title: 'Flash Deals', icon: <Percent className="w-4 h-4" />, color: 'bg-orange-600' },
    { title: 'Top Sellers', icon: <Star className="w-4 h-4" />, color: 'bg-yellow-600' },
    { title: 'Free Shipping', icon: <Truck className="w-4 h-4" />, color: 'bg-green-600' }
  ];
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimatePanel(true), 10);
      document.addEventListener('click', handleOutsideClick);
    } else {
      setAnimatePanel(false);
      document.removeEventListener('click', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);
  
  const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as Element).closest('.tab-panel')) {
      onClose();
    }
  };
  
  const selectTab = (tab: {id: string, label: string}) => {
    setActiveTab(tab.label);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
             style={{ opacity: animatePanel ? 1 : 0 }}>
          <div 
            className="tab-panel fixed bottom-0 left-0 right-0 bg-gray-50 shadow-xl z-50 transition-all duration-300 ease-in-out rounded-t-xl"
            style={{ 
              transform: animatePanel ? 'translateY(0)' : 'translateY(100%)',
              maxHeight: '75vh',
              overflowY: 'auto'
            }}
          >
            {/* Header with close button */}
            <div className="sticky top-0 flex items-center justify-between p-3 border-b border-gray-200 bg-white rounded-t-xl">
              <h3 className="text-base font-medium text-gray-800">Categories</h3>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 transition-colors rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Special Deals Section */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-white mb-2">
              {deals.map((deal, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center p-2 rounded cursor-pointer"
                >
                  <div className={`${deal.color} text-white p-1 rounded-full mb-1`}>
                    {deal.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{deal.title}</span>
                </div>
              ))}
            </div>
            
            {/* Tabs Grid */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab)}
                  className={`flex flex-col items-center justify-center p-2 rounded transition-all duration-200 ${
                    activeTab === tab.label
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-6 h-6 mb-1 rounded-full ${
                    activeTab === tab.label ? 'bg-red-100' : 'bg-gray-100'
                  }`}></div>
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Super Deals Banner */}
            <div className="p-3 bg-white mt-2">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold">SUPER DEALS</h4>
                    <p className="text-xs opacity-80">Up to 50% OFF</p>
                  </div>
                  <button className="text-xs bg-white text-red-600 py-1 px-2 rounded-full font-medium">
                    View All
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recently Viewed */}
            <div className="p-3 bg-white mt-2 pb-10">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Recently Viewed</h4>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div 
                    key={item} 
                    className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400"
                  >
                    Item
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPanel;
