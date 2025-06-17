
// Using a reliable exchange rate API for live USD to HTG conversion
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const FALLBACK_API_URL = 'https://api.fxratesapi.com/latest?base=USD&symbols=HTG';

// Our service fee adjustment (optional - can be removed if you want pure BRH rates)
const RATE_ADJUSTMENT = 1.0; // No adjustment for now, pure market rate

export interface ExchangeRateData {
  usdToHtg: number;
  originalRate: number;
  lastUpdated: Date;
  isLive: boolean;
}

// Cache the exchange rate data
let cachedRateData: ExchangeRateData | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Get the current USD to HTG exchange rate from live sources
 */
export const getExchangeRate = async (): Promise<ExchangeRateData> => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedRateData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedRateData;
  }
  
  try {
    // Try primary API first
    let response;
    let htgRate;
    
    try {
      response = await fetch(EXCHANGE_API_URL);
      const data = await response.json();
      htgRate = data.rates?.HTG;
    } catch (error) {
      console.log('Primary API failed, trying fallback...');
      // Try fallback API
      response = await fetch(FALLBACK_API_URL);
      const data = await response.json();
      htgRate = data.rates?.HTG;
    }
    
    if (!htgRate || isNaN(htgRate)) {
      throw new Error('Invalid HTG rate received from API');
    }
    
    // Apply any rate adjustment if needed
    const adjustedRate = htgRate * RATE_ADJUSTMENT;
    
    cachedRateData = {
      usdToHtg: adjustedRate,
      originalRate: htgRate,
      lastUpdated: new Date(),
      isLive: true
    };
    
    lastFetchTime = now;
    console.log('Live USD to HTG rate fetched:', adjustedRate);
    return cachedRateData;
    
  } catch (error) {
    console.error('Failed to fetch live exchange rate:', error);
    
    // If we can't get a live rate, return cached rate or fallback
    if (cachedRateData) {
      return {
        ...cachedRateData,
        isLive: false
      };
    }
    
    // Final fallback rate
    const fallbackRate = 127.5;
    return {
      usdToHtg: fallbackRate,
      originalRate: fallbackRate,
      lastUpdated: new Date(),
      isLive: false
    };
  }
};

/**
 * Convert USD to HTG using live exchange rate
 */
export const convertUsdToHtg = async (usdAmount: number): Promise<number> => {
  const { usdToHtg } = await getExchangeRate();
  return usdAmount * usdToHtg;
};
