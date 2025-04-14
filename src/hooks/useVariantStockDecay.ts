import { useState, useEffect, useRef } from 'react';

export interface VariantStockInfo {
  initialStock: number;
  currentStock: number;
  stockPercentage: number;
  decayRate: number; // Units per hour for 12-hour window
  timeRemaining: number; // in milliseconds
  isLowStock: boolean;
  isActive: boolean;
  startTime: number; // timestamp when the countdown started
  lastRefilledAt?: number; // timestamp of the last refill
  refillCooldown?: number; // cooldown period in milliseconds before next refill
}

interface UseVariantStockDecayProps {
  variants: Array<{
    name: string;
    stock: number;
  }>;
  decayPeriod?: number; // Time in milliseconds for full decay cycle (default 12 hours)
  demoMode?: boolean; // Accelerated decay for demo purposes
  autoRefill?: boolean; // Enable automatic refill when stock runs out
  refillCooldown?: number; // Time in milliseconds to wait before refilling (default 30 seconds)
  refillPercentage?: number; // Percentage of initial stock to refill (default 70%)
}

// Helper function to generate a storage key for a specific variant
const getStorageKey = (variantName: string) => `variant_stock_${variantName.replace(/\s+/g, '_').toLowerCase()}`;

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 12 * 60 * 60 * 1000, // 12 hours in milliseconds
  demoMode = true, // Enable demo mode by default for slower decay
  autoRefill = true, // Enable automatic refill by default
  refillCooldown = 30 * 1000, // 30 seconds cooldown before refilling
  refillPercentage = 70 // Refill to 70% of initial stock
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
        
        // Generate more gradual decay rates for 12-hour window
        // Reduced decay rates to make it less aggressive
        const decayRate = demoMode 
          ? Math.max(5, Math.floor(Math.random() * 10) + 5)   // 5-15 units per 12 hours (slower)
          : Math.max(2, Math.floor(Math.random() * 5) + 2);   // 2-7 units per 12 hours for production
        
        // Create new stock info for this variant
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: variant.stock,
          stockPercentage: 100,
          decayRate: decayRate,
          timeRemaining: decayPeriod,
          isLowStock: variant.stock <= 15,
          isActive: false,
          startTime: Date.now(), // Record start time for accurate calculations
          lastRefilledAt: 0, // Initialize last refilled timestamp
          refillCooldown: refillCooldown // Set refill cooldown period
        };
        
        console.info(`Initialized variant: ${variant.name} with decay rate: ${decayRate} units/12-hours`);

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
  }, [variants, decayPeriod, variantStockInfo, demoMode, refillCooldown]);

  // Use requestAnimationFrame for smoother real-time updates
  useEffect(() => {
    const updateStockLevels = () => {
      const now = Date.now();
      
      setVariantStockInfo(prevInfo => {
        const newInfo = { ...prevInfo };
        let needsUpdate = false;
        
        // Process all variants for stock updates and potential refills
        Object.keys(newInfo).forEach(variantName => {
          const variant = newInfo[variantName];
          
          // Check if this variant needs a refill (out of stock or nearly out)
          if (autoRefill && 
              variant.currentStock <= 0 && 
              (!variant.lastRefilledAt || now - variant.lastRefilledAt > variant.refillCooldown!)) {
            
            // Calculate the refill amount based on the refill percentage
            const refillAmount = Math.ceil(variant.initialStock * (refillPercentage / 100));
            
            // Refill the stock
            newInfo[variantName] = {
              ...variant,
              currentStock: refillAmount,
              stockPercentage: (refillAmount / variant.initialStock) * 100,
              timeRemaining: (refillAmount / variant.initialStock) * decayPeriod,
              isLowStock: refillAmount <= 15,
              lastRefilledAt: now
            };
            
            needsUpdate = true;
            console.info(`Auto-refilled variant: ${variantName} with ${refillAmount} units (${refillPercentage}% of initial stock)`);
            
            // Save refill state to localStorage
            localStorage.setItem(getStorageKey(variantName), JSON.stringify(newInfo[variantName]));
          } 
          // Process normal stock decay for active variants with stock
          else if (variant.isActive && variant.currentStock > 0 && variant.timeRemaining > 0) {
            // Calculate elapsed time in hours since the start (for 12-hour window)
            const elapsedMs = now - variant.startTime;
            // Convert to the appropriate unit - now in hours for the 12-hour period
            const elapsedHours = elapsedMs / (60 * 60 * 1000);
            
            // Calculate how much stock to decrease based on elapsed time and decay rate
            // For real-time effect, we use the exact elapsed time rather than increments
            const stockToDecay = elapsedHours * variant.decayRate;
            
            // Calculate new stock with precise decimal values for smoother animation
            const newStock = Math.max(0, variant.initialStock - stockToDecay);
            
            // Calculate remaining time proportionally to the 12-hour window
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
              
              // Check if just ran out of stock
              if (variant.currentStock > 0 && newStock <= 0) {
                console.info(`Variant ${variantName} is now out of stock. Will refill after cooldown.`);
              }
              
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
  }, [decayPeriod, autoRefill, refillPercentage]);

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
      
      console.info(`Activated variant: ${variantName} with decay rate: ${updatedVariant.decayRate} units/12-hours`);
      
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
        startTime: Date.now(),
        lastRefilledAt: Date.now() // Reset the refill timestamp
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
            lastRefilledAt: Date.now(), // Reset the refill timestamp
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

  // Method to trigger manual refill for a variant
  const refillVariant = (variantName: string, percentage: number = refillPercentage) => {
    setVariantStockInfo(prev => {
      if (!prev[variantName]) return prev;
      
      const variant = prev[variantName];
      const refillAmount = Math.ceil(variant.initialStock * (percentage / 100));
      
      const updatedVariant = {
        ...variant,
        currentStock: refillAmount,
        stockPercentage: (refillAmount / variant.initialStock) * 100,
        timeRemaining: (refillAmount / variant.initialStock) * decayPeriod,
        isLowStock: refillAmount <= 15,
        lastRefilledAt: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem(getStorageKey(variantName), JSON.stringify(updatedVariant));
      
      console.info(`Manually refilled variant: ${variantName} with ${refillAmount} units (${percentage}% of initial stock)`);
      
      return {
        ...prev,
        [variantName]: updatedVariant
      };
    });
  };

  return {
    variantStockInfo,
    activateVariant,
    getTimeRemaining,
    resetVariant,
    resetAllVariants,
    refillVariant
  };
}
