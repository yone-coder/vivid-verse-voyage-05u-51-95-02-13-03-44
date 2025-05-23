
/// <reference types="vite/client" />

// Define PayPal global object
interface Window {
  paypal?: {
    Buttons?: any;
    [key: string]: any;
  }
}
