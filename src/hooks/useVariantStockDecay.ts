
import { useState, useEffect, useRef } from 'react';

export interface VariantStockInfo {
  initialStock: number;
  currentStock: number;
  stockPercentage: number;
  decayRate: number; // Units per hour for the decay window
  timeRemaining: number; // in milliseconds
  isLowStock: boolean;
  isActive: boolean;
  startTime: number; // timestamp when the countdown started
  lastRefilledAt?: number; // timestamp of the last refill
  refillCooldown?: number; // cooldown period in milliseconds before next refill
  decayPeriod: number; // Individual decay period in milliseconds
}

interface UseVariantStockDecayProps {
  variants: Array<{
    name: string;
    stock: number;
    decayPeriod?: number; // Optional custom decay period in milliseconds
    startTime?: number; // Optional custom start time as timestamp
  }>;
  decayPeriod?: number; // Default fallback decay period
  demoMode?: boolean; // Accelerated decay for demo purposes
  autoRefill?: boolean; // Enable automatic refill when stock runs out
  refillCooldown?: number; // Time in milliseconds to wait before refilling (default 30 seconds)
  refillPercentage?: number; // Percentage of initial stock to refill (default 70%)
}

// Helper function to generate a storage key for a specific variant
const getStorageKey = (variantName: string) => `variant_stock_${variantName.replace(/\s+/g, '_').toLowerCase()}`;

