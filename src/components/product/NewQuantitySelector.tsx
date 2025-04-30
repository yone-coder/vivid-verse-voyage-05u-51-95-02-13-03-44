,
import React, { useState, useEffect, useRef } from 'react';
import { Package } from 'lucide-react';
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

// Import refactored components
import FloatingNumber from './quantity-selector/FloatingNumber';
import ToastNotification from './quantity-selector/ToastNotification';
import BulkConfirmation from './quantity-selector/BulkConfirmation';
import InfoTooltip from './quantity-selector/InfoTooltip';
import QuantityControls from './quantity-selector/QuantityControls';
import UnitPriceIndicator from './quantity-selector/UnitPriceIndicator';
import QuantitySlider from './quantity-selector/QuantitySlider';
import BundleOptions from './quantity-selector/BundleOptions';
import StatusNotification from './quantity-selector/StatusNotification';
import SelectionSummary from './quantity-selector/SelectionSummary';
import FloatingNumberStyles from './quantity-selector/FloatingNumberStyles';

// Import utility and types
import { PRICE_TIERS, MAX_QUANTITY, findActiveTier } from './quantity-selector/price-tiers';

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
    const newTier = findActiveTier(quantity);
    
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

  const handleBulkConfirmationReduce = () => {
    const nextThreshold = PRICE_TIERS.find(tier => tier.min > activeTier.min)?.min ?? 0;
    handleQuantityChange(Math.max(1, quantity - (nextThreshold - activeTier.min)));
    setShowBulkConfirmation(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded p-2 relative mt-0.5 px-0">
      {/* Floating animation components */}
      <FloatingNumber show={showFloatingNumber} value={floatingNumber} />
      <ToastNotification show={showToast} message={toastMessage} />
      <BulkConfirmation 
        show={showBulkConfirmation} 
        quantity={quantity} 
        activeTierIndex={PRICE_TIERS.indexOf(activeTier)} 
        onClose={() => setShowBulkConfirmation(false)}
        onReduce={handleBulkConfirmationReduce}
      />

      {/* Header with "Quantity" and "You have selected" pushed to far edges */}
      {/* Header row - stays horizontal on all screens */}
<div className="flex items-center justify-between mb-2 w-full">
  {/* Left side - Quantity label + tooltip */}
  <div className="flex items-center shrink-0">
    <h3 className="text-sm font-semibold text-gray-800 mr-1">Quantity</h3>
    <InfoTooltip 
      show={isInfoTooltipVisible}
      onMouseEnter={() => setIsInfoTooltipVisible(true)}
      onMouseLeave={() => setIsInfoTooltipVisible(false)}
    />
  </div>

  {/* Right side - Units selected message */}
  <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
    You have selected {quantity} {quantity === 1 ? 'unit' : 'units'}
  </div>
</div>

{/* Controls row - stays horizontal with proper spacing */}
<div className="flex items-center gap-2 w-full">
  <QuantityControls
    quantity={quantity}
    minQuantity={minQuantity}
    maxQuantity={maxQuantity}
    onInputChange={handleInputChange}
    startIncrementing={startIncrementing}
    stopIncrementing={stopIncrementing}
    startDecrementing={startDecrementing}
    stopDecrementing={stopDecrementing}
  />

  <UnitPriceIndicator 
    price={activeTier.price} 
    discount={activeTier.discount} 
    className="shrink-0" 
  />
</div>
       
      </div>

      {/* Main quantity selector controls */}
      

      {/* Slider control */}
      <QuantitySlider 
        quantity={quantity} 
        maxQuantity={maxQuantity} 
        onChange={handleSliderChange} 
      />

      {/* Discount cards with expand/collapse functionality */}
      <BundleOptions 
        quantity={quantity}
        isExpanded={isExpanded}
        onQuantityChange={handleQuantityChange}
        toggleExpand={() => setIsExpanded(!isExpanded)}
      />

      {/* Dynamic information and suggestions */}
      <StatusNotification quantity={quantity} activeTier={activeTier} />

      {/* Current selection summary */}
      <SelectionSummary quantity={quantity} activeTier={activeTier} />

      {/* CSS for animations */}
      <FloatingNumberStyles />
    </div>
  );
};

export default NewQuantitySelector;
