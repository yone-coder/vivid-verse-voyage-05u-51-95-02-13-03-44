import React, { useState, useEffect } from 'react';
import { Clock, Tag, Gift, Copy, Zap, ShoppingBag, Calendar, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Coupon {
  id: number;
  code: string;
  discount: string;
  popular?: boolean;
  expiryTime: number | null;
  minSpend: string;
  maxDiscount: string;
  categories: string[];
  storeWide?: boolean;
  newUserOnly?: boolean;
  flash?: boolean;
  expires?: string | null;
}

const AliExpressCoupons = () => {
  const [expandedCoupon, setExpandedCoupon] = useState<number | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timers, setTimers] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [newCouponHighlight, setNewCouponHighlight] = useState<number | null>(null);
  const [showCoupons, setShowCoupons] = useState(false);
  
  const initialCoupons: Coupon[] = [
    { 
      id: 1, 
      code: 'GALAXY10', 
      discount: '10% off', 
      popular: true, 
      expiryTime: 86400, 
      minSpend: '$20',
      maxDiscount: '$30',
      categories: ['Electronics', 'Home Appliances'],
      storeWide: true,
      expires: null
    },
    { 
      id: 2, 
      code: 'NEWUSER5', 
      discount: '$5 off for new users', 
      popular: false, 
      expiryTime: null, 
      minSpend: '$15',
      maxDiscount: '$5',
      categories: ['All categories'],
      storeWide: true,
      newUserOnly: true,
      expires: null
    },
    { 
      id: 3, 
      code: 'FLASH25', 
      discount: '25% off today only', 
      popular: false, 
      expiryTime: 16980, 
      minSpend: '$50',
      maxDiscount: '$100',
      categories: ['Fashion', 'Accessories'],
      storeWide: false,
      flash: true,
      expires: null
    }
  ];
  
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const toggleCouponsVisibility = () => {
    setShowCoupons(!showCoupons);
  };
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 600);
    
    setTimeout(() => {
      setNewCouponHighlight(3);
      setTimeout(() => setNewCouponHighlight(null), 3000);
    }, 3000);
  }, []);
  
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return null;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };
  
  useEffect(() => {
    const newTimers: Record<number, number> = {};
    coupons.forEach(coupon => {
      if (coupon.expiryTime !== null) {
        newTimers[coupon.id] = coupon.expiryTime;
      }
    });
    setTimers(newTimers);
    
    const timerInterval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = {...prevTimers};
        let needsUpdate = false;
        
        Object.keys(updatedTimers).forEach(id => {
          const numId = Number(id);
          if (updatedTimers[numId] > 0) {
            updatedTimers[numId] -= 1;
            needsUpdate = true;
          }
        });
        
        return needsUpdate ? updatedTimers : prevTimers;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);
  
  useEffect(() => {
    setCoupons(prevCoupons => 
      prevCoupons.map(coupon => ({
        ...coupon,
        expires: coupon.expiryTime !== null ? formatTime(timers[coupon.id]) : null
      }))
    );
  }, [timers]);

  const toggleCoupon = (id: number) => {
    if (expandedCoupon === id) {
      setExpandedCoupon(null);
    } else {
      setExpandedCoupon(id);
    }
  };

  const applyCoupon = (id: number, code: string) => {
    setAppliedCoupon(id);
    console.log(`Applied coupon: ${code}`);
  };

  const dismissCoupon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Dismissed coupon: ${id}`);
  };
  
  const copyCouponCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const shimmerClass = "animate-pulse bg-gray-200 rounded h-full";

  if (!isLoaded) {
    return (
      <div className="w-full bg-white">
        <div className="flex items-center justify-between bg-gray-50 px-3 py-3">
          <div className={`${shimmerClass} w-32 h-6`}></div>
          <div className={`${shimmerClass} w-16 h-4`}></div>
        </div>
        
        <div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-3 py-4">
              <div className="flex items-center">
                <div className={`${shimmerClass} w-8 h-8 mr-3`}></div>
                <div className="flex-1">
                  <div className={`${shimmerClass} w-3/4 h-5 mb-2`}></div>
                  <div className={`${shimmerClass} w-1/2 h-3`}></div>
                </div>
                <div className={`${shimmerClass} w-6 h-6 ml-2`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-3 py-3 text-gray-800">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-orange-500 animate-bounce" />
          <span className="font-medium">Available Coupons</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full animate-pulse">
            {coupons.length} Active
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs text-blue-600"
            onClick={toggleCouponsVisibility}
          >
            {showCoupons ? "Hide Coupons" : "Show All Coupons"}
          </Button>
        </div>
      </div>
      
      {!showCoupons && coupons.length > 0 && (
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-orange-500" />
            <div>
              <div className="font-medium text-gray-800">{coupons[0].discount}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                <span className="font-mono">{coupons[0].code}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2"
              onClick={(e) => {e.stopPropagation(); applyCoupon(coupons[0].id, coupons[0].code)}}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
      
      <div className={`transition-all duration-300 ${showCoupons ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div>
          {coupons.map((coupon, index) => (
            <div 
              key={coupon.id} 
              className={`border-b border-gray-100 last:border-b-0 transition-all duration-300 
                ${newCouponHighlight === coupon.id ? 'bg-yellow-50' : ''}
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className={`px-1 py-3 cursor-pointer hover:bg-gray-50 transition-colors relative
                  ${appliedCoupon === coupon.id ? 'bg-green-50' : ''}
                  ${expandedCoupon === coupon.id ? 'shadow-inner' : ''}
                `}
                onClick={() => toggleCoupon(coupon.id)}
              >
                <div className="flex items-start justify-between pr-1">
                  <div className="flex items-start min-w-0 flex-1">
                    <div className={`ml-1 mr-3 transition-all duration-300 ${
                      coupon.flash 
                        ? 'text-red-500 animate-pulse' 
                        : coupon.newUserOnly 
                          ? 'text-purple-500' 
                          : 'text-orange-500'
                      } ${expandedCoupon === coupon.id ? 'transform rotate-12' : ''}`}
                    >
                      {coupon.flash ? <Zap size={20} /> : <Gift size={20} className="transform hover:rotate-12 transition-transform" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800">{coupon.discount}</div>
                      <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap items-center">
                        <span className="font-mono">{coupon.code}</span>
                        {coupon.minSpend && <span className="ml-2">Min: {coupon.minSpend}</span>}
                        {coupon.expires && (
                          <span className="ml-2 flex items-center text-amber-600">
                            <Clock size={12} className="mr-1" />
                            <span className={timers[coupon.id] < 300 ? "animate-pulse font-semibold" : ""}>
                              {coupon.expires}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {appliedCoupon === coupon.id && (
                      <span className="text-xs text-green-600 flex items-center absolute right-24 top-1/2 -translate-y-1/2">
                        <Check size={14} className="mr-1" />
                      </span>
                    )}
                    <span className={`text-xs text-blue-600 hover:text-blue-800 transition-colors ${expandedCoupon === coupon.id ? 'font-semibold' : ''}`}>
                      {expandedCoupon === coupon.id ? 'Hide details' : 'See details'}
                    </span>
                  </div>
                </div>
                
                {(coupon.popular || coupon.flash || coupon.newUserOnly) && (
                  <div className="absolute top-0 right-24 transform -translate-y-1/2">
                    {coupon.popular && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs animate-pulse">
                        Popular
                      </span>
                    )}
                    {coupon.newUserOnly && (
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                        New User
                      </span>
                    )}
                    {coupon.flash && (
                      <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs flex items-center">
                        <Zap size={10} className="mr-0.5 animate-pulse" />
                        Limited Time
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {expandedCoupon === coupon.id && (
                <div 
                  className="px-3 py-3 bg-gray-50 text-sm border-t border-gray-100 animate-slideDown overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center text-gray-600 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                      <ShoppingBag size={14} className="mr-2 text-gray-400" />
                      <span>Min. Spend: {coupon.minSpend}</span>
                    </div>
                    <div className="flex items-center text-gray-600 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                      <Gift size={14} className="mr-2 text-gray-400" />
                      <span>Max. Discount: {coupon.maxDiscount}</span>
                    </div>
                    <div className="flex items-center text-gray-600 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      <span>Valid until: Apr 30, 2025</span>
                    </div>
                    {coupon.expires && (
                      <div className="flex items-center text-amber-600 font-medium animate-fadeIn" style={{ animationDelay: '400ms' }}>
                        <Clock size={14} className="mr-2 text-amber-500" />
                        <span className={timers[coupon.id] < 300 ? "animate-pulse" : ""}>
                          Expires in: {coupon.expires}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {coupon.categories && coupon.categories.length > 0 && (
                    <div className="mb-3 animate-fadeIn" style={{ animationDelay: '500ms' }}>
                      <div className="text-xs text-gray-500 mb-1">Valid Categories:</div>
                      <div className="flex flex-wrap gap-1">
                        {coupon.categories.map((category, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-white px-2 py-1 rounded border border-gray-200 transition-all hover:bg-gray-50 hover:border-gray-300"
                            style={{ animationDelay: `${600 + idx * 100}ms` }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {coupon.newUserOnly && (
                    <div className="mb-3 text-xs text-purple-600 bg-purple-50 p-2 rounded animate-fadeIn" style={{ animationDelay: '700ms' }}>
                      This coupon is available for new users only
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 animate-fadeIn" style={{ animationDelay: '800ms' }}>
                    <button
                      onClick={(e) => copyCouponCode(e, coupon.code)}
                      className="text-xs flex items-center text-gray-600 hover:text-gray-800 py-1 px-2 border border-gray-200 rounded bg-white transition-all hover:shadow-sm"
                    >
                      <Copy size={12} className="mr-1" />
                      {copiedCode === coupon.code ? (
                        <span className="text-green-600 animate-fadeIn">Copied!</span>
                      ) : (
                        "Copy Code"
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => {e.stopPropagation(); applyCoupon(coupon.id, coupon.code)}}
                      className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors hover:shadow-md transform hover:scale-105 active:scale-95"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default AliExpressCoupons;
