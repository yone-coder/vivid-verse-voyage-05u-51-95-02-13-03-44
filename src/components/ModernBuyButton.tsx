import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Check, ChevronDown, Star, Info, TrendingUp, Heart, ShieldCheck, ArrowRight, AlertTriangle, Plus, Minus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ModernBuyButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Red');
  const [timeLeft, setTimeLeft] = useState({ minutes: 3, seconds: 20, milliseconds: 0 });
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(true);
  const [pulseDiscount, setPulseDiscount] = useState(false);
  const [highlightStock, setHighlightStock] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [showFeature, setShowFeature] = useState(0);
  const [shakeButton, setShakeButton] = useState(false);
  const [stockRemaining, setStockRemaining] = useState(100);
  const [basePrice, setBasePrice] = useState(49.99);
  const [priceIncrement, setPriceIncrement] = useState(0);
  const [showPriceIncrease, setShowPriceIncrease] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stockProgressAnimation, setStockProgressAnimation] = useState(false);
  const [heartCount, setHeartCount] = useState(432);
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newMilliseconds = prev.milliseconds - 10;
        
        if (newMilliseconds < 0) {
          const newSeconds = prev.seconds - 1;
          
          if (newSeconds < 0) {
            const newMinutes = prev.minutes - 1;
            
            if (newMinutes < 0) {
              clearInterval(timer);
              return { minutes: 0, seconds: 0, milliseconds: 0 };
            }
            
            return { minutes: newMinutes, seconds: 59, milliseconds: 990 };
          }
          
          return { ...prev, seconds: newSeconds, milliseconds: 990 };
        }
        
        return { ...prev, milliseconds: newMilliseconds };
      });
    }, 10);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.seconds === 0 && timeLeft.milliseconds === 0) {
      setHighlightStock(true);
      setTimeout(() => setHighlightStock(false), 1000);
    }
  }, [timeLeft.seconds, timeLeft.milliseconds]);

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
      if (stockRemaining <= 70 && Math.random() > 0.5) {
        const increaseFactor = (100 - stockRemaining) / 100;
        const newIncrement = priceIncrement + parseFloat((Math.random() * 2 * increaseFactor).toFixed(2));
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
      if (Math.random() > 0.6 && stockRemaining > 1) {
        const reduction = Math.floor(Math.random() * 3) + 1;
        setStockRemaining(prev => Math.max(1, prev - reduction));
        
        setStockProgressAnimation(true);
        setTimeout(() => setStockProgressAnimation(false), 1000);
        
        setHighlightStock(true);
        setTimeout(() => setHighlightStock(false), 1000);
        
        if (stockRemaining < 50) {
          const priceIncrease = parseFloat((Math.random() * 0.5).toFixed(2));
          setPriceIncrement(prev => prev + priceIncrease);
          setAnimatePrice(true);
          setTimeout(() => setAnimatePrice(false), 1000);
        }
      }
    }, 10000);
    
    return () => clearInterval(stockInterval);
  }, [stockRemaining]);

  const handleBuyNow = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
      setStockProgressAnimation(true);
      setTimeout(() => setStockProgressAnimation(false), 1000);
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

  const toggleHeart = () => {
    if (isHearted) {
      setHeartCount(prev => prev - 1);
    } else {
      setHeartCount(prev => prev + 1);
      setButtonHover(true);
      setTimeout(() => setButtonHover(false), 300);
    }
    setIsHearted(!isHearted);
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

  const stockPercentage = (stockRemaining / 100) * 100;
  
  const currentPrice = (basePrice + priceIncrement).toFixed(2);
  const totalPrice = (parseFloat(currentPrice) * quantity).toFixed(2);
  const discountPercentage = Math.round(((79.99 - parseFloat(currentPrice)) / 79.99) * 100);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const formatMilliseconds = (ms) => {
    return Math.floor(ms / 10).toString().padStart(2, '0');
  };

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
        className="relative bg-white shadow-lg border-t border-gray-200"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setVariantOpen(false);
        }}
      >
        <div className="bg-red-50 py-0.5 px-3 border-t border-red-100 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={12} className="text-red-500 mr-1" />
            <span className="text-xs font-bold text-red-700">
              {stockRemaining <= 1 ? 'Last one available!' : `Only ${stockRemaining} left in stock!`}
            </span>
          </div>
          <div className="text-xs text-red-600">
            {stockRemaining <= 20 && "Prices may increase!"}
          </div>
        </div>
        
        <div className="h-0.5 w-full bg-gray-200">
          <div 
            className={`h-full ${stockRemaining <= 10 ? 'bg-red-500' : stockRemaining <= 30 ? 'bg-amber-500' : 'bg-green-500'} 
                      ${stockProgressAnimation ? 'animate-pulse' : ''}`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
        
        {isHovering && (
          <div 
            className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-lg"
            style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          >
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            <span className="inline-flex items-center">
              Hurry! Almost gone!
            </span>
          </div>
        )}
        
        {variantOpen && (
          <div 
            className="absolute bottom-full mb-1 left-4 bg-white shadow-xl rounded-lg overflow-hidden w-32 z-10"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            {variants.map((variant, index) => (
              <div 
                key={variant}
                className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
                onClick={() => handleVariantChange(variant)}
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
        
        <div className="flex flex-col px-3 py-1.5 bg-white">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
                <div 
                  className={`absolute inset-1 rounded ${variantColors[selectedVariant]}`}
                ></div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className={`font-bold text-sm ${animatePrice ? 'text-red-500' : ''}`}>
                    ${currentPrice}
                  </span>
                  <span className="text-xs text-gray-500 line-through ml-1">
                    $79.99
                  </span>
                  <span className="text-xs text-red-500 ml-1">
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
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">1.2K</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={toggleHeart}
              className="flex flex-col items-center justify-center mr-2"
            >
              <Heart 
                className={`transition-all duration-300 ${isHearted ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400'}`}
                size={16}
              />
              <span className="text-xs text-gray-500 mt-0.5">{heartCount}</span>
            </button>
            
            <div className="relative">
              <div className="flex items-center space-x-1">
                <div className="countdown-container">
                  <div className="countdown-unit">
                    <div className="countdown-value">{formatTime(timeLeft.minutes)}</div>
                    <div className="countdown-label">min</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-value">{formatTime(timeLeft.seconds)}</div>
                    <div className="countdown-label">sec</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-value milliseconds">{formatMilliseconds(timeLeft.milliseconds)}</div>
                    <div className="countdown-label">mil</div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-red-500 font-medium mt-0.5 block">
                {stockRemaining <= 1 ? 'Last one!' : `Only ${stockRemaining} left!`}
              </span>
              {itemsInCart > 0 && (
                <div 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-md"
                >
                  {itemsInCart}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-0.5 mb-0.5 justify-between">
            <div className="flex items-center text-xs text-gray-600">
              {features[showFeature].icon}
              <span className="ml-1 text-[10px]">{features[showFeature].text}</span>
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
                         ${buttonHover ? 'shadow-lg scale-105' : 'shadow-md'}`}
              aria-label="Buy Now"
              style={{ 
                backgroundSize: buttonHover ? '200% 100%' : '100% 100%',
                backgroundPosition: buttonHover ? 'right center' : 'left center'
              }}
            >
              <ShoppingCart size={14} />
              <span className="text-sm">{buttonHover ? 'Buy Now!' : 'Buy Now'}</span>
              {buttonHover && <ArrowRight size={12} className="ml-1" />}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 py-0.5 px-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {/* Visa Card */}
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <img 
                  src="/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png" 
                  alt="Visa" 
                  className="h-3 w-5 object-contain"
                />
              </div>
              {/* Mastercard */}
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10">
                  <circle fill="#EA001B" cx="8" cy="12" r="5"/>
                  <circle fill="#F79E1B" cx="16" cy="12" r="5"/>
                  <path fill="#FF5F00" d="M12 7.5v9a5 5 0 0 0 0-9z"/>
                </svg>
              </div>
              {/* PayPal */}
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10">
                  <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
                  <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
                  <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
                </svg>
              </div>
              {/* Venmo */}
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <img 
                  src="/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png" 
                  alt="Venmo" 
                  className="h-3 w-5 object-contain"
                />
              </div>
            </div>
            <span className="text-[10px] text-gray-500">Secure payment</span>
          </div>
          <div className="text-[10px] text-gray-500 flex items-center group transition-all duration-300">
            <Info size={8} className="mr-1" />
            <span>30-day returns</span>
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
          
          .countdown-container {
            display: flex;
            align-items: center;
            background: rgba(254, 226, 226, 0.4);
            border-radius: 4px;
            padding: 2px 4px;
            border: 1px solid rgba(239, 68, 68, 0.2);
          }

          .countdown-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .countdown-value {
            font-family: monospace;
            font-weight: bold;
            font-size: 12px;
            color: #ef4444;
            min-width: 18px;
            text-align: center;
          }

          .countdown-value.milliseconds {
            font-size: 10px;
            color: #ef4444;
            width: 16px;
          }

          .countdown-label {
            font-size: 8px;
            color: #6b7280;
            text-transform: uppercase;
          }

          .countdown-separator {
            color: #ef4444;
            font-weight: bold;
            margin: 0 1px;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default ModernBuyButton;
