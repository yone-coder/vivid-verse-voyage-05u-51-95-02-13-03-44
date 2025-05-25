
export const PAYPAL_CONFIG = {
  clientId: "AVHblE6HlBNWN_oyhv9PBWS_TfIhJCM5rSc8TaV4j6kggMNM6I5YJQxxCsJGcxV-bCl3dF6FHGX8IqCo", // Sandbox client ID
  currency: "USD",
  intent: "capture",
  components: "buttons,card-fields",
  enableFunding: "venmo",
  buyerCountry: "US"
};

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.onrender.com' 
  : 'http://localhost:8080';
