import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Star, TrendingUp, ChevronUp, AlertCircle, MessageCircle } from 'lucide-react';

const StickyBuyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Red');
  const [isWishlist, setIsWishlist] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [stockLevel, setStockLevel] = useState(156);
  const [isStockChanging, setIsStockChanging] = useState(false);
  const [recentPurchase, setRecentPurchase] = useState(false);
  const [likeCount, setLikeCount] = useState(156);

  const product = {
    name: "Wireless Bluetooth Earbuds",
    price: 29.99,
    salePrice: 19.99,
    discount: 33,
    rating: 4.7,
    reviewCount: 2483,
    orders: 5294,
    variants: ["Red", "Black", "White", "Blue"],
    shipping: "Free Shipping",
    deliveryTime: "15-30 days",
    inStock: stockLevel
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const incrementQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    setLikeCount(prev => isWishlist ? prev - 1 : prev + 1);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const calculateTotal = () => {
    return (product.salePrice * quantity).toFixed(2);
  };

  return (
    <div className="font-sans">
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-transform duration-300 z-50 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-3 pt-2 pb-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span className="text-xs font-medium">Stock Remaining</span>
              <div className="ml-2 px-1.5 py-0.5 bg-red-100 rounded text-red-500 text-xs font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                Limited
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-3 h-3 text-orange-500 mr-1" />
              <span className="text-xs font-medium">{product.inStock} items left</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">Selling fast - {Math.round((product.orders / (product.orders + product.inStock)) * 100)}% sold</span>
              {recentPurchase && (
                <span className="ml-2 px-1.5 py-0.5 bg-orange-100 rounded text-orange-600 text-xs font-medium animate-fadeIn">
                  Just purchased!
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{quantity} in your cart</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-red-500 font-bold text-lg">${product.salePrice}</span>
              <div className="flex items-center">
                <span className="text-gray-400 line-through text-xs">${product.price}</span>
                <span className="text-red-500 text-xs ml-1">-{product.discount}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button 
                onClick={toggleWishlist}
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                {likeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                    {likeCount > 999 ? '999+' : likeCount}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              onClick={togglePanel}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span>Options</span>
            </button>
            
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap">
              Buy Now
            </button>
          </div>
        </div>

        <div 
          className={`bg-white transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start mb-4">
              <div className="bg-gray-200 w-16 h-16 rounded-md mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-500 ml-2">{product.reviewCount} Reviews</span>
                  <span className="text-xs text-gray-500 ml-2">{product.orders} Orders</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-red-500 font-bold">${product.salePrice}</span>
                  <span className="text-gray-400 line-through text-xs ml-2">${product.price}</span>
                  <span className="text-red-500 text-xs ml-1">-{product.discount}%</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      selectedVariant === variant
                        ? 'border-red-500 text-red-500 bg-red-50'
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 h-8 text-center border-t border-b border-gray-300 text-sm"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                >
                  +
                </button>
                <span className="text-xs text-gray-500 ml-3">{product.inStock} available</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <span className="text-xs text-gray-600 mr-2">Shipping:</span>
                <span className="text-xs text-green-600">{product.shipping}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-2">Estimated Delivery:</span>
                <span className="text-xs">{product.deliveryTime}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-red-500 font-bold">${calculateTotal()}</span>
            </div>
            
            <div className="flex mt-4 space-x-2">
              <button className="flex-1 bg-orange-50 border border-orange-500 text-orange-500 rounded-full py-2 font-medium whitespace-nowrap">
                Add to Cart
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full py-2 font-medium whitespace-nowrap">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={togglePanel}
        className={`fixed bottom-20 right-4 bg-white shadow-md rounded-full p-2 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </button>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
          }
          
          @keyframes flash {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 0.3;
            }
          }
          .animate-flash {
            animation: flash 0.8s ease-in-out;
          }
          
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `
      }} />
    </div>
  );
};

export default StickyBuyButton;
