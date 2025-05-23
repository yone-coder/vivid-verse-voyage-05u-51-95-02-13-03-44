
/// <reference types="vite/client" />

// Define PayPal global object
interface Window {
  paypal?: {
    Buttons: (options: any) => { render: (element: HTMLElement | null) => void };
    [key: string]: any;
  }
}
