
import { useState, useEffect, useRef } from 'react';

export interface VariantStockInfo {
  initialStock: number;
  currentStock: number;
  stockPercentage: number;
  decayRate: number; // Units per hour
  timeRemaining: number; // in milliseconds
  isLowStock: boolean;
  isActive: boolean;
}

interface UseVariantStockDecayProps {
  variants: Array<{
    name: string;
    stock: number;
  }>;
  decayPeriod?: number; // Time in milliseconds for full decay cycle (default 24h)
  demoMode?: boolean; // Accelerated decay for demo purposes
}

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  demoMode = true // Enable demo mode by default for faster decay
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const initializedRef = useRef(false);
  
  // Only initialize stock info for new variants on first load
  useEffect(() => {
    // Skip initialization if already done to prevent resetting stock values
    if (initializedRef.current) return;
    
    const initialStockInfo: Record<string, VariantStockInfo> = {};
    let hasNewVariants = false;
    
    variants.forEach(variant => {
      // Only initialize variants that aren't already being tracked
      if (!variantStockInfo[variant.name]) {
        hasNewVariants = true;
        // Generate random decay rate between 1-10 units per hour (higher for demo purposes)
        const decayRate = demoMode 
          ? Math.max(3, Math.floor(Math.random() * 10) + 5) // Higher rates for demo
          : Math.max(1, Math.floor(Math.random() * 5));      // Normal rates for production
        
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: variant.stock,
          stockPercentage: 100,
          decayRate: decayRate,
          timeRemaining: decayPeriod,
          isLowStock: variant.stock <= 15,
          isActive: false
        };
        
        console.info(`Initialized variant: ${variant.name} with decay rate: ${decayRate} units/hour`);
      } else {
        // Keep existing data for already initialized variants
        initialStockInfo[variant.name] = variantStockInfo[variant.name];
      }
    });
    
    if (hasNewVariants) {
      setVariantStockInfo(prev => ({...prev, ...initialStockInfo}));
    }
    
    initializedRef.current = true;
  }, [variants]);

  // Update stock levels based on elapsed time
  useEffect(() => {
    // In demo mode, update much more frequently for visible animation
    const updateInterval = demoMode ? 250 : 5000; // 250ms for demo, 5s for production
    
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastUpdate;
      
      setVariantStockInfo(prevInfo => {
        const newInfo = { ...prevInfo };
        
        // Only decay active variants
        Object.keys(newInfo).forEach(variantName => {
          const variant = newInfo[variantName];
          
          if (variant.isActive && variant.currentStock > 0 && variant.timeRemaining > 0) {
            // Calculate how much stock to decrease based on decay rate and elapsed time
            const hoursPassed = elapsedMs / (60 * 60 * 1000);
            
            // If in demo mode, accelerate decay by multiplier for visible effect
            const accelerationFactor = demoMode ? 50 : 1; // 50x faster in demo mode
            const stockToDecay = hoursPassed * variant.decayRate * accelerationFactor;
            
            // Calculate new stock level with precise decimal values for smoother animation
            const newStock = Math.max(0, variant.currentStock - stockToDecay);
            
            // Calculate remaining time proportionally
            const remainingFraction = newStock / variant.initialStock;
            const remainingTime = Math.max(0, remainingFraction * decayPeriod);
            
            // Calculate stock percentage
            const percentage = (newStock / variant.initialStock) * 100;
            
            newInfo[variantName] = {
              ...variant,
              currentStock: newStock,
              stockPercentage: percentage,
              timeRemaining: remainingTime,
              isLowStock: newStock <= 15
            };
          }
        });
        
        return newInfo;
      });
      
      setLastUpdate(now);
    }, updateInterval);
    
    return () => clearInterval(timer);
  }, [lastUpdate, decayPeriod, demoMode]);

  // Function to activate a variant (start its decay)
  const activateVariant = (variantName: string) => {
    setVariantStockInfo(prev => {
      const updated = { ...prev };
      
      // Deactivate all other variants
      Object.keys(updated).forEach(name => {
        updated[name] = {
          ...updated[name],
          isActive: name === variantName
        };
      });
      
      // Make sure the variant is properly initialized before activating
      if (!updated[variantName]) return updated;
      
      console.info(`Activated variant: ${variantName} with decay rate: ${updated[variantName].decayRate} units/hour`);
      
      return updated;
    });
  };

  // Get the hours remaining for a specific variant (for display purposes)
  const getHoursRemaining = (variantName: string): number | null => {
    const variant = variantStockInfo[variantName];
    if (!variant) return null;
    
    return variant.timeRemaining > 0 
      ? Math.ceil(variant.timeRemaining / (1000 * 60 * 60)) 
      : 0;
  };

  return {
    variantStockInfo,
    activateVariant,
    getHoursRemaining
  };
}
