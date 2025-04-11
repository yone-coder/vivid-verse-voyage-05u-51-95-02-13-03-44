
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Award, Users, ShoppingBag, BarChart2, ThumbsUp, Clock, 
  RotateCcw, Camera, MessageSquare, TrendingUp, Image, AlertCircle, Package, RefreshCw, 
  Shield, Truck, Eye, Heart, ShoppingCart, Zap, PieChart, Percent } from 'lucide-react';

const EnhancedRating = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('rating');
  
  // Sample data
  const rating = 4.8;
  const reviews = 2543;
  const sold = "5.0k+";
  const stockRemaining = 23;
  
  // Trust Metrics
  const photoReviews = 187;
  const satisfaction = 96; // percentage
  
  // Popularity Metrics
  const trending = 325; // units sold in last 30 days
  const carts = 42; // active carts with product
  const viewers = 18; // users currently viewing
  const repeatRate = 27; // percentage
  const wished = 1243; // times added to wishlist
  const recentPurchases = 8; // purchases in last 24h
  
  // Delivery & Trust Metrics
  const onTimeRate = 98; // percentage
  const returnAcceptance = 100; // percentage
  const refundTime = "2d"; // average refund processing time
  const returnWindow = 30; // days
  const sellerRating = 4.9; // out of 5
  
  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star 
            key={i} 
            size={14} 
            className="text-yellow-400 fill-yellow-400" 
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <Star size={14} className="absolute top-0 right-0 text-yellow-400 fill-gray-200 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            size={14} 
            className="text-yellow-400 fill-gray-200" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="w-full px-0">
      {/* Compact rating bar - better alignment with vertical content */}
      <div 
        className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 rounded-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="font-bold text-gray-800">{rating}</span>
          <div className="flex items-center text-gray-500 text-xs">
            <span className="border-r border-gray-300 pr-2">{reviews} Reviews</span>
            <span className="pl-2">{sold} Sold</span>
          </div>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 flex items-center justify-center w-6 h-6"
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {/* Expanded features */}
      {isExpanded && (
        <div className="pt-1 border-t border-gray-200">
          {/* Tabs */}
          <div className="flex mb-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
            <button 
              className={`py-1 px-2 text-xs ${activeTab === 'rating' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('rating')}
            >
              Rating
            </button>
            <button 
              className={`py-1 px-2 text-xs ${activeTab === 'sold' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('sold')}
            >
              Sold
            </button>
            <button 
              className={`py-1 px-2 text-xs ${activeTab === 'stock' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('stock')}
            >
              Stock
            </button>
            <button 
              className={`py-1 px-2 text-xs ${activeTab === 'trust' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('trust')}
            >
              Trust
            </button>
            <button 
              className={`py-1 px-2 text-xs ${activeTab === 'engagement' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('engagement')}
            >
              Engagement
            </button>
          </div>
          
          {/* 1. Rating tab */}
          {activeTab === 'rating' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Award size={14} className="text-yellow-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="font-bold text-sm truncate">{rating}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <MessageSquare size={14} className="text-blue-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Reviews</div>
                  <div className="font-bold text-sm truncate">{reviews}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Camera size={14} className="text-purple-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Photos</div>
                  <div className="font-bold text-sm truncate">{photoReviews}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <ThumbsUp size={14} className="text-green-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Positive</div>
                  <div className="font-bold text-sm truncate">{satisfaction}%</div>
                </div>
              </div>
            </div>
          )}
          
          {/* 2. Sold tab */}
          {activeTab === 'sold' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <ShoppingBag size={14} className="text-orange-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Sold</div>
                  <div className="font-bold text-sm truncate">{sold}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <TrendingUp size={14} className="text-red-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Trending</div>
                  <div className="font-bold text-sm truncate">{trending}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <RefreshCw size={14} className="text-green-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Repeat</div>
                  <div className="font-bold text-sm truncate">{repeatRate}%</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Zap size={14} className="text-yellow-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Recent</div>
                  <div className="font-bold text-sm truncate">{recentPurchases} today</div>
                </div>
              </div>
            </div>
          )}
          
          {/* 3. Stock tab */}
          {activeTab === 'stock' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Package size={14} className="text-blue-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Stock</div>
                  <div className="font-bold text-sm truncate">{stockRemaining} units</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <AlertCircle size={14} className="text-red-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Alert</div>
                  <div className="font-bold text-sm truncate text-red-500">
                    {stockRemaining <= 30 ? 'Low Stock!' : 'In Stock'}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded col-span-2">
                <Clock size={14} className="text-orange-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Timer</div>
                  <div className="font-bold text-sm truncate">Special price ends in 12:35:47</div>
                </div>
              </div>
            </div>
          )}
          
          {/* 4. Trust tab */}
          {activeTab === 'trust' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Truck size={14} className="text-green-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">OnTime</div>
                  <div className="font-bold text-sm truncate">{onTimeRate}%</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <RotateCcw size={14} className="text-blue-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Returns</div>
                  <div className="font-bold text-sm truncate">{returnAcceptance}%</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Percent size={14} className="text-orange-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Refunds</div>
                  <div className="font-bold text-sm truncate">{refundTime}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Shield size={14} className="text-indigo-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Policy</div>
                  <div className="font-bold text-sm truncate">{returnWindow} days</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded col-span-2">
                <Award size={14} className="text-yellow-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Seller</div>
                  <div className="font-bold text-sm truncate">{sellerRating}/5 Rated</div>
                </div>
              </div>
            </div>
          )}
          
          {/* 5. Engagement tab */}
          {activeTab === 'engagement' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Eye size={14} className="text-indigo-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Viewers</div>
                  <div className="font-bold text-sm truncate">{viewers} now</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <ShoppingCart size={14} className="text-blue-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Carts</div>
                  <div className="font-bold text-sm truncate">{carts} active</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <Heart size={14} className="text-pink-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Wished</div>
                  <div className="font-bold text-sm truncate">{wished}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-2 rounded">
                <BarChart2 size={14} className="text-purple-500 mr-2 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">Views</div>
                  <div className="font-bold text-sm truncate">1,435 total</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedRating;
