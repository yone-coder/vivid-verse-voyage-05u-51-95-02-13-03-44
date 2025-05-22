
// Configuration file for environment-specific settings

interface Config {
  PAYMENT_API_URL: string;
}

// Default configuration for development
const defaultConfig: Config = {
  PAYMENT_API_URL: 'https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment',
};

// Production configuration can be added here if needed
const productionConfig: Config = {
  ...defaultConfig,
  // Override values for production if needed
};

// Determine which config to use based on environment
export const config: Config = 
  import.meta.env.PROD ? productionConfig : defaultConfig;
