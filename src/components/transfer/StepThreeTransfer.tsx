
import React, { useEffect, useRef } from 'react';
import { Shield, CreditCard } from 'lucide-react';

interface StepThreeTransferProps {
  amount: string;
}

const StepThreeTransfer: React.FC<StepThreeTransferProps> = ({ amount }) => {
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalContainerRef.current) return;

    // Clear any existing content
    paypalContainerRef.current.innerHTML = '';

    // Create the styled PayPal checkout content
    const checkoutContent = document.createElement('div');
    checkoutContent.innerHTML = `
      <div class="transfer-payment-container">
        <style>
          .transfer-payment-container {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .transfer-payment-container .payment-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }
          
          .transfer-payment-container .form-group {
            margin-bottom: 1rem;
          }
          
          .transfer-payment-container .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.375rem;
          }
          
          .transfer-payment-container .form-input {
            width: 100%;
            padding: 0.75rem;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            color: #111827;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.15s ease;
          }
          
          .transfer-payment-container .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .transfer-payment-container .card-row {
            display: flex;
            gap: 0.75rem;
            margin-top: 0.5rem;
          }
          
          .transfer-payment-container .card-field {
            flex: 1;
            padding: 0.75rem;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            transition: all 0.15s ease;
            min-height: 48px;
            display: flex;
            align-items: center;
          }
          
          .transfer-payment-container .card-field:focus-within {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .transfer-payment-container .pay-button {
            width: 100%;
            padding: 0.875rem 1rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            margin-top: 1.5rem;
            font-family: inherit;
            min-height: 48px;
          }
          
          .transfer-payment-container .pay-button:hover:not(:disabled) {
            background: #2563eb;
          }
          
          .transfer-payment-container .pay-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .transfer-payment-container .alert {
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            position: relative;
            font-size: 0.875rem;
          }
          
          .transfer-payment-container .alert-success {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            color: #15803d;
          }
          
          .transfer-payment-container .alert-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
          }
          
          .transfer-payment-container .alert-close {
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
          
          .transfer-payment-container .loading-spinner {
            width: 32px;
            height: 32px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          
          .transfer-payment-container .loading-container {
            text-align: center;
            padding: 2rem 0;
          }
          
          .transfer-payment-container .loading-text {
            margin-top: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
          }
          
          .transfer-payment-container .hide {
            display: none !important;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
        
        <div class="payment-card">
          <div id="alerts"></div>
          
          <div id="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Initializing secure payment...</p>
          </div>
          
          <div id="content" class="hide">
            <form id="card-form">
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" class="form-input" placeholder="Enter your email address" required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Card Information</label>
                <div class="card-field" id="card-number"></div>
                <div class="card-row">
                  <div class="card-field" id="expiration-date"></div>
                  <div class="card-field" id="cvv"></div>
                </div>
              </div>
              
              <button type="submit" class="pay-button">Loading...</button>
            </form>
          </div>
        </div>
      </div>
    `;

    paypalContainerRef.current.appendChild(checkoutContent);

    // Load the PayPal integration script
    const script = document.createElement('script');
    script.innerHTML = `
      // PayPal integration code
      let current_customer_id;
      let order_id;
      let currentPrice = null;
      let paypal_hosted_fields = null;

      const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";
      const paypal_sdk_url = "https://www.paypal.com/sdk/js";
      const client_id = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
      const currency = "USD";
      const intent = "capture";
      const transferAmount = "${amount}";

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

      const fetchCurrentPrice = () => {
        const priceData = {
          value: transferAmount,
          display: "$" + parseFloat(transferAmount).toFixed(2),
          currency: "USD"
        };
        
        currentPrice = priceData;
        
        const submitBtn = document.querySelector('.pay-button');
        if (submitBtn) {
          submitBtn.textContent = \`Complete Transfer \${priceData.display}\`;
        }
        
        return Promise.resolve(priceData);
      };

      const reset_purchase_button = () => {
          const btn = document.querySelector("#card-form").querySelector("button[type='submit']");
          if (btn) {
            btn.removeAttribute("disabled");
            const buttonText = currentPrice ? \`Complete Transfer \${currentPrice.display}\` : "Complete Transfer";
            btn.textContent = buttonText;
          }
      }

      const is_user_logged_in = () => {
        return new Promise((resolve) => {
          current_customer_id = "";
          resolve();
        });
      }

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

      let handle_click = (event) => {
          if (event.target.classList.contains("alert-close")) {
              event.target.closest(".alert").remove();
          }
      }

      document.addEventListener("click", handle_click);

      let display_error_alert = (message = "An error occurred. Please try again.") => {
          const alertsContainer = document.getElementById("alerts");
          if (alertsContainer) {
            alertsContainer.innerHTML = \`<div class="alert alert-error"><button class="alert-close">×</button>\${message}</div>\`;
          }
      }

      let display_success_message = (order_details) => {
          console.log('Payment completed:', order_details);
          let intent_object = intent === "authorize" ? "authorizations" : "captures";
          const firstName = order_details?.payer?.name?.given_name || '';
          const lastName = order_details?.payer?.name?.surname || '';
          const amount = order_details.purchase_units[0].payments[intent_object][0].amount.value;
          const currency = order_details.purchase_units[0].payments[intent_object][0].amount.currency_code;

          const alertsContainer = document.getElementById("alerts");
          if (alertsContainer) {
            alertsContainer.innerHTML = \`<div class='alert alert-success'>Transfer successful! Thank you \${firstName} \${lastName}. Your money transfer to Haiti has been initiated and will be available for pickup within 24-48 hours.</div>\`;
          }

          const cardForm = document.getElementById("card-form");
          if (cardForm) {
            cardForm.classList.add("hide");
          }
      }

      // Initialize the payment system
      console.log('Starting transfer payment initialization...');

      is_user_logged_in()
      .then(() => {
          console.log('User login check completed');
          return fetchCurrentPrice();
      })
      .then((priceData) => {
          console.log('Price set, now getting client token...');
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

          const loadingElement = document.getElementById("loading");
          const contentElement = document.getElementById("content");
          
          if (loadingElement) loadingElement.classList.add("hide");
          if (contentElement) contentElement.classList.remove("hide");

          if (window.paypal && window.paypal.HostedFields.isEligible()) {
              console.log('Hosted Fields are eligible, setting up...');

              paypal_hosted_fields = window.paypal.HostedFields.render({
                createOrder: () => {
                  console.log('Creating order with transfer amount...');
                  return fetch(\`\${API_BASE_URL}/create_order\`, {
                      method: "post", 
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                      body: JSON.stringify({ 
                          "intent": intent,
                          "amount": transferAmount
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
                      'color': '#111827',
                      'font-family': 'Inter, sans-serif'
                  },
                  ':focus': {
                      'color': '#111827'
                  },
                  '.valid': {
                      'color': '#111827'
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

                const cardForm = document.querySelector("#card-form");
                if (cardForm) {
                  cardForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    console.log('Form submitted, processing payment...');

                    const submitBtn = cardForm.querySelector("button[type='submit']");
                    if (submitBtn) {
                      submitBtn.setAttribute("disabled", "");
                      submitBtn.textContent = "Processing Transfer...";
                    }

                    card_fields
                      .submit({
                          cardholderName: "Transfer Customer",
                          billingAddress: {
                            streetAddress: "123 Main St",
                            extendedAddress: "",
                            region: "CA",
                            locality: "San Jose",
                            postalCode: "95131",
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
                            display_error_alert("Transfer processing failed. Please try again.");
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
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [amount]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Complete Your Transfer</h2>
        <p className="text-gray-600 text-sm">
          Transfer Amount: <span className="font-semibold">${parseFloat(amount).toFixed(2)} USD</span>
        </p>
      </div>

      {/* Security Information */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-green-800 mb-1">
              Secure Payment Processing
            </h3>
            <p className="text-xs text-green-600">
              Your payment is protected by PayPal's industry-leading security measures. 
              All transactions are encrypted and monitored for fraud.
            </p>
          </div>
        </div>
      </div>

      {/* PayPal Checkout Container */}
      <div ref={paypalContainerRef}></div>
    </div>
  );
};

export default StepThreeTransfer;
