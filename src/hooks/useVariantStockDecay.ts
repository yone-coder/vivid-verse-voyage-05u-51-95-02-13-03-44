import { useState, useEffect } from 'react';

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
}

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Initialize stock info for each variant on first load
  useEffect(() => {
    const initialStockInfo: Record<string, VariantStockInfo> = {};
    
    variants.forEach(variant => {
      // Only initialize variants that aren't already being tracked
      if (!variantStockInfo[variant.name]) {
        // Generate random decay rate between 1-5 units per hour
        const decayRate = Math.max(1, Math.floor(Math.random() * 5));
        
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: variant.stock,
          stockPercentage: 100,
          decayRate: decayRate,
          timeRemaining: decayPeriod,
          isLowStock: variant.stock <= 15,
          isActive: false
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
            const hoursPassed = elapsedMs / (60 * 60 * 1000);
            const stockToDecay = hoursPassed * variant.decayRate;
            
            // Calculate new stock level
            const newStock = Math.max(0, variant.currentStock - stockToDecay);
            
            // Calculate remaining time proportionally
            const remainingTime = Math.max(0, variant.timeRemaining - elapsedMs);
            
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
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(timer);
  }, [lastUpdate]);

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
      
      return updated;
    });
  };

  return {
    variantStockInfo,
    activateVariant
  };
}
