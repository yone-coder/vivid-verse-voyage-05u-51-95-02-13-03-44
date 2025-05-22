
// Configuration file for environment-specific settings

interface Config {
  PAYMENT_API_URL: string;
  NODE_API_URL: string;
  ACTIVE_BACKEND: 'supabase' | 'nodejs' | 'moncash';
}

// Default configuration for development
const defaultConfig: Config = {
  PAYMENT_API_URL: 'https://wkfzhcszhgewkvwukzes.supabase.co/functions/v1/paypal-payment',
  NODE_API_URL: 'http://localhost:3000/api/payment/create-payment',
  ACTIVE_BACKEND: 'nodejs' // Switch to 'moncash' to use the MonCash backend
};

// Production configuration can be added here if needed
const productionConfig: Config = {
  ...defaultConfig,
  // Override values for production if needed
  NODE_API_URL: 'https://your-production-nodejs-api.com/api/payment/create-payment'
};

// Determine which config to use based on environment
export const config: Config = 
  import.meta.env.PROD ? productionConfig : defaultConfig;
