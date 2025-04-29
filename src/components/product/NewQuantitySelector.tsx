import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp, DollarSign, Gift, Award, Package, Info, HelpCircle, Check, Star } from 'lucide-react';
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

// Define price tiers and their thresholds - cleaner structure
const PRICE_TIERS = [
  { min: 1, max: 2, price: 10.00, discount: 0 },
  { min: 3, max: 5, price: 9.00, discount: 10 },
  { min: 6, max: 9, price: 8.50, discount: 15 },
  { min: 10, max: 49, price: 8.00, discount: 20 },
  { min: 50, max: 99, price: 7.50, discount: 25 },
  { min: 100, max: Infinity, price: 7.00, discount: 30 }
];

const MAX_QUANTITY = 256;

interface NewQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  basePrice?: number;
  maxQuantity?: number;
  minQuantity?: number;
  inStock?: number;
  productName?: string;
  stockInfo?: VariantStockInfo;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const NewQuantitySelector: React.FC<NewQuantitySelectorProps> = ({
  quantity: initialQuantity,
  onQuantityChange,
  basePrice = PRICE_TIERS[0].price,
  maxQuantity = MAX_QUANTITY,
  minQuantity = 1,
  inStock,
  productName,
  stockInfo,
  onIncrement,
  onDecrement
}) => {
  // State management
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPresetDropdownOpen, setIsPresetDropdownOpen] = useState(false);
  const [activeTier, setActiveTier] = useState(PRICE_TIERS[0]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showFloatingNumber, setShowFloatingNumber] = useState(false);
  const [floatingNumber, setFloatingNumber] = useState('+1');
  const [incrementHoldInterval, setIncrementHoldInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [decrementHoldInterval, setDecrementHoldInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInfoTooltipVisible, setIsInfoTooltipVisible] = useState(false);
  const [showBulkConfirmation, setShowBulkConfirmation] = useState(false);
  
  // Refs
  const prevQuantityRef = useRef(quantity);
  
  // Calculate the current price tier based on quantity
  useEffect(() => {
    const newTier = PRICE_TIERS.find(tier => quantity >= tier.min && quantity <= tier.max);
    
    if (newTier && newTier !== activeTier) {
      setActiveTier(newTier);
      
      // Show toast when reaching a new discount tier
      if (newTier.discount > 0 && (prevQuantityRef.current < newTier.min || prevQuantityRef.current > newTier.max)) {
        setToastMessage(`Bulk discount of ${newTier.discount}% applied!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
    
    prevQuantityRef.current = quantity;
    
    // Show bulk confirmation popup for large quantities
    if (quantity >= 50 && prevQuantityRef.current < 50) {
      setShowBulkConfirmation(true);
      setTimeout(() => setShowBulkConfirmation(false), 5000);
    }
  }, [quantity, activeTier]);

  // Modify quantity change handler to use props
  const handleQuantityChange = (newQuantity: number) => {
    // Ensure the value is within the allowed range
    const validQuantity = Math.max(minQuantity, Math.min(maxQuantity, newQuantity));
    
    // Handle floating number animation if quantity increases
    if (validQuantity > quantity) {
      const diff = validQuantity - quantity;
      setFloatingNumber(`+${diff}`);
      setShowFloatingNumber(true);
      setTimeout(() => setShowFloatingNumber(false), 1000);
    }
    
    setQuantity(validQuantity);
    onQuantityChange(validQuantity);
  };

  // Button press handlers with hold functionality
  const startIncrementing = () => {
    handleQuantityChange(quantity + 1);
    if (onIncrement) {
      onIncrement();
    }
    
    const interval = setInterval(() => {
      setQuantity(prev => Math.min(prev + 1, maxQuantity));
    }, 200);
    
    setIncrementHoldInterval(interval);
  };
  
  const stopIncrementing = () => {
    if (incrementHoldInterval) {
      clearInterval(incrementHoldInterval);
      setIncrementHoldInterval(null);
    }
  };

  const startDecrementing = () => {
    handleQuantityChange(quantity - 1);
    if (onDecrement) {
      onDecrement();
    }
    
    const interval = setInterval(() => {
      setQuantity(prev => Math.max(prev - 1, minQuantity));
    }, 200);
    
    setDecrementHoldInterval(interval);
  };
  
  const stopDecrementing = () => {
    if (decrementHoldInterval) {
      clearInterval(decrementHoldInterval);
      setDecrementHoldInterval(null);
    }
  };

  // Input change handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    handleQuantityChange(value);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuantityChange(parseInt(e.target.value));
  };

  // Preset selection handler
  const handlePresetSelection = (preset: number | 'Max') => {
    handleQuantityChange(preset === 'Max' ? maxQuantity : preset);
    setIsPresetDropdownOpen(false);
  };

  // Utility calculations
  const calculateSavings = () => {
    if (activeTier.discount === 0) return 0;
    const regularPrice = PRICE_TIERS[0].price * quantity;
    const discountedPrice = activeTier.price * quantity;
    return (regularPrice - discountedPrice).toFixed(2);
  };

  const getNextDiscountThreshold = () => {
    const currentTierIndex = PRICE_TIERS.indexOf(activeTier);
    return currentTierIndex < PRICE_TIERS.length - 1 
      ? PRICE_TIERS[currentTierIndex + 1].min - quantity 
      : null;
  };

  // Render milestone markers for the slider
  const renderMilestoneMarkers = () => {
    const milestones = [];
    
    // Add tier thresholds as milestones
    PRICE_TIERS.forEach((tier, index) => {
      if (index < PRICE_TIERS.length - 1) {
        const nextTier = PRICE_TIERS[index + 1];
        const percentage = (nextTier.min / maxQuantity) * 100;
        
        milestones.push(
          <div 
            key={`tier-${index}`}
            className="absolute h-4 w-1 bg-gray-400 rounded-full"
            style={{ left: `${percentage}%`, top: '50%', transform: 'translateY(-50%)' }}
          />
        );
      }
    });
    
    return milestones;
  };

  return (
    <div className="w-full max-w-md bg-white rounded p-2 relative mt-0.5 px-0">
      {/* Floating number animation */}
      {showFloatingNumber && (
        <div 
          className="absolute text-orange-500 font-bold text-xl"
          style={{ 
            left: '50%', 
            top: '-20px',
            animation: 'float-up 1s ease-out forwards',
            opacity: 1,
            transform: 'translateX(-50%)'
          }}
        >
          {floatingNumber}
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-0 left-0 right-0 transform -translate-y-full p-0.5">
          <div className="bg-orange-500 text-white p-0.5 rounded shadow-md text-center text-sm flex items-center justify-center">
            <Award size={16} className="mr-1" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Bulk order confirmation popup */}
      {showBulkConfirmation && (
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-full p-0.5 z-30">
          <div className="bg-blue-600 text-white p-2 rounded shadow-lg text-sm flex items-start">
            <Info size={18} className="mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-1">Bulk Order Selected</div>
              <div className="text-blue-100 text-xs mb-2">You've selected {quantity} units (Tier {PRICE_TIERS.indexOf(activeTier) + 1} pricing)</div>
              <div className="flex gap-2">
                <button 
                  className="bg-white text-blue-600 px-3 py-0.5 rounded text-xs font-medium hover:bg-blue-50"
                  onClick={() => setShowBulkConfirmation(false)}
                >
                  <Check size={12} className="inline mr-1" />
                  Confirm
                </button>
                <button 
                  className="bg-blue-700 text-white px-3 py-0.5 rounded text-xs font-medium hover:bg-blue-800"
                  onClick={() => {
                    handleQuantityChange(Math.max(1, quantity - getNextDiscountThreshold()));
                    setShowBulkConfirmation(false);
                  }}
                >
                  Reduce Quantity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modified header with "Quantity" and "You have selected" pushed to far edges */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-sm font-semibold text-gray-800">Quantity</h3>
          <div className="relative ml-2">
            <button
              className="text-gray-400 hover:text-gray-600"
              onMouseEnter={() => setIsInfoTooltipVisible(true)}
              onMouseLeave={() => setIsInfoTooltipVisible(false)}
            >
              <HelpCircle size={14} />
            </button>
            {isInfoTooltipVisible && (
              <div className="absolute z-20 bg-gray-800 text-white p-1 rounded shadow-lg text-xs w-56 left-0 top-6">
                <div className="font-semibold mb-1">About Bulk Pricing</div>
                <p className="mb-1">Our tiered pricing system offers discounts based on quantity purchased.</p>
                <ul className="text-gray-300 text-xs">
                  {PRICE_TIERS.map((tier, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{tier.min}-{tier.max === Infinity ? '+' : tier.max} pcs:</span>
                      <span>${tier.price.toFixed(2)}/pc ({tier.discount}% off)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Units selected message moved to the far right */}
        <div className="text-blue-700 text-sm flex items-center">
          <Package size={16} className="mr-1 text-blue-600" />
          <span>You have selected <strong>{quantity}</strong> {quantity === 1 ? 'unit' : 'units'}</span>
        </div>
      </div>

      {/* Main quantity selector controls */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex border border-gray-300 rounded h-8">
          <button
            className="flex-shrink-0 bg-red-50 hover:bg-red-100 w-8 h-full flex items-center justify-center transition-colors border-r border-gray-300"
            onMouseDown={startDecrementing}
            onMouseUp={stopDecrementing}
            onMouseLeave={stopDecrementing}
            onTouchStart={startDecrementing}
            onTouchEnd={stopDecrementing}
            disabled={quantity <= minQuantity}
          >
            <Minus size={16} className={quantity <= minQuantity ? "text-gray-300" : "text-gray-700"} />
          </button>

          <input
            type="number"
            min={minQuantity}
            max={maxQuantity}
            value={quantity}
            onChange={handleInputChange}
            className="w-12 h-full text-center focus:outline-none text-sm bg-white"
          />

          <button
            className="flex-shrink-0 bg-red-50 hover:bg-red-100 w-8 h-full flex items-center justify-center transition-colors border-l border-gray-300"
            onMouseDown={startIncrementing}
            onMouseUp={stopIncrementing}
            onMouseLeave={stopIncrementing}
            onTouchStart={startIncrementing}
            onTouchEnd={stopIncrementing}
            disabled={quantity >= maxQuantity}
          >
            <Plus size={16} className={quantity >= maxQuantity ? "text-gray-300" : "text-gray-700"} />
          </button>
        </div>

        {/* Enhanced Unit price indicator with discount percentage */}
        <div className="bg-orange-50 border border-orange-200 rounded px-2 h-8 flex items-center text-xs">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-orange-700 font-medium">Only ${activeTier.price.toFixed(2)} each – Now {activeTier.discount}% Off!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider control */}
      <div className="mb-2 relative">
        <div className="h-1 bg-gray-200 rounded-full mb-1 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
            style={{ width: `${(quantity / maxQuantity) * 100}%` }}
          />
          {renderMilestoneMarkers()}
        </div>

        <input
          type="range"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 pc</span>
          <span>Max {maxQuantity}</span>
        </div>
      </div>

      {/* Discount cards with expand/collapse functionality */}
      <div className="mb-2 text-xs">
        <h4 className="font-medium text-orange-600 mb-1 flex items-center">
          <Gift size={14} className="text-orange-500 mr-1" />
          Select Bundle Option
          <span className="ml-1 text-xs bg-orange-100 text-orange-700 px-1 rounded">Save more</span>
        </h4>

        {/* First row of cards - always visible */}
        <div className="grid grid-cols-3 gap-0.5 mb-0.5">
          {PRICE_TIERS.filter(tier => tier.discount > 0).slice(0, 3).map((tier, index) => (
            <div 
              key={index}
              className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= tier.min ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => handleQuantityChange(tier.min)}
            >
              <div className="text-xs">{tier.min}+ pcs</div>
              <div className="font-semibold text-orange-600 text-xs">Only ${tier.price.toFixed(2)} each</div>
              <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now {tier.discount}% Off!</div>
            </div>
          ))}
        </div>

        {/* Expanded section with additional cards */}
        {isExpanded && (
          <div className="grid grid-cols-3 gap-0.5 mt-0.5">
            {/* Additional bundle options */}
            <div 
              className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= 200 ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => handleQuantityChange(200)}
            >
              <div className="text-xs">200+ pcs</div>
              <div className="font-semibold text-orange-600 text-xs">Only $6.75 each</div>
              <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now 32.5% Off!</div>
            </div>

            <div 
              className={`rounded p-0.5 text-center cursor-pointer transition-all border ${quantity >= 250 ? 'bg-orange-50 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
              onClick={() => handleQuantityChange(250)}
            >
              <div className="text-xs">250+ pcs</div>
              <div className="font-semibold text-orange-600 text-xs">Only $6.50 each</div>
              <div className="bg-orange-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Now 35% Off!</div>
            </div>

            <div 
              className="rounded p-0.5 text-center cursor-pointer transition-all border bg-gray-50 border-gray-200"
              onClick={() => {
                // Open custom quantity dialog or similar functionality
              }}
            >
              <div className="text-xs">Custom</div>
              <div className="font-semibold text-blue-600 text-xs">Quote</div>
              <div className="bg-blue-500 text-white text-xs rounded-sm px-0.5 mt-0.5 font-medium">Contact us</div>
            </div>
          </div>
        )}

        {/* View more / View less button */}
        <div className="text-center mt-1">
          <button 
            className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'View less' : 'View more'}
            {isExpanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
          </button>
        </div>
      </div>

      {/* Dynamic information and suggestions */}
      <div className="bg-orange-50 border border-orange-200 p-1 rounded mb-2 text-xs">
        {activeTier.discount > 0 ? (
          <div className="flex items-center">
            <DollarSign size={14} className="text-orange-600 mr-1 flex-shrink-0" />
            <span className="text-orange-800">You saved <strong>${calculateSavings()}</strong> with your bulk purchase! <span className="text-orange-600 font-medium">Extra coupon applied at checkout.</span></span>
          </div>
        ) : getNextDiscountThreshold() ? (
          <div className="flex items-center">
            <Gift size={14} className="text-orange-600 mr-1 flex-shrink-0" />
            <span className="text-orange-800">Add <strong>{getNextDiscountThreshold()}</strong> more to unlock a <strong>{PRICE_TIERS[1].discount}%</strong> discount!</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Package size={14} className="text-orange-600 mr-1 flex-shrink-0" />
            <span className="text-orange-800">Buy <strong>3</strong> or more to get <strong>10% off</strong>! <span className="text-orange-600 font-medium">Limited time offer!</span></span>
          </div>
        )}
      </div>

      {/* Current selection summary */}
      <div className="flex items-center justify-between p-1 rounded border border-gray-200">
        <div>
          <div className="text-xs text-gray-500">Current selection:</div>
          <div className="font-medium text-sm">
            {quantity} {quantity === 1 ? 'pc' : 'pcs'} × ${activeTier.price.toFixed(2)}
          </div>
          {activeTier.discount > 0 && (
            <div className="text-orange-600 text-xs font-medium flex items-center">
              <Award size={12} className="mr-1" />
              {activeTier.discount}% bulk discount applied
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Total price:</div>
          <div className="text-base font-bold text-orange-600">
            US ${(quantity * activeTier.price).toFixed(2)}
          </div>
          {activeTier.discount > 0 && (
            <div className="text-xs text-gray-500 line-through">
              US ${(quantity * PRICE_TIERS[0].price).toFixed(2)}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default NewQuantitySelector;
