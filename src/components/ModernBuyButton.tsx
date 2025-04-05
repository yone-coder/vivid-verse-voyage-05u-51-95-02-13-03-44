
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Check, ChevronDown, Star, Info, TrendingUp, Heart, ShieldCheck, ArrowRight, AlertTriangle, Plus, Minus } from 'lucide-react';

const ModernBuyButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Red');
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 20, seconds: 45 });
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(true);
  const [pulseDiscount, setPulseDiscount] = useState(false);
  const [highlightStock, setHighlightStock] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [showFeature, setShowFeature] = useState(0);
  const [shakeButton, setShakeButton] = useState(false);
  const [stockRemaining, setStockRemaining] = useState(4);
  const [basePrice, setBasePrice] = useState(49.99);
  const [priceIncrement, setPriceIncrement] = useState(0);
  const [showPriceIncrease, setShowPriceIncrease] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.seconds === 0) {
      setHighlightStock(true);
      setTimeout(() => setHighlightStock(false), 1000);
    }
  }, [timeLeft.seconds]);

  useEffect(() => {
    const socialProofTimer = setInterval(() => {
      setShowSocialProof(prev => !prev);
    }, 5000);
    
    return () => clearInterval(socialProofTimer);
  }, []);

  useEffect(() => {
    const discountInterval = setInterval(() => {
      setPulseDiscount(true);
      setTimeout(() => setPulseDiscount(false), 1000);
    }, 10000);
    
    return () => clearInterval(discountInterval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setShowFeature(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(featureInterval);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      if (stockRemaining <= 5 && Math.random() > 0.5) {
        const newIncrement = priceIncrement + parseFloat((Math.random() * 2).toFixed(2));
        setPriceIncrement(newIncrement);
        setAnimatePrice(true);
        setShowPriceIncrease(true);
        setTimeout(() => {
          setAnimatePrice(false);
          setTimeout(() => {
            setShowPriceIncrease(false);
          }, 3000);
        }, 1000);
      } else {
        setAnimatePrice(true);
        setTimeout(() => setAnimatePrice(false), 1000);
      }
    }, 15000);
    
    return () => clearInterval(priceInterval);
  }, [priceIncrement, stockRemaining]);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (!isHovering) {
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 800);
      }
    }, 20000);
    
    return () => clearInterval(shakeInterval);
  }, [isHovering]);

  useEffect(() => {
    const stockInterval = setInterval(() => {
      if (Math.random() > 0.7 && stockRemaining > 1) {
        setStockRemaining(prev => prev - 1);
        setHighlightStock(true);
        setTimeout(() => setHighlightStock(false), 1000);
      }
    }, 30000);
    
    return () => clearInterval(stockInterval);
  }, [stockRemaining]);

  const handleBuyNow = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
    }
    
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 1500);
  };

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    setVariantOpen(false);
  };

  const incrementQuantity = () => {
    if (quantity < stockRemaining && quantity < 10) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const variants = ['Red', 'Blue', 'Black', 'Green'];
  const variantColors = {
    'Red': 'bg-red-500',
    'Blue': 'bg-blue-500',
    'Black': 'bg-black',
    'Green': 'bg-green-500'
  };

  const features = [
    { icon: <ShieldCheck size={12} />, text: "Guaranteed quality" },
    { icon: <TrendingUp size={12} />, text: "Trending now" },
    { icon: <Heart size={12} />, text: "Customer favorite" }
  ];

  const stockPercentage = (stockRemaining / 10) * 100;
  
  const currentPrice = (basePrice + priceIncrement).toFixed(2);
  const totalPrice = (parseFloat(currentPrice) * quantity).toFixed(2);
  const discountPercentage = Math.round(((79.99 - parseFloat(currentPrice)) / 79.99) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 font-sans">
      <div 
        className={`absolute -top-10 left-4 bg-white shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2 
                   transition-all duration-500 ${showSocialProof ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{ animation: showSocialProof ? 'none' : 'fadeSlideIn 0.5s ease-out' }}
      >
        <div className="flex -space-x-1 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
          <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white"></div>
        </div>
        <p className="text-xs font-medium text-gray-700">
          {showSocialProof ? 
            <span className="inline-flex items-center">
              <span className="animate-pulse text-red-500 mr-1">•</span>
              15 people bought this recently
            </span> : 
            <span className="inline-flex items-center">
              <span className="animate-pulse text-yellow-500 mr-1">★</span>
              Highly rated product: 4.8/5
            </span>
          }
        </p>
      </div>
      
      {showPriceIncrease && (
        <div className="absolute -top-16 right-4 bg-amber-50 border border-amber-200 shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2"
             style={{ animation: 'slideDown 0.3s ease-out' }}>
          <TrendingUp className="text-amber-500" size={14} />
          <p className="text-xs font-medium text-amber-800">
            Price increased due to high demand!
          </p>
        </div>
      )}
      
      {showAddedAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-ping bg-green-500 p-4 rounded-full">
            <Check className="text-white animate-spin" size={24} />
          </div>
          <div className="absolute text-green-500 font-bold text-lg animate-bounce">
            Added to cart!
          </div>
        </div>
      )}
      
      <div 
        className={`relative bg-white shadow-lg border-t border-gray-200 ${highlightStock ? 'animate-pulse' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setVariantOpen(false);
        }}
      >
        <div className={`bg-red-50 py-0.5 px-3 border-t border-red-100 flex items-center justify-between 
                      ${stockRemaining <= 3 ? 'animate-pulse' : ''}`}>
          <div className="flex items-center">
            <AlertTriangle size={12} className="text-red-500 mr-1" />
            <span className="text-xs font-bold text-red-700">
              {stockRemaining <= 1 ? 'Last one available!' : `Only ${stockRemaining} left in stock!`}
            </span>
          </div>
          <div className="text-xs text-red-600">
            {stockRemaining <= 2 && "Prices may increase!"}
          </div>
        </div>
        
        <div className="h-0.5 w-full bg-gray-200">
          <div 
            className={`h-full ${stockRemaining <= 2 ? 'bg-red-500' : stockRemaining <= 5 ? 'bg-amber-500' : 'bg-green-500'}`}
            style={{ width: `${stockPercentage}%`, transition: 'width 0.5s ease-in-out' }}
          ></div>
        </div>
        
        {isHovering && (
          <div 
            className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-lg"
            style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          >
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            <span className="inline-flex items-center">
              <Clock size={10} className="mr-1 animate-pulse text-red-400" />
              Hurry! Almost gone!
            </span>
          </div>
        )}
        
        {variantOpen && (
          <div 
            className="absolute bottom-full mb-1 left-4 bg-white shadow-xl rounded-lg overflow-hidden w-32"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            {variants.map((variant, index) => (
              <div 
                key={variant}
                className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
                onClick={() => handleVariantChange(variant)}
                style={{ animation: `fadeIn 0.3s ease-out ${index * 0.05}s` }}
              >
                <div className={`w-3 h-3 rounded-full ${variantColors[variant]}`}></div>
                <span className="text-xs">{variant}</span>
                {selectedVariant === variant && 
                  <Check size={12} className="ml-auto text-green-500 animate-pulse" />
                }
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col px-3 py-1.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
                <div 
                  className={`absolute inset-1 rounded ${variantColors[selectedVariant]}`}
                  style={{ animation: isHovering ? 'pulse 2s infinite' : 'none' }}
                ></div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className={`font-bold text-sm ${animatePrice ? 'animate-bounce text-red-500' : ''}`}>
                    ${currentPrice}
                  </span>
                  <span className={`text-xs text-gray-500 line-through ml-1 ${pulseDiscount ? 'animate-pulse' : ''}`}>
                    $79.99
                  </span>
                  <span className={`text-xs text-red-500 ml-1 ${pulseDiscount ? 'animate-ping' : ''}`}>
                    -{discountPercentage}%
                  </span>
                </div>
                
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <Star 
                      key={star} 
                      fill={i < 4 ? "#FFD700" : "none"} 
                      color="#FFD700" 
                      size={8}
                      className={i === showFeature % 5 ? "animate-ping" : ""}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">1.2K</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={`flex items-center text-xs font-medium ${timeLeft.minutes < 30 ? 'text-red-500' : 'text-gray-600'}`}>
                <Clock size={10} className={`mr-1 ${timeLeft.minutes < 30 ? 'animate-pulse' : ''}`} />
                {`${timeLeft.hours}h ${timeLeft.minutes}m`}
              </div>
              <span className={`text-xs text-red-500 font-medium ${highlightStock ? 'animate-bounce' : ''}`}>
                {stockRemaining <= 1 ? 'Last one!' : `Only ${stockRemaining} left!`}
              </span>
              {itemsInCart > 0 && (
                <div 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-md"
                  style={{ animation: 'pulse 1s infinite' }}
                >
                  {itemsInCart}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-0.5 mb-0.5 justify-between">
            <div className="flex items-center text-xs text-gray-600 animate-fadeIn">
              {features[showFeature].icon}
              <span className="ml-1 text-[10px] animate-fadeIn">{features[showFeature].text}</span>
            </div>
            
            <div className="text-xs font-semibold text-red-500 mx-2">
              Total: ${totalPrice}
            </div>
            
            <div className="flex items-center text-xs bg-gray-100 rounded overflow-hidden">
              <button 
                onClick={decrementQuantity} 
                className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
                disabled={quantity <= 1}
              >
                <Minus size={10} />
              </button>
              <span className="px-1 font-medium">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
                disabled={quantity >= stockRemaining || quantity >= 10}
              >
                <Plus size={10} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 justify-between">
            <div 
              className="flex items-center space-x-1 cursor-pointer bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300" 
              onClick={(e) => {
                e.stopPropagation();
                setVariantOpen(!variantOpen);
              }}
            >
              <div className={`w-2 h-2 rounded-full ${variantColors[selectedVariant]}`} />
              <span className="text-xs">{selectedVariant}</span>
              <ChevronDown 
                size={10} 
                className={`transform transition-transform duration-300 ${variantOpen ? 'rotate-180' : ''}`} 
              />
            </div>
            
            <button
              onClick={handleBuyNow}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              className={`bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-1.5 px-4 rounded-lg flex-grow flex items-center justify-center space-x-1 transition-all duration-300 
                         ${buttonHover ? 'shadow-lg scale-105' : 'shadow-md'} 
                         ${shakeButton ? 'animate-shake' : ''}`}
              aria-label="Buy Now"
              style={{ 
                backgroundSize: buttonHover ? '200% 100%' : '100% 100%',
                backgroundPosition: buttonHover ? 'right center' : 'left center'
              }}
            >
              <ShoppingCart size={14} className={buttonHover ? 'animate-bounce' : ''} />
              <span className="text-sm">{buttonHover ? 'Buy Now!' : 'Buy Now'}</span>
              {buttonHover && <ArrowRight size={12} className="ml-1 animate-pulse" />}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 py-0.5 px-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-5 h-3 bg-blue-600 rounded hover:animate-pulse"></div>
              <div className="w-5 h-3 bg-yellow-400 rounded hover:animate-pulse"></div>
              <div className="w-5 h-3 bg-gray-800 rounded hover:animate-pulse"></div>
            </div>
            <span className="text-[10px] text-gray-500">Secure payment</span>
          </div>
          <div className="text-[10px] text-gray-500 flex items-center group transition-all duration-300">
            <Info size={8} className="mr-1 group-hover:animate-spin" />
            <span className="group-hover:font-bold">30-day returns</span>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
          
          @keyframes animate-shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            50% { transform: translateX(3px); }
            75% { transform: translateX(-3px); }
            100% { transform: translateX(0); }
          }
          
          .animate-shake {
            animation: animate-shake 0.4s ease-in-out;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ModernBuyButton;