export function useVariantStockDecay({ 
  variants, 
  decayPeriod = 12 * 60 * 60 * 1000, // 12 hours in milliseconds default
  demoMode = true, // Enable demo mode by default for slower decay
  autoRefill = true, // Enable automatic refill by default
  refillCooldown = 30 * 1000, // 30 seconds cooldown before refilling
  refillPercentage = 70 // Refill to 70% of initial stock
}: UseVariantStockDecayProps) {
  const [variantStockInfo, setVariantStockInfo] = useState<Record<string, VariantStockInfo>>({});
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
      
      // Determine variant-specific decay period
      const variantDecayPeriod = variant.decayPeriod || decayPeriod;
      
      // Get the variant's custom start time or use current time
      const startTime = variant.startTime || Date.now();
      const elapsedMs = Date.now() - startTime;
      
      // Only initialize variants that aren't already being tracked or restore from localStorage
      if (savedInfo && Date.now() - savedInfo.startTime < variantDecayPeriod) {
        // If saved data exists and hasn't expired, use it
        initialStockInfo[variant.name] = savedInfo;
        console.info(`Restored variant from localStorage: ${variant.name} with remaining stock: ${savedInfo.currentStock.toFixed(2)}`);
      } else if (!variantStockInfo[variant.name]) {
        hasNewVariants = true;
        
        // Generate more gradual decay rates based on variant-specific decay period
        const hourlyDecayRate = demoMode 
          ? Math.max(5, Math.floor(Math.random() * 10) + 5)   // 5-15 units per period (slower)
          : Math.max(2, Math.floor(Math.random() * 5) + 2);   // 2-7 units per period for production
        
        // Calculate remaining percentage based on elapsed time
        const remainingPercentage = Math.max(0, 1 - (elapsedMs / variantDecayPeriod));
        
        // Calculate current stock based on elapsed time
        const calculatedCurrentStock = variant.stock * remainingPercentage;
        
        // Create new stock info for this variant
        initialStockInfo[variant.name] = {
          initialStock: variant.stock,
          currentStock: calculatedCurrentStock,
          stockPercentage: remainingPercentage * 100,
          decayRate: hourlyDecayRate,
          timeRemaining: remainingPercentage * variantDecayPeriod,
          isLowStock: calculatedCurrentStock <= 15,
          isActive: false,
          startTime: startTime, // Use provided start time
          lastRefilledAt: 0, // Initialize last refilled timestamp
          refillCooldown: refillCooldown, // Set refill cooldown period
          decayPeriod: variantDecayPeriod // Store the variant-specific decay period
        };
        
        console.info(`Initialized variant ${variant.name} with start time: ${new Date(startTime).toLocaleTimeString()}, elapsed: ${(elapsedMs / 3600000).toFixed(2)} hours, remaining stock: ${calculatedCurrentStock.toFixed(2)}, percentage: ${(remainingPercentage * 100).toFixed(2)}%`);
        
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
              variant.currentStock <= 1 && 
              (!variant.lastRefilledAt || now - variant.lastRefilledAt > variant.refillCooldown!)) {
            
            // Calculate the refill amount based on the refill percentage
            const refillAmount = Math.ceil(variant.initialStock * (refillPercentage / 100));
            
            // Refill the stock
            newInfo[variantName] = {
              ...variant,
              currentStock: refillAmount,
              stockPercentage: (refillAmount / variant.initialStock) * 100,
              timeRemaining: (refillAmount / variant.initialStock) * variant.decayPeriod,
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
            // Calculate elapsed time since the start in milliseconds
            const elapsedMs = now - variant.startTime;
            
            // Calculate the time remaining percentage - exactly proportional to time elapsed
            const remainingPercentage = Math.max(0, 1 - (elapsedMs / variant.decayPeriod));
            
            // Calculate stock directly based on time percentage
            // This makes stock directly proportional to the time remaining
            const newStock = variant.initialStock * remainingPercentage;
            
            // Calculate remaining time proportionally to the decay period
            const remainingTime = remainingPercentage * variant.decayPeriod;
            
            // Calculate stock percentage for the progress bar (same as time percentage)
            const percentage = remainingPercentage * 100;
            
            // Only update if there's an actual change to avoid unnecessary re-renders
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
    console.info(`Activating variant: ${variantName}`);
    
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
      if (!updated[variantName]) {
        console.error(`Variant ${variantName} not found in stock info!`);
        return updated;
      }

      // Only update isActive flag, don't change the start time
      // This preserves the original start time configured for each variant
      const updatedVariant = {
        ...updated[variantName],
        isActive: true
      };
      
      updated[variantName] = updatedVariant;
      
      // Save to localStorage
      localStorage.setItem(getStorageKey(variantName), JSON.stringify(updatedVariant));
      
      console.info(`Activated variant: ${variantName} with decay rate: ${updatedVariant.decayRate} units/period and original start time: ${new Date(updatedVariant.startTime).toLocaleTimeString()}, current stock: ${Math.floor(updatedVariant.currentStock)}`);
      
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
      
      // Find the correct decay period for this variant
      const variantDecayPeriod = variant.decayPeriod || decayPeriod;
      
      const updatedVariant = {
        ...prev[variantName],
        initialStock: variant.stock,
        currentStock: variant.stock,
        stockPercentage: 100,
        timeRemaining: variantDecayPeriod,
        startTime: Date.now(), // Update to current time
        lastRefilledAt: Date.now(), // Reset the refill timestamp
        decayPeriod: variantDecayPeriod // Ensure correct decay period is set
      };
      
      // Save to localStorage
      localStorage.setItem(getStorageKey(variantName), JSON.stringify(updatedVariant));
      
      console.info(`Reset variant: ${variantName} to initial stock with decay period: ${variantDecayPeriod/3600000} hours`);
      
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
          // Find the correct decay period for this variant
          const variantDecayPeriod = variant.decayPeriod || decayPeriod;
          
          const updatedVariant = {
            ...updated[variant.name],
            initialStock: variant.stock,
            currentStock: variant.stock,
            stockPercentage: 100,
            timeRemaining: variantDecayPeriod,
            startTime: Date.now(), // Update to current time
            lastRefilledAt: Date.now(), // Reset the refill timestamp
            isActive: updated[variant.name].isActive, // Preserve active state
            decayPeriod: variantDecayPeriod // Ensure correct decay period is set
          };
          
          updated[variant.name] = updatedVariant;
          
          // Save to localStorage
          localStorage.setItem(getStorageKey(variant.name), JSON.stringify(updatedVariant));
        }
      });
      
      console.info("Reset all variants to initial stock with current timestamp");
      
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
        timeRemaining: (refillAmount / variant.initialStock) * variant.decayPeriod,
        isLowStock: refillAmount <= 15,
        lastRefilledAt: Date.now() // Update the refill timestamp to current time
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
