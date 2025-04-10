
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Award, Users, ShoppingBag, BarChart2, ThumbsUp, Clock, RotateCcw, Camera, MessageSquare, TrendingUp, Image, AlertCircle, Package, RefreshCw, Shield, Truck, Eye, Heart, ShoppingCart, Zap, PieChart, Percent } from 'lucide-react';

const EnhancedRating = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedMetricsTab, setSelectedMetricsTab] = useState('trust');
  
  // Sample data
  const rating = 4.8;
  const reviews = 2543;
  const sold = "5.0k+";
  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ];
  
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
  
  // Urgency Metrics
  const stock = 23; // remaining quantity
  const alertTriggered = true; // low stock alert
  const timerHours = 5; // hours left in offer
  const dropRate = 38; // abandonment percentage
  
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
            size={16} 
            className="text-yellow-400 fill-yellow-400" 
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <Star size={16} className="absolute top-0 right-0 text-yellow-400 fill-gray-200 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            size={16} 
            className="text-yellow-400 fill-gray-200" 
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="w-full">
      {/* Compact rating bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="font-bold text-gray-800">{rating}</span>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="border-r border-gray-300 pr-2">{reviews} Reviews</span>
            <span className="pl-2">{sold} Sold</span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {/* Expanded features */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-200">
          {/* Tabs */}
          <div className="flex mb-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
            <button 
              className={`py-1 px-2 text-sm ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`py-1 px-2 text-sm ${activeTab === 'distribution' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('distribution')}
            >
              Distribution
            </button>
            <button 
              className={`py-1 px-2 text-sm ${activeTab === 'metrics' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('metrics')}
            >
              Metrics
            </button>
            <button 
              className={`py-1 px-2 text-sm ${activeTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
          </div>
          
          {/* Summary tab */}
          {activeTab === 'summary' && (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-2 rounded">
                <div className="flex justify-center">
                  <Award size={16} className="text-indigo-500" />
                </div>
                <div className="font-bold text-lg">{rating}</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="flex justify-center">
                  <Users size={16} className="text-green-500" />
                </div>
                <div className="font-bold text-lg">{reviews}</div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="flex justify-center">
                  <ShoppingBag size={16} className="text-orange-500" />
                </div>
                <div className="font-bold text-lg">{sold}</div>
                <div className="text-xs text-gray-500">Sold</div>
              </div>
            </div>
          )}
          
          {/* Distribution tab */}
          {activeTab === 'distribution' && (
            <div className="space-y-1">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center text-sm">
                  <div className="w-8 text-right pr-2">{item.stars}★</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 pl-2 text-gray-500">{item.percentage}%</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Metrics tab */}
          {activeTab === 'metrics' && (
            <div>
              <div className="flex border-b border-gray-200 text-xs mb-2 overflow-x-auto whitespace-nowrap">
                <button 
                  className={`p-1 ${selectedMetricsTab === 'trust' ? 'text-blue-600 border-b border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setSelectedMetricsTab('trust')}
                >
                  Trust
                </button>
                <button 
                  className={`p-1 ${selectedMetricsTab === 'popularity' ? 'text-blue-600 border-b border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setSelectedMetricsTab('popularity')}
                >
                  Popularity
                </button>
                <button 
                  className={`p-1 ${selectedMetricsTab === 'urgency' ? 'text-blue-600 border-b border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setSelectedMetricsTab('urgency')}
                >
                  Urgency
                </button>
                <button 
                  className={`p-1 ${selectedMetricsTab === 'delivery' ? 'text-blue-600 border-b border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setSelectedMetricsTab('delivery')}
                >
                  Delivery & Trust
                </button>
              </div>
              
              {/* Trust Metrics */}
              {selectedMetricsTab === 'trust' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Award size={14} className="text-yellow-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-bold">{rating}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <MessageSquare size={14} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Reviews</div>
                      <div className="font-bold">{reviews}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Camera size={14} className="text-purple-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Photos</div>
                      <div className="font-bold">{photoReviews}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <ThumbsUp size={14} className="text-green-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                      <div className="font-bold">{satisfaction}%</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Popularity Metrics */}
              {selectedMetricsTab === 'popularity' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <ShoppingBag size={14} className="text-orange-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Sold</div>
                      <div className="font-bold">{sold}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <TrendingUp size={14} className="text-red-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Trending</div>
                      <div className="font-bold">{trending}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <ShoppingCart size={14} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Carts</div>
                      <div className="font-bold">{carts}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Eye size={14} className="text-indigo-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Viewers</div>
                      <div className="font-bold">{viewers}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <RefreshCw size={14} className="text-green-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Repeat</div>
                      <div className="font-bold">{repeatRate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Heart size={14} className="text-pink-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Wished</div>
                      <div className="font-bold">{wished}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded col-span-2">
                    <Zap size={14} className="text-yellow-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Recent</div>
                      <div className="font-bold">{recentPurchases} in last 24h</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Urgency Metrics */}
              {selectedMetricsTab === 'urgency' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Package size={14} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Stock</div>
                      <div className="font-bold">{stock} units</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <AlertCircle size={14} className={`${alertTriggered ? 'text-red-500' : 'text-gray-400'} mr-2`} />
                    <div>
                      <div className="text-xs text-gray-500">Alert</div>
                      <div className={`font-bold ${alertTriggered ? 'text-red-500' : 'text-gray-500'}`}>
                        {alertTriggered ? 'Low Stock!' : 'Not Triggered'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Clock size={14} className="text-orange-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Timer</div>
                      <div className="font-bold">{timerHours}h remaining</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <PieChart size={14} className="text-purple-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Drop</div>
                      <div className="font-bold">{dropRate}%</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Delivery & Trust Metrics */}
              {selectedMetricsTab === 'delivery' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Truck size={14} className="text-green-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">OnTime</div>
                      <div className="font-bold">{onTimeRate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <RotateCcw size={14} className="text-blue-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Returns</div>
                      <div className="font-bold">{returnAcceptance}%</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Percent size={14} className="text-orange-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Refunds</div>
                      <div className="font-bold">{refundTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded">
                    <Shield size={14} className="text-indigo-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Policy</div>
                      <div className="font-bold">{returnWindow} days</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-2 rounded col-span-2">
                    <Award size={14} className="text-yellow-500 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Seller</div>
                      <div className="font-bold">{sellerRating}/5</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Media tab */}
          {activeTab === 'media' && (
            <div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <Camera size={14} className="text-blue-500 mr-1" />
                    <span className="font-bold">{photoReviews}</span>
                  </div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <Image size={14} className="text-purple-500 mr-1" />
                    <span className="font-bold">23</span>
                  </div>
                  <div className="text-xs text-gray-500">Videos</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                  <div key={idx} className="aspect-square bg-gray-200 rounded overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      IMG
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-2 text-xs text-blue-600 text-center">
                <button className="hover:underline">View All Media</button>
              </div>
            </div>
          )}
          
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-xs text-blue-600">
            <button className="hover:underline flex items-center">
              <BarChart2 size={12} className="mr-1" />
              Advanced Stats
            </button>
            <button className="hover:underline">View All Reviews</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedRating;
