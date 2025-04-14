
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

// Helper function to generate a storage key for a specific variant
const getStorageKey = (variantName: string) => `variant_stock_${variantName.replace(/\s+/g, '_').toLowerCase()}`;

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 5 * 60 * 1000, // 5 minutes in milliseconds
  demoMode = true // Enable demo mode by default for faster decay
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const initializedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  
  // Load saved stock info from localStorage on component mount
  useEffect(() => {
    // Skip initialization if already done to prevent resetting stock values
    if (initializedRef.current) return;
    
    const initialStockInfo: Record<string, VariantStockInfo> = {};
    let hasNewVariants = false;
    
    variants.forEach(variant => {
      // Try to load from localStorage first
      const savedInfoString = localStorage.getItem(getStorageKey(variant.name));
      const savedInfo = savedInfoString ? JSON.parse(savedInfoString) : null;
      
      // Only initialize variants that aren't already being tracked or restore from localStorage
      if (savedInfo && Date.now() - savedInfo.startTime < decayPeriod) {
        // If saved data exists and hasn't expired, use it
        initialStockInfo[variant.name] = savedInfo;
        console.info(`Restored variant from localStorage: ${variant.name} with remaining stock: ${savedInfo.currentStock.toFixed(2)}`);
      } else if (!variantStockInfo[variant.name]) {
        hasNewVariants = true;
        
        // Generate random decay rate between 10-30 units per minute for a 5-minute window
        // Increase decay rates to make it more noticeable
        const decayRate = demoMode 
          ? Math.max(20, Math.floor(Math.random() * 40) + 20) // 20-60 units per minute (faster for demo)
          : Math.max(5, Math.floor(Math.random() * 10) + 5);   // 5-15 units per minute for production
        
        // Create new stock info for this variant
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

        // Save this initial state to localStorage
        localStorage.setItem(getStorageKey(variant.name), JSON.stringify(initialStockInfo[variant.name]));
      } else {
        // Keep existing data for already initialized variants
        initialStockInfo[variant.name] = variantStockInfo[variant.name];
      }
    });
    
    if (hasNewVariants || Object.keys(initialStockInfo).length > 0) {
      setVariantStockInfo(prev => ({...prev, ...initialStockInfo}));
    }
    
    initializedRef.current = true;
  }, [variants, decayPeriod, variantStockInfo, demoMode]);

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
            // Decrease the threshold to ensure more frequent updates
            if (Math.abs(newStock - variant.currentStock) > 0.001) {
              needsUpdate = true;
              newInfo[variantName] = {
                ...variant,
                currentStock: newStock,
                stockPercentage: percentage,
                timeRemaining: remainingTime,
                isLowStock: newStock <= 15
              };
              
              // Save updated state to localStorage immediately
              localStorage.setItem(getStorageKey(variantName), JSON.stringify(newInfo[variantName]));
            }
          }
        });
        
        return needsUpdate ? newInfo : prevInfo;
      });
      
      // Continue the animation loop at a higher frame rate
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
        if (name !== variantName) {
          const updatedVariant = {
            ...updated[name],
            isActive: false
          };
          updated[name] = updatedVariant;
          
          // Save inactive state to localStorage
          localStorage.setItem(getStorageKey(name), JSON.stringify(updatedVariant));
        }
      });
      
      // Make sure the variant is properly initialized before activating
      if (!updated[variantName]) return updated;

      // Check if we need to reset this variant based on localStorage data
      const savedInfoString = localStorage.getItem(getStorageKey(variantName));
      const savedInfo = savedInfoString ? JSON.parse(savedInfoString) : null;
      
      // If the timer had expired or no existing data, reset the start time
      const shouldReset = !savedInfo || (Date.now() - savedInfo.startTime >= decayPeriod);
      
      // Reset the start time when a variant is activated if needed
      const updatedVariant = {
        ...updated[variantName],
        isActive: true,
        startTime: shouldReset ? Date.now() : updated[variantName].startTime // Only reset time if needed
      };
      
      updated[variantName] = updatedVariant;
      
      // Save to localStorage
      localStorage.setItem(getStorageKey(variantName), JSON.stringify(updatedVariant));
      
      console.info(`Activated variant: ${variantName} with decay rate: ${updatedVariant.decayRate} units/minute`);
      
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

  // Method to manually reset a variant (for testing or manual inventory reset)
  const resetVariant = (variantName: string) => {
    setVariantStockInfo(prev => {
      if (!prev[variantName]) return prev;
      
      const variant = variants.find(v => v.name === variantName);
      if (!variant) return prev;
      
      const updatedVariant = {
        ...prev[variantName],
        initialStock: variant.stock,
        currentStock: variant.stock,
        stockPercentage: 100,
        timeRemaining: decayPeriod,
        startTime: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem(getStorageKey(variantName), JSON.stringify(updatedVariant));
      
      console.info(`Reset variant: ${variantName} to initial stock`);
      
      return {
        ...prev,
        [variantName]: updatedVariant
      };
    });
  };

  // Reset all variants to initial stock (for testing)
  const resetAllVariants = () => {
    setVariantStockInfo(prev => {
      const updated = { ...prev };
      
      variants.forEach(variant => {
        if (updated[variant.name]) {
          const updatedVariant = {
            ...updated[variant.name],
            initialStock: variant.stock,
            currentStock: variant.stock,
            stockPercentage: 100,
            timeRemaining: decayPeriod,
            startTime: Date.now(),
            isActive: updated[variant.name].isActive // Preserve active state
          };
          
          updated[variant.name] = updatedVariant;
          
          // Save to localStorage
          localStorage.setItem(getStorageKey(variant.name), JSON.stringify(updatedVariant));
        }
      });
      
      console.info("Reset all variants to initial stock");
      
      return updated;
    });
  };

  return {
    variantStockInfo,
    activateVariant,
    getTimeRemaining,
    resetVariant,
    resetAllVariants
  };
}
