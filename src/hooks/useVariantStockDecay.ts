
import { useState, useEffect, useRef } from 'react';

export interface VariantStockInfo {
  initialStock: number;
  currentStock: number;
  stockPercentage: number;
  decayRate: number; // Units per hour
  timeRemaining: number; // in milliseconds
  isLowStock: boolean;
  isActive: boolean;
  lastUpdate: number; // timestamp of last update
}

interface UseVariantStockDecayProps {
  variants: Array<{
    name: string;
    stock: number;
  }>;
  decayPeriod?: number; // Time in milliseconds for full decay cycle (default 24h)
  updateInterval?: number; // Update interval in milliseconds (default 1000ms)
}

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  updateInterval = 1000 // 1 second updates for more fluid animation
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const acceleratedMode = useRef(false);
  
  // For demo purposes, we'll accelerate the decay 60x (1 minute = 1 hour)
  // In a production environment, you'd remove this
  useEffect(() => {
    acceleratedMode.current = true;
  }, []);

  // Initialize stock info for each variant on first load
  useEffect(() => {
    const initialStockInfo: Record<string, VariantStockInfo> = {};
    const now = Date.now();
    
    variants.forEach(variant => {
      // Only initialize variants that aren't already being tracked
      if (!variantStockInfo[variant.name]) {
        // Generate random decay rate between 1-8 units per hour
        const decayRate = Math.max(1, Math.floor(Math.random() * 8));
        
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: variant.stock,
          stockPercentage: 100,
          decayRate: decayRate,
          timeRemaining: decayPeriod,
          isLowStock: variant.stock <= 15,
          isActive: false,
          lastUpdate: now
        };
      } else {
        // Keep existing data for already initialized variants
        initialStockInfo[variant.name] = variantStockInfo[variant.name];
      }
    });
    
    setVariantStockInfo(initialStockInfo);
  }, [variants]);

  // Update stock levels based on elapsed time
  useEffect(() => {
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
            // For demonstration, we accelerate decay rate by 60x
            const accelerationFactor = acceleratedMode.current ? 60 : 1;
            const hoursPassed = (elapsedMs / (60 * 60 * 1000)) * accelerationFactor;
            const stockToDecay = hoursPassed * variant.decayRate;
            
            // Calculate new stock level
            const newStock = Math.max(0, variant.currentStock - stockToDecay);
            
            // Calculate remaining time proportionally
            const remainingTime = Math.max(0, variant.timeRemaining - (elapsedMs * accelerationFactor));
            
            // Calculate stock percentage
            const percentage = (newStock / variant.initialStock) * 100;
            
            newInfo[variantName] = {
              ...variant,
              currentStock: newStock,
              stockPercentage: percentage,
              timeRemaining: remainingTime,
              isLowStock: newStock <= 15,
              lastUpdate: now
            };
          }
        });
        
        return newInfo;
      });
      
      setLastUpdate(now);
    }, updateInterval); // Update more frequently for smoother animation
    
    return () => clearInterval(timer);
  }, [lastUpdate, updateInterval]);

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
      
      console.log(`Activated variant: ${variantName} with decay rate: ${updated[variantName].decayRate} units/hour`);
      
      return updated;
    });
  };

  // Function for debugging/demo to instantly reduce stock of a variant
  const reduceVariantStock = (variantName: string, amount: number = 1) => {
    setVariantStockInfo(prev => {
      const updated = { ...prev };
      if (!updated[variantName]) return updated;
      
      const variant = updated[variantName];
      const newStock = Math.max(0, variant.currentStock - amount);
      
      updated[variantName] = {
        ...variant,
        currentStock: newStock,
        stockPercentage: (newStock / variant.initialStock) * 100,
        isLowStock: newStock <= 15
      };
      
      return updated;
    });
  };

  return {
    variantStockInfo,
    activateVariant,
    reduceVariantStock
  };
}
