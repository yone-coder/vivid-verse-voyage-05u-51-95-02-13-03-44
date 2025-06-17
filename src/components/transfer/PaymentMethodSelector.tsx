
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { TransferData } from '@/pages/MobileMultiStepTransferSheetPage';

interface PaymentMethodSelectorProps {
  transferData: TransferData;
  onPaymentSubmit: () => void;
  isPaymentLoading: boolean;
  isPaymentFormValid: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  transferData,
  onPaymentSubmit,
  isPaymentLoading,
  isPaymentFormValid
}) => {
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';

  // PayPal integration effect
  useEffect(() => {
    if (paypalContainerRef.current && transferData.transferType === 'international') {
      // Clear any existing content
      const container = paypalContainerRef.current;

      // Add PayPal checkout styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        :root {
          --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --bg-secondary: #1e1b2e;
          --bg-card: #ffffff;
          --bg-glass: rgba(255, 255, 255, 0.95);
          --text-primary: #1a1d29;
          --text-secondary: #6b7394;
          --text-muted: #9ca3c4;
          --accent-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --accent-secondary: #667eea;
          --border: #e2e8f0;
          --border-focus: #667eea;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --success: #10b981;
          --success-bg: #d1fae5;
          --error: #ef4444;
          --error-bg: #fee2e2;
          --border-radius-sm: 12px;
          --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .checkout-container {
          width: 100%;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          position: relative;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-input, .form-field {
          width: 100%;
          padding: 1rem 1.125rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          color: var(--text-primary);
          font-size: 1rem;
          font-family: inherit;
          font-weight: 500;
          transition: var(--transition);
          box-shadow: none;
        }

        .form-input:focus, .form-field:focus {
          outline: none;
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }

        .card-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-row {
          display: flex;
          gap: 0.75rem;
        }

        .card-row .card-field {
          flex: 1;
        }

        .card-field {
          padding: 1rem 1.125rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--border-radius-sm);
          transition: var(--transition);
          min-height: 56px;
          display: flex;
          align-items: center;
          width: 100%;
          box-shadow: none;
        }

        .card-field:focus-within {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .card-field iframe {
          border: none !important;
          outline: none !important;
          width: 100% !important;
          height: 24px !important;
        }

        .pay-button {
          display: none !important;
        }

        .alert {
          padding: 1rem 1.25rem;
          border-radius: var(--border-radius-sm);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          border: none;
        }

        .alert-success {
          background: var(--success-bg);
          color: var(--success);
        }

        .alert-error {
          background: var(--error-bg);
          color: var(--error);
        }

        .alert-close {
          position: absolute;
          top: 0.75rem;
          right: 1rem;
          background: none;
          border: none;
          color: inherit;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.7;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 0 auto;
        }

        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .skeleton-card-row {
          display: flex;
          gap: 0.75rem;
        }

        .skeleton-card-row .skeleton-shimmer {
          flex: 1;
        }

        .hide {
          display: none !important;
        }

        .security-info {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
          padding: 0.5rem 1rem;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 50px;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .security-icon {
          width: 16px;
          height: 16px;
          color: var(--success);
        }
      `;
      document.head.appendChild(styleElement);

      // Create the checkout HTML structure
      const checkoutHTML = `
        <div class="checkout-container">
          <div id="alerts"></div>
          
          <div id="loading" class="loading-container">
            <div class="skeleton-form">
              <div class="form-group">
                <div class="skeleton-shimmer h-4 w-24 mb-2 rounded"></div>
                <div class="skeleton-shimmer h-12 w-full rounded-xl"></div>
              </div>

              <div class="form-group">
                <div class="skeleton-shimmer h-4 w-32 mb-2 rounded"></div>
                <div class="space-y-3">
                  <div class="skeleton-shimmer h-12 w-full rounded-xl"></div>
                  <div class="skeleton-card-row">
                    <div class="skeleton-shimmer h-12 rounded-xl"></div>
                    <div class="skeleton-shimmer h-12 rounded-xl"></div>
                  </div>
                </div>
              </div>

              <div class="skeleton-shimmer h-12 w-full rounded-xl mt-4"></div>

              <div class="mt-8 text-center">
                <div class="skeleton-shimmer h-8 w-32 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>

          <div id="content" class="hide">
            <form id="card-form" class="payment-form">
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" class="form-input" placeholder="your@email.com" required />
              </div>

              <div class="form-group">
                <label class="form-label">Card Information</label>
                <div class="card-group">
                  <div class="card-field" id="card-number"></div>
                  <div class="card-row">
                    <div class="card-field" id="expiration-date"></div>
                    <div class="card-field" id="cvv"></div>
                  </div>
                </div>
              </div>
            </form>

            <div class="security-info">
              <div class="security-badge">
                <svg class="security-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                </svg>
                Secured by PayPal
              </div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = checkoutHTML;

      // Add PayPal integration script
      const script = document.createElement('script');
      script.innerHTML = `
        let current_customer_id;
        let order_id;
        let currentPrice = null;
        let paypal_hosted_fields = null;

        const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";
        const paypal_sdk_url = "https://www.paypal.com/sdk/js";
        const client_id = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
        const currency = "USD";
        const intent = "capture";

        const validatePaymentForm = () => {
          const emailInput = document.getElementById("email");
          const cardNumberField = document.getElementById("card-number");
          const expirationField = document.getElementById("expiration-date");
          const cvvField = document.getElementById("cvv");
          
          const isEmailValid = emailInput && emailInput.value && emailInput.value.includes('@');
          const hasCardFields = cardNumberField && expirationField && cvvField;
          
          if (emailInput && emailInput.value) {
            window.dispatchEvent(new CustomEvent('emailCaptured', {
              detail: { email: emailInput.value }
            }));
          }
          
          const validationEvent = new CustomEvent('paymentFormValidation', {
            detail: { isValid: isEmailValid && hasCardFields }
          });
          window.dispatchEvent(validationEvent);
        };

        const addFormValidationListeners = () => {
          const emailInput = document.getElementById("email");
          if (emailInput) {
            emailInput.addEventListener('input', validatePaymentForm);
            emailInput.addEventListener('blur', validatePaymentForm);
          }
          
          setTimeout(validatePaymentForm, 100);
        };

        let reset_purchase_button = () => {
            const btn = document.querySelector("#card-form").querySelector("button[type='submit']");
            if (btn) {
              btn.removeAttribute("disabled");
              const buttonText = currentPrice ? \`Pay \${currentPrice.display}\` : "Pay Now";
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

              const client_token = await response.text();
              resolve(client_token);
            } catch (error) {
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
            
            const errorEvent = new CustomEvent('paymentError', {
              detail: { message: message }
            });
            window.dispatchEvent(errorEvent);
        }

        let display_success_message = (order_details) => {
            const alertsContainer = document.getElementById("alerts");
            if (alertsContainer) {
              alertsContainer.innerHTML = \`<div class='alert alert-success'>Payment successful! Your transfer has been initiated.</div>\`;
            }

            const cardForm = document.getElementById("card-form");
            if (cardForm) {
              cardForm.classList.add("hide");
            }

            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('paymentSuccess', { 
                detail: { orderDetails: order_details } 
              }));
            }, 2000);
        }

        is_user_logged_in()
        .then(() => {
            return fetchCurrentPrice();
        })
        .then((priceData) => {
            return get_client_token();
        })
        .then((client_token) => {
            return script_to_head({
                "src": paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent + "&components=hosted-fields", 
                "data-client-token": client_token
            });
        })
        .then(() => {
            const loadingElement = document.getElementById("loading");
            const contentElement = document.getElementById("content");
            
            if (loadingElement) loadingElement.classList.add("hide");
            if (contentElement) contentElement.classList.remove("hide");

            if (window.paypal && window.paypal.HostedFields.isEligible()) {
                paypal_hosted_fields = window.paypal.HostedFields.render({
                  createOrder: () => {
                    return fetch(\`\${API_BASE_URL}/create_order\`, {
                        method: "post", 
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: JSON.stringify({ 
                            "intent": intent,
                            "amount": currentPrice ? currentPrice.value : null
                        })
                    })
                    .then((response) => response.json())
                    .then((order) => { 
                        order_id = order.id; 
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
                    ':focus': { 'color': '#1a1a21' },
                    '.valid': { 'color': '#1a1a21' },
                    '.invalid': { 'color': '#dc2626' }
                  },
                  fields: {
                    number: { selector: "#card-number", placeholder: "1234 1234 1234 1234" },
                    cvv: { selector: "#cvv", placeholder: "CVC" },
                    expirationDate: { selector: "#expiration-date", placeholder: "MM / YY" }
                  }
                }).then((card_fields) => {
                  setTimeout(addFormValidationListeners, 500);
                  
                  card_fields.on('validityChange', validatePaymentForm);
                  card_fields.on('inputSubmitRequest', validatePaymentForm);
                  
                  const cardForm = document.querySelector("#card-form");
                  if (cardForm) {
                    cardForm.addEventListener("submit", (event) => {
                      event.preventDefault();

                      const submitBtn = cardForm.querySelector("button[type='submit']");
                      if (submitBtn) {
                        submitBtn.setAttribute("disabled", "");
                        submitBtn.textContent = "Processing...";
                      }

                      card_fields.submit({
                          cardholderName: "Transfer Customer",
                          billingAddress: {
                            streetAddress: "123 Springfield Rd",
                            extendedAddress: "",
                            region: "AZ",
                            locality: "CHANDLER",
                            postalCode: "85224",
                            countryCodeAlpha2: "US",
                          },
                        })
                        .then(() => {
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
                          .then((response) => response.json())
                          .then((order_details) => {
                              console.log('PayPal order completed:', order_details);
                              display_success_message(order_details);
                           })
                           .catch((error) => {
                              console.error('PayPal order completion error:', error);
                              display_error_alert("Payment processing failed. Please try again.");
                              reset_purchase_button();
                           });
                        })
                        .catch((err) => {
                          console.error('PayPal card submission error:', err);
                          reset_purchase_button();
                          display_error_alert("Card validation failed. Please check your information.");
                        });
                    });
                  }
                });
              } else {
                display_error_alert("Card payments are not supported in this browser.");
              }
        })
        .catch((error) => {
            console.error('PayPal initialization error:', error);
            reset_purchase_button();
            display_error_alert("Failed to initialize payment system. Please refresh the page.");
        });

        function fetchCurrentPrice() {
          const priceData = {
            value: "${transferData.amount}",
            display: "$" + parseFloat("${transferData.amount}").toFixed(2),
            currency: "USD"
          };
          currentPrice = priceData;
          const submitBtn = document.querySelector('.pay-button');
          if (submitBtn) {
            submitBtn.textContent = \`Pay \${priceData.display}\`;
          }
          return Promise.resolve(priceData);
        }

        function script_to_head(attributes_object) {
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
      `;

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    }
  }, [transferData.amount, transferData.transferType]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Payment</h2>
        <p className="text-gray-600 leading-relaxed">
          Sending <span className="font-semibold text-blue-600">
            {transferData.transferType === 'national'
              ? `HTG ${receiverAmount}`
              : `$${transferData.amount}`
            }
          </span> to{' '}
          <span className="font-semibold text-gray-900">
            {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
          </span>
        </p>
      </div>

      {/* Payment Method Based on Transfer Type */}
      {transferData.transferType === 'national' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Recipient:</span>
              <span className="font-medium">
                {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">HTG {receiverAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transfer Type:</span>
              <span className="font-medium capitalize">National</span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">MonCash Payment</h4>
            <p className="text-sm text-red-700 mb-3">
              You will be redirected to MonCash to complete your payment securely.
            </p>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Make sure you have your MonCash account ready</li>
              <li>• Have sufficient funds in your MonCash wallet</li>
              <li>• Complete the payment on MonCash website</li>
              <li>• You will be redirected back after payment</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* PayPal Checkout Container (Form) */}
          <div ref={paypalContainerRef}></div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
