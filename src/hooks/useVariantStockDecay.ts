
import { useState, useEffect, useRef } from 'react';

export interface VariantStockInfo {
  initialStock: number;
  currentStock: number;
  stockPercentage: number;
  decayRate: number; // Units per minute
  timeRemaining: number; // in milliseconds
  isLowStock: boolean;
  isActive: boolean;
  startTime: number; // timestamp when the countdown started
}

interface UseVariantStockDecayProps {
  variants: Array<{
    name: string;
    stock: number;
  }>;
  decayPeriod?: number; // Time in milliseconds for full decay cycle (default 5min)
  demoMode?: boolean; // Accelerated decay for demo purposes
}

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 5 * 60 * 1000, // 5 minutes in milliseconds (changed from 24h)
  demoMode = true // Enable demo mode by default for faster decay
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const initializedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  
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
        
        // Generate random decay rate between 10-30 units per minute for a 5-minute window
        const decayRate = demoMode 
          ? Math.max(10, Math.floor(Math.random() * 20) + 10) // 10-30 units per minute
          : Math.max(5, Math.floor(Math.random() * 10) + 5);   // 5-15 units per minute for production
        
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: variant.stock,
          stockPercentage: 100,
          decayRate: decayRate,
          timeRemaining: decayPeriod,
          isLowStock: variant.stock <= 15,
          isActive: false,
          startTime: Date.now() // Record start time for accurate calculations
        };
        
        console.info(`Initialized variant: ${variant.name} with decay rate: ${decayRate} units/minute`);
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

  // Use requestAnimationFrame for smoother real-time updates
  useEffect(() => {
    const updateStockLevels = () => {
      const now = Date.now();
      
      setVariantStockInfo(prevInfo => {
        const newInfo = { ...prevInfo };
        let needsUpdate = false;
        
        // Only decay active variants
        Object.keys(newInfo).forEach(variantName => {
          const variant = newInfo[variantName];
          
          if (variant.isActive && variant.currentStock > 0 && variant.timeRemaining > 0) {
            // Calculate elapsed time in minutes since the start
            const elapsedMs = now - variant.startTime;
            const elapsedMinutes = elapsedMs / (60 * 1000);
            
            // Calculate how much stock to decrease based on elapsed time and decay rate
            // For real-time effect, we use the exact elapsed time rather than increments
            const stockToDecay = elapsedMinutes * variant.decayRate;
            
            // Calculate new stock with precise decimal values for smoother animation
            const newStock = Math.max(0, variant.initialStock - stockToDecay);
            
            // Calculate remaining time proportionally to the 5-minute window
            const remainingFraction = newStock / variant.initialStock;
            const remainingTime = Math.max(0, remainingFraction * decayPeriod);
            
            // Calculate stock percentage for the progress bar
            const percentage = (newStock / variant.initialStock) * 100;
            
            // Only update if there's an actual change to avoid unnecessary re-renders
            if (Math.abs(newStock - variant.currentStock) > 0.01) {
              needsUpdate = true;
              newInfo[variantName] = {
                ...variant,
                currentStock: newStock,
                stockPercentage: percentage,
                timeRemaining: remainingTime,
                isLowStock: newStock <= 15
              };
            }
          }
        });
        
        return needsUpdate ? newInfo : prevInfo;
      });
      
      // Continue the animation loop
      animationFrameRef.current = requestAnimationFrame(updateStockLevels);
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(updateStockLevels);
    
    return () => {
      // Clean up animation frame on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [decayPeriod]);

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
      
      // Reset the start time when a variant is activated
      updated[variantName] = {
        ...updated[variantName],
        isActive: true,
        startTime: Date.now() // Reset the start time for accurate real-time decay
      };
      
      console.info(`Activated variant: ${variantName} with decay rate: ${updated[variantName].decayRate} units/minute`);
      
      return updated;
    });
  };

  // Get the minutes and seconds remaining for a specific variant (for display purposes)
  const getTimeRemaining = (variantName: string): { minutes: number, seconds: number } | null => {
    const variant = variantStockInfo[variantName];
    if (!variant) return null;
    
    if (variant.timeRemaining <= 0) {
      return { minutes: 0, seconds: 0 };
    }
    
    const totalSeconds = Math.ceil(variant.timeRemaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return { minutes, seconds };
  };

  return {
    variantStockInfo,
    activateVariant,
    getTimeRemaining
  };
}
