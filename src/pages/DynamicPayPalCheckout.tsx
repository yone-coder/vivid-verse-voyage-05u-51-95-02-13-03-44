import React, { useState, useEffect, useRef, useCallback } from 'react';

const DynamicPayPalCheckout = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formHidden, setFormHidden] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);

  // Refs for PayPal integration
  const paypalFieldsRef = useRef(null);
  const orderIdRef = useRef(null);
  const customerIdRef = useRef('');
  const initializationRef = useRef(false);

  // Configuration
  const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";
  const PAYPAL_CLIENT_ID = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
  const CURRENCY = "USD";
  const INTENT = "capture";

  // Helper function to load external scripts
  const loadScript = useCallback((attributes) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${attributes.src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
      document.head.appendChild(script);
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
    });
  }, []);

  // Fetch current price from backend
  const fetchCurrentPrice = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_price`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const priceData = await response.json();
      setCurrentPrice(priceData);
      return priceData;
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load current pricing. Please refresh the page.' });
      throw error;
    }
  }, [API_BASE_URL]);

  // Get PayPal client token
  const getClientToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_client_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerIdRef.current }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (error) {
      throw error;
    }
  }, [API_BASE_URL]);

  // Create PayPal order
  const createOrder = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/create_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          intent: INTENT,
          amount: currentPrice ? currentPrice.value : null,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const order = await response.json();
      orderIdRef.current = order.id;
      return order.id;
    } catch (error) {
      throw error;
    }
  }, [API_BASE_URL, INTENT, currentPrice]);

  // Complete PayPal order
  const completeOrder = useCallback(async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/complete_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          intent: INTENT,
          order_id: orderIdRef.current,
          email,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }, [API_BASE_URL, INTENT]);

  // Display success message
  const displaySuccessMessage = useCallback((orderDetails) => {
    const intentObject = INTENT === "authorize" ? "authorizations" : "captures";
    const firstName = orderDetails?.payer?.name?.given_name || '';
    const lastName = orderDetails?.payer?.name?.surname || '';
    setAlert({
      type: 'success',
      message: `Payment successful! Thank you ${firstName} ${lastName}. Your NFT will be delivered to your email shortly.`,
    });
    setFormHidden(true);
  }, [INTENT]);

  // Handle form submission
  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setAlert(null);

    try {
      const emailInput = document.getElementById("email");
      const email = emailInput?.value || "";
      if (!email) {
        setAlert({ type: 'error', message: 'Please enter your email address.' });
        return;
      }

      if (!paypalFieldsRef.current) {
        setAlert({ type: 'error', message: 'Payment system not ready. Please try again.' });
        return;
      }

      await paypalFieldsRef.current.submit({
        cardholderName: "Raúl Uriarte, Jr.",
        billingAddress: {
          streetAddress: "123 Springfield Rd",
          extendedAddress: "",
          region: "AZ",
          locality: "CHANDLER",
          postalCode: "85224",
          countryCodeAlpha2: "US",
        },
      });

      const orderDetails = await completeOrder(email);
      displaySuccessMessage(orderDetails);
    } catch (error) {
      setAlert({ type: 'error', message: 'Payment processing failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  }, [completeOrder, displaySuccessMessage]);

  // Initialize PayPal Hosted Fields
  const initializePayPalFields = useCallback(async () => {
    if (!window.paypal?.HostedFields?.isEligible()) {
      setAlert({ type: 'error', message: 'Card payments are not supported in this browser.' });
      return;
    }

    try {
      const hostedFields = await window.paypal.HostedFields.render({
        createOrder,
        styles: {
          input: { 'font-size': '16px', 'color': '#1a1a21', 'font-family': 'Inter, sans-serif', 'font-weight': '400' },
          ':focus': { 'color': '#1a1a21' },
          '.valid': { 'color': '#1a1a21' },
          '.invalid': { 'color': '#dc2626' },
        },
        fields: {
          number: { selector: "#card-number", placeholder: "1234 1234 1234 1234" },
          cvv: { selector: "#cvv", placeholder: "CVC" },
          expirationDate: { selector: "#expiration-date", placeholder: "MM / YY" },
        },
      });
      paypalFieldsRef.current = hostedFields;
      setPaypalReady(true);
    } catch (error) {
      setAlert({ type: 'error', message: 'PayPal fields failed to load.' });
    }
  }, [createOrder]);

  // Initialize PayPal
  const initializePayPal = useCallback(async () => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    try {
      await fetchCurrentPrice();
      const clientToken = await getClientToken();
      await loadScript({
        src: `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&enable-funding=venmo&currency=${CURRENCY}&intent=${INTENT}&components=hosted-fields`,
        "data-client-token": clientToken,
      });
      await initializePayPalFields();
      setLoading(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to initialize payment system. Please refresh the page.' });
      setLoading(false);
    }
  }, [fetchCurrentPrice, getClientToken, loadScript, initializePayPalFields, PAYPAL_CLIENT_ID, CURRENCY, INTENT]);

  // Load Google Fonts and initialize PayPal
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    initializePayPal();

    return () => {
      document.head.removeChild(fontLink);
    };
  }, [initializePayPal]);

  // Close alert handler
  const closeAlert = useCallback(() => setAlert(null), []);

  return (
    <>
      <style>{`
        :root {
          --bg-primary: #0f0f14;
          --bg-secondary: #1a1a21;
          --bg-card: #ffffff;
          --text-primary: #1a1a21;
          --text-secondary: #6b7280;
          --text-muted: #9ca3af;
          --accent-primary: #5b5bd6;
          --accent-hover: #4c4cc4;
          --success: #059669;
          --error: #dc2626;
          --border: #e5e7eb;
          --border-focus: #5b5bd6;
          --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          min-height: 100vh;
          color: var(--text-primary);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .container {
          max-width: 420px;
          margin: 0 auto;
          padding: 2rem 1rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .checkout-card {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
        }

        .payment-form {
          space-y: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.375rem;
        }

        .form-input, .form-field {
          width: 100%;
          padding: 0.75rem 0.875rem;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.15s ease;
          appearance: none;
        }

        .form-input:focus, .form-field:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(91, 91, 214, 0.1);
        }

        .form-input::placeholder {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .card-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .card-row .card-field {
          flex: 1;
        }

        .card-field {
          padding: 0.75rem 0.875rem;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          transition: all 0.15s ease;
          min-height: 48px;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .card-field:focus-within {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(91, 91, 214, 0.1);
        }

        .card-field iframe {
          border: none !important;
          outline: none !important;
          width: 100% !important;
          height: 20px !important;
        }

        .pay-button {
          width: 100%;
          padding: 0.875rem 1rem;
          background: var(--accent-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          margin-top: 1.5rem;
          font-family: inherit;
          min-height: 48px;
        }

        .pay-button:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .pay-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .alert {
          padding: 0.875rem 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          position: relative;
          font-size: 0.875rem;
        }

        .alert-success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: var(--success);
        }

        .alert-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: var(--error);
        }

        .alert-close {
          position: absolute;
          top: 0.5rem;
          right: 0.75rem;
          background: none;
          border: none;
          color: inherit;
          font-size: 1.125rem;
          cursor: pointer;
          opacity: 0.7;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .alert-close:hover {
          opacity: 1;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem 0;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 2px solid var(--border);
          border-top: 2px solid var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .hide {
          display: none !important;
        }

        .security-info {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .security-icon {
          width: 16px;
          height: 16px;
          color: var(--success);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 1rem;
          }

          .checkout-card {
            padding: 1.5rem;
          }

          .card-row {
            gap: 0.5rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="checkout-card">
          {alert && (
            <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              <button className="alert-close" onClick={closeAlert}>×</button>
              {alert.message}
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}

          {!loading && !formHidden && (
            <form id="card-form" className="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Card information</label>
                <div className="card-field" id="card-number"></div>
                <div className="card-row">
                  <div className="card-field" id="expiration-date"></div>
                  <div className="card-field" id="cvv"></div>
                </div>
              </div>

              <button
                type="submit"
                className="pay-button"
                disabled={isProcessing || !paypalReady}
              >
                {isProcessing
                  ? "Processing..."
                  : !paypalReady
                    ? "Loading Payment..."
                    : currentPrice
                      ? `Pay ${currentPrice.display}`
                      : "Pay Now"}
              </button>
            </form>
          )}

          {!loading && !formHidden && (
            <div className="security-info">
              <div className="security-badge">
                <svg className="security-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Secured by PayPal
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DynamicPayPalCheckout;