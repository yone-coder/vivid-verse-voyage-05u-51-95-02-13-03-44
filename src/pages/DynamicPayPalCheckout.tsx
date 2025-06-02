
import React, { useEffect } from 'react';

const DynamicPayPalCheckout: React.FC = () => {
  useEffect(() => {
    // Load the external scripts and styles
    const loadExternalResources = () => {
      // Add Google Fonts
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      // Inline JavaScript from the HTML
      const script = document.createElement('script');
      script.innerHTML = `
        // Global variables to store application state
        let current_customer_id;
        let order_id;
        let currentPrice = null; // This will store the fetched price data
        let paypal_hosted_fields = null; // Store PayPal fields instance

        // Replace this URL with your actual Render.com backend URL
        const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";

        // PayPal SDK configuration
        const paypal_sdk_url = "https://www.paypal.com/sdk/js";
        const client_id = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
        const currency = "USD";
        const intent = "capture";

        /**
         * Helper function to dynamically load PayPal SDK script
         * This is essential for PayPal's hosted fields to work properly
         */
        let script_to_head = (attributes_object) => {
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              for (const name of Object.keys(attributes_object)) {
                script.setAttribute(name, attributes_object[name]);
              }
              document.head.appendChild(script);
              script.addEventListener('load', resolve);
              script.addEventListener('error', reject);
            });
        }

        /**
         * NEW FUNCTION: Fetch current price from backend
         * This is the foundation of our dynamic pricing system
         * The server controls what price gets displayed and charged
         */
        const fetchCurrentPrice = () => {
          return fetch(\`\${API_BASE_URL}/get_price\`)
            .then(response => {
              if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
              }
              return response.json();
            })
            .then(priceData => {
              // Store the price data globally for later use
              currentPrice = priceData;

              // Update the button text with the fetched price
              const submitBtn = document.querySelector('.pay-button');
              if (submitBtn) {
                submitBtn.textContent = \`Pay \${priceData.display}\`;
              }

              console.log('Price fetched successfully:', priceData);
              return priceData;
            })
            .catch(error => {
              console.error('Error fetching price:', error);
              // Show a user-friendly error message
              display_error_alert('Unable to load current pricing. Please refresh the page.');
              throw error;
            });
        };

        /**
         * Reset the purchase button to its normal state
         * Used after successful payments or errors
         */
        let reset_purchase_button = () => {
            const btn = document.querySelector("#card-form").querySelector("button[type='submit']");
            if (btn) {
              btn.removeAttribute("disabled");
              // Use the current price data if available, otherwise fallback
              const buttonText = currentPrice ? \`Pay \${currentPrice.display}\` : "Pay Now";
              btn.textContent = buttonText;
            }
        }

        /**
         * Simulate user authentication check
         * In a real app, this would verify if user is logged in
         */
        const is_user_logged_in = () => {
          return new Promise((resolve) => {
            current_customer_id = "";
            resolve();
          });
        }

        /**
         * Get PayPal client token for hosted fields
         * This token allows secure card field rendering
         */
        const get_client_token = () => {
          return new Promise(async (resolve, reject) => {
            try {
              const response = await fetch(\`\${API_BASE_URL}/get_client_token\`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "customer_id": current_customer_id }),
              });

              if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
              }

              const client_token = await response.text();
              resolve(client_token);
            } catch (error) {
              console.error('Error getting client token:', error);
              reject(error);
            }
          });
        }

        /**
         * Event handler for closing alert messages
         */
        let handle_close = (event) => {
            event.target.closest(".alert").remove();
        }

        /**
         * Global click handler for alert close buttons
         */
        let handle_click = (event) => {
            if (event.target.classList.contains("alert-close")) {
                handle_close(event);
            }
        }

        // Register the global click handler
        document.addEventListener("click", handle_click);

        /**
         * Display error alert with custom message
         * Now accepts custom error messages for better user experience
         */
        let display_error_alert = (message = "An error occurred. Please try again.") => {
            const alertsContainer = document.getElementById("alerts");
            if (alertsContainer) {
              alertsContainer.innerHTML = \`<div class="alert alert-error"><button class="alert-close">×</button>\${message}</div>\`;
            }
        }

        /**
         * Display success message after payment completion
         * Uses the actual order details from PayPal
         */
        let display_success_message = (order_details) => {
            console.log('Payment completed:', order_details);
            let intent_object = intent === "authorize" ? "authorizations" : "captures";
            const firstName = order_details?.payer?.name?.given_name || '';
            const lastName = order_details?.payer?.name?.surname || '';
            const amount = order_details.purchase_units[0].payments[intent_object][0].amount.value;
            const currency = order_details.purchase_units[0].payments[intent_object][0].amount.currency_code;

            const alertsContainer = document.getElementById("alerts");
            if (alertsContainer) {
              alertsContainer.innerHTML = \`<div class='alert alert-success'>Payment successful! Thank you \${firstName} \${lastName}. Your NFT will be delivered to your email shortly.</div>\`;
            }

            // Hide the card form after successful payment
            const cardForm = document.getElementById("card-form");
            if (cardForm) {
              cardForm.classList.add("hide");
            }
        }

        /**
         * MAIN APPLICATION INITIALIZATION
         * This is the new flow that includes dynamic price fetching:
         * 1. Check user login status
         * 2. Fetch current price from server
         * 3. Get PayPal client token
         * 4. Load PayPal SDK
         * 5. Initialize payment form
         */
        console.log('Starting application initialization...');

        is_user_logged_in()
        .then(() => {
            console.log('User login check completed');
            // NEW: Fetch price before proceeding
            return fetchCurrentPrice();
        })
        .then((priceData) => {
            console.log('Price fetched, now getting client token...');
            return get_client_token();
        })
        .then((client_token) => {
            console.log('Client token received, loading PayPal SDK...');
            return script_to_head({
                "src": paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent + "&components=hosted-fields", 
                "data-client-token": client_token
            });
        })
        .then(() => {
            console.log('PayPal SDK loaded, initializing payment form...');

            // Hide loading spinner and show the form
            const loadingElement = document.getElementById("loading");
            const contentElement = document.getElementById("content");
            
            if (loadingElement) loadingElement.classList.add("hide");
            if (contentElement) contentElement.classList.remove("hide");

            // Initialize PayPal Hosted Fields (only if eligible)
            if (window.paypal && window.paypal.HostedFields.isEligible()) {
                console.log('Hosted Fields are eligible, setting up...');

                // Render PayPal hosted card fields
                paypal_hosted_fields = window.paypal.HostedFields.render({
                  createOrder: () => {
                    console.log('Creating order with current price...');
                    return fetch(\`\${API_BASE_URL}/create_order\`, {
                        method: "post", 
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: JSON.stringify({ 
                            "intent": intent,
                            // Pass the current price to ensure consistency
                            "amount": currentPrice ? currentPrice.value : null
                        })
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(\`HTTP error! status: \${response.status}\`);
                        }
                        return response.json();
                    })
                    .then((order) => { 
                        order_id = order.id; 
                        console.log('Order created with ID:', order_id);
                        return order.id; 
                    });
                  },
                  styles: {
                    'input': {
                        'font-size': '16px',
                        'color': '#1a1a21',
                        'font-family': 'Inter, sans-serif',
                        'font-weight': '400'
                    },
                    ':focus': {
                        'color': '#1a1a21'
                    },
                    '.valid': {
                        'color': '#1a1a21'
                    },
                    '.invalid': {
                        'color': '#dc2626'
                    }
                  },
                  fields: {
                    number: {
                      selector: "#card-number",
                      placeholder: "1234 1234 1234 1234"
                    },
                    cvv: {
                      selector: "#cvv",
                      placeholder: "CVC"
                    },
                    expirationDate: {
                      selector: "#expiration-date",
                      placeholder: "MM / YY"
                    }
                  }
                }).then((card_fields) => {
                  console.log('Hosted Fields rendered successfully');

                  // Set up form submission handler
                  const cardForm = document.querySelector("#card-form");
                  if (cardForm) {
                    cardForm.addEventListener("submit", (event) => {
                      event.preventDefault();
                      console.log('Form submitted, processing payment...');

                      const submitBtn = cardForm.querySelector("button[type='submit']");
                      if (submitBtn) {
                        submitBtn.setAttribute("disabled", "");
                        submitBtn.textContent = "Processing...";
                      }

                      // Submit the card fields data to PayPal
                      card_fields
                        .submit({
                            cardholderName: "Raúl Uriarte, Jr.",
                            billingAddress: {
                              streetAddress: "123 Springfield Rd",
                              extendedAddress: "",
                              region: "AZ",
                              locality: "CHANDLER",
                              postalCode: "85224",
                              countryCodeAlpha2: "US",
                            },
                          }
                        )
                        .then(() => {
                          console.log('Card fields submitted, completing order...');
                          const emailInput = document.getElementById("email");
                          return fetch(\`\${API_BASE_URL}/complete_order\`, {
                              method: "post", 
                              headers: { "Content-Type": "application/json; charset=utf-8" },
                              body: JSON.stringify({
                                  "intent": intent,
                                  "order_id": order_id,
                                  "email": emailInput ? emailInput.value : ""
                              })
                          })
                          .then((response) => {
                              if (!response.ok) {
                                  throw new Error(\`HTTP error! status: \${response.status}\`);
                              }
                              return response.json();
                          })
                          .then((order_details) => {
                              console.log('Order completed successfully');
                              display_success_message(order_details);
                           })
                           .catch((error) => {
                              console.error('Error completing order:', error);
                              display_error_alert("Payment processing failed. Please try again.");
                              reset_purchase_button();
                           });
                        })
                        .catch((err) => {
                          console.error('Error submitting card fields:', err);
                          reset_purchase_button();
                          display_error_alert("Card validation failed. Please check your information.");
                        });
                    });
                  }
                });
              } else {
                console.error('Hosted Fields not eligible in this browser');
                const alertsContainer = document.getElementById("alerts");
                if (alertsContainer) {
                  alertsContainer.innerHTML = \`<div class="alert alert-error"><button class="alert-close">×</button>Card payments are not supported in this browser.</div>\`;
                }
              }
        })
        .catch((error) => {
            console.error('Application initialization failed:', error);
            reset_purchase_button();
            display_error_alert("Failed to initialize payment system. Please refresh the page.");
        });
      `;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(fontLink);
        document.head.removeChild(script);
      };
    };

    loadExternalResources();
  }, []);

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

        @keyframes loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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
          {/* Alerts */}
          <div id="alerts"></div>

          {/* Loading State */}
          <div id="loading" className="loading-container">
            <div className="spinner"></div>
          </div>

          {/* Payment Form */}
          <div id="content" className="hide">
            <form id="card-form" className="payment-form">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-input" placeholder="Enter your email" required />
              </div>

              {/* Card Information */}
              <div className="form-group">
                <label className="form-label">Card information</label>
                <div className="card-field" id="card-number"></div>
                <div className="card-row">
                  <div className="card-field" id="expiration-date"></div>
                  <div className="card-field" id="cvv"></div>
                </div>
              </div>

              {/* Button text will be populated dynamically */}
              <button type="submit" className="pay-button">Loading...</button>
            </form>

            {/* Security Info */}
            <div className="security-info">
              <div className="security-badge">
                <svg className="security-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                Secured by PayPal
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicPayPalCheckout;