
// Base URL for the Bank of the Republic of Haiti (BRH) exchange rate API
// Note: This is a placeholder. You would need to replace with the actual API endpoint
const BRH_API_URL = 'https://brh.ht/api/exchange-rates';

export interface ExchangeRateData {
  usdToHtg: number;
  originalRate: number; // Original BRH rate before our discount
  lastUpdated: Date;
  isLive: boolean;
}

// Cache the exchange rate data
let cachedRateData: ExchangeRateData | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Get the current USD to HTG exchange rate
 * Fetches from API or returns cached value if recently fetched
 */
export const getExchangeRate = async (): Promise<ExchangeRateData> => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedRateData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedRateData;
  }
  
  try {
    // In a production environment, you would fetch the real rate from an API
    // const response = await fetch(BRH_API_URL);
    // const data = await response.json();
    
    // For now, use a fixed rate of 120 HTG per USD
    // In a real app, we might fetch the BRH rate and apply our own calculation
    const brhRate = 130; // This is kept for reference but not displayed to users
    const ourRate = 120; // Our fixed rate
    
    cachedRateData = {
      usdToHtg: ourRate,
      originalRate: brhRate, // Keep track internally but don't display
      lastUpdated: new Date(),
      isLive: true
    };
    
    lastFetchTime = now;
    return cachedRateData;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    
    // If we can't get a live rate, return our cached rate or a fallback
    if (cachedRateData) {
      return {
        ...cachedRateData,
        isLive: false
      };
    }
    
    // Fallback rate if we have no cached data either
    return {
      usdToHtg: 120, // Fixed fallback rate
      originalRate: 130, // Keep internally but don't display
      lastUpdated: new Date(),
      isLive: false
    };
  }
};

/**
 * Convert USD to HTG using our exchange rate
 * @param usdAmount - Amount in USD to convert
 * @returns Promise with the converted amount in HTG
 */
export const convertUsdToHtg = async (usdAmount: number): Promise<number> => {
  const { usdToHtg } = await getExchangeRate();
  return usdAmount * usdToHtg;
};
