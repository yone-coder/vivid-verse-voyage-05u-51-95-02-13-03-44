import React, { useState, useRef, useEffect } from 'react';

// Create blob URL for iframe content - moved outside component
const createIframeUrl = () => {
  const iframeContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Checkout</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        background: #fafafa;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: #1f2937;
      }

      .payment-container {
        background: white;
        border-radius: 16px;
        padding: 48px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        border: 1px solid #f3f4f6;
      }

      .hide {
        display: none !important;
      }

      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
      }

      .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid #f3f4f6;
        border-top: 2px solid #6b7280;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        color: #6b7280;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .div_input {
        width: 100%;
        height: 44px;
        background: #fafafa;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0 14px;
        font-size: 15px;
        color: #1f2937;
        transition: all 0.15s ease;
        outline: none;
        display: flex;
        align-items: center;
      }

      .div_input:focus-within {
        border-color: #000;
        background: #fff;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .purchase-btn {
        width: 100%;
        height: 44px;
        background: #000;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        margin-top: 8px;
      }

      .purchase-btn:hover:not(:disabled) {
        background: #1f2937;
      }

      .purchase-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .paypal-buttons {
        margin-bottom: 24px;
      }

      .divider {
        display: flex;
        align-items: center;
        margin: 24px 0;
        color: #9ca3af;
        font-size: 13px;
        font-weight: 500;
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #e5e7eb;
      }

      .divider span {
        padding: 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .alert {
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 500;
        position: relative;
      }

      .alert-success {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
      }

      .alert-error {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }

      .alert-warning {
        background: #fffbeb;
        color: #d97706;
        border: 1px solid #fed7aa;
      }

      .close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        color: inherit;
        font-size: 16px;
        cursor: pointer;
        opacity: 0.6;
        padding: 2px;
        line-height: 1;
      }

      .close-btn:hover {
        opacity: 1;
      }

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 32px;
        letter-spacing: -0.5px;
      }

      #payment_options {
        margin-top: 16px;
      }

      .ms-alert {
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        position: relative;
      }

      .ms-alert.ms-action {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
      }

      .ms-alert.ms-action2 {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }

      .ms-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        color: inherit;
        font-size: 16px;
        cursor: pointer;
        opacity: 0.6;
        padding: 2px;
        line-height: 1;
      }

      .ms-close:hover {
        opacity: 1;
      }

      .ms-close::before {
        content: '×';
      }
    </style>
  </head>
  <body>
    <div class="payment-container">
      <h1 class="title">Checkout</h1>
      
      <div id="alerts"></div>
      
      <div id="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      
      <div id="content" class="hide">
        <div id="payment_options" class="paypal-buttons"></div>
        
        <div class="divider">
          <span>or pay with card</span>
        </div>
        
        <div id="card-form">
          <div class="form-group">
            <label class="form-label" for="card-number">Card Number</label>
            <div class="div_input" id="card-number"></div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="expiration-date">Expiry</label>
              <div class="div_input" id="expiration-date"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="cvv">CVV</label>
              <div class="div_input" id="cvv"></div>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <div class="div_input" id="email" placeholder="your@email.com"></div>
          </div>
          
          <button class="purchase-btn" type="submit" id="purchase-btn">
            Complete Purchase
          </button>
        </div>
      </div>
    </div>

    <script>
      // Configuration - Update this URL to your deployed backend
      const BACKEND_URL = 'https://paypal-with-nodejs.onrender.com'; // Change this to your Render.com URL

      // Helper / Utility functions
      let current_customer_id;
      let order_id;
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
      let reset_purchase_button = () => {
          document.querySelector("#purchase-btn").removeAttribute("disabled");
          document.querySelector("#purchase-btn").textContent = "Complete Purchase";
      }

      const is_user_logged_in = () => {
        return new Promise((resolve) => {
          current_customer_id = ""; // No localStorage usage
          resolve();
        });
      }

      const get_client_token = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(\`\${BACKEND_URL}/get_client_token\`, {
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

      let handle_close = (event) => {
          event.target.closest(".ms-alert").remove();
      }
      let handle_click = (event) => {
          if (event.target.classList.contains("ms-close")) {
              handle_close(event);
          }
      }
      document.addEventListener("click", handle_click);

      const paypal_sdk_url = "https://www.paypal.com/sdk/js";
      const client_id = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
      const currency = "USD";
      const intent = "capture";

      let display_error_alert = () => {
          document.getElementById("alerts").innerHTML = \`<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>An error occurred. Please try again.</p></div>\`;
      }

      let display_success_message = (object) => {
          order_details = object.order_details;
          paypal_buttons = object.paypal_buttons;
          console.log(order_details);
          let intent_object = intent === "authorize" ? "authorizations" : "captures";
          
          document.getElementById("alerts").innerHTML = \`<div class='ms-alert ms-action'>Payment successful! Thank you \` + (order_details?.payer?.name?.given_name || '') + \` \` + (order_details?.payer?.name?.surname || '') + \`</div>\`;

          paypal_buttons.close();
          document.getElementById("card-form").classList.add("hide");
          
          // Notify parent window of successful payment
          window.parent.postMessage({ 
            type: 'PAYMENT_SUCCESS', 
            orderDetails: order_details 
          }, '*');
      }

      //PayPal Code
      is_user_logged_in()
      .then(() => {
          return get_client_token();
      })
      .then((client_token) => {
          return script_to_head({"src": paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent + "&components=buttons,hosted-fields", "data-client-token": client_token})
      })
      .then(() => {
          document.getElementById("loading").classList.add("hide");
          document.getElementById("content").classList.remove("hide");
          let paypal_buttons = paypal.Buttons({
              onClick: (data) => {
                  // Custom JS here
              },
              style: {
                  shape: 'rect',
                  color: 'black',
                  layout: 'vertical',
                  label: 'paypal',
                  height: 44
              },

              createOrder: function(data, actions) {
                  const orderAmount = window.orderAmount || '100.00';
                  return fetch(\`\${BACKEND_URL}/create_order\`, {
                      method: "post", 
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                      body: JSON.stringify({ "intent": intent, "amount": orderAmount })
                  })
                  .then((response) => response.json())
                  .then((order) => { return order.id; });
              },

              onApprove: function(data, actions) {
                  order_id = data.orderID;
                  console.log(data);
                  return fetch(\`\${BACKEND_URL}/complete_order\`, {
                      method: "post", 
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                      body: JSON.stringify({
                          "intent": intent,
                          "order_id": order_id
                      })
                  })
                  .then((response) => response.json())
                  .then((order_details) => {
                      display_success_message({"order_details": order_details, "paypal_buttons": paypal_buttons});
                   })
                   .catch((error) => {
                      console.log(error);
                      display_error_alert()
                   });
              },

              onCancel: function (data) {
                  document.getElementById("alerts").innerHTML = \`<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>Payment cancelled</p></div>\`;
                  
                  // Notify parent window of cancelled payment
                  window.parent.postMessage({ 
                    type: 'PAYMENT_CANCELLED' 
                  }, '*');
              },

              onError: function(err) {
                  console.log(err);
                  
                  // Notify parent window of payment error
                  window.parent.postMessage({ 
                    type: 'PAYMENT_ERROR', 
                    error: err 
                  }, '*');
              }
          });
          paypal_buttons.render('#payment_options');
          
          // Hosted Fields
          if (paypal.HostedFields.isEligible()) {
              paypal_hosted_fields = paypal.HostedFields.render({
                createOrder: () => {
                  const orderAmount = window.orderAmount || '100.00';
                  return fetch(\`\${BACKEND_URL}/create_order\`, {
                      method: "post", 
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                      body: JSON.stringify({ "intent": intent, "amount": orderAmount })
                  })
                  .then((response) => response.json())
                  .then((order) => { order_id = order.id; return order.id; });
                },
                styles: {
                  '.valid': {
                    color: 'green'
                  },
                  '.invalid': {
                    color: 'red'
                  },
                  'input': {
                      'font-size': '15px',
                      'color': '#1f2937'
                  },
                },
                fields: {
                  number: {
                    selector: "#card-number",
                    placeholder: "1234 5678 9012 3456"
                  },
                  cvv: {
                    selector: "#cvv",
                    placeholder: "123"
                  },
                  expirationDate: {
                    selector: "#expiration-date",
                    placeholder: "MM/YY"
                  }
                }
              }).then((card_fields) => {
               document.querySelector("#purchase-btn").addEventListener("click", (event) => {
                  event.preventDefault();
                  document.querySelector("#purchase-btn").setAttribute("disabled", "");
                  document.querySelector("#purchase-btn").textContent = "Processing...";
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
                    })
                    .then(() => {
                      return fetch(\`\${BACKEND_URL}/complete_order\`, {
                          method: "post", 
                          headers: { "Content-Type": "application/json; charset=utf-8" },
                          body: JSON.stringify({
                              "intent": intent,
                              "order_id": order_id,
                              "email": document.getElementById("email").value
                          })
                      })
                      .then((response) => response.json())
                      .then((order_details) => {
                          display_success_message({"order_details": order_details, "paypal_buttons": paypal_buttons});
                       })
                       .catch((error) => {
                          console.log(error);
                          display_error_alert();
                       });
                    })
                    .catch((err) => {
                      console.log(err);
                      reset_purchase_button();
                      display_error_alert();
                    });
                });
              });
            }
      })
      .catch((error) => {
          reset_purchase_button();
      });
    </script>
  </body>
</html>`;

  const blob = new Blob([iframeContent], { type: 'text/html' });
  return URL.createObjectURL(blob);
};

const PayPalCheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const amount = '100.00'; // Static amount

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('Payment successful:', event.data.orderDetails);
        alert(`Payment successful! Order ID: ${event.data.orderDetails.id}`);
      } else if (event.data.type === 'PAYMENT_CANCELLED') {
        console.log('Payment cancelled');
        alert('Payment was cancelled');
      } else if (event.data.type === 'PAYMENT_ERROR') {
        console.log('Payment error:', event.data.error);
        alert('Payment error occurred');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    // Set the static amount in the iframe
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.orderAmount = amount;
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Secure Checkout</h1>
                <p className="text-slate-600 text-sm">Complete your purchase safely</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-lg">
                ${amount}
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <span className="text-slate-700 font-medium">Cart</span>
            </div>
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <span className="text-blue-600 font-semibold">Payment</span>
            </div>
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-300 text-slate-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <span className="text-slate-500">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Iframe Container */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <div className="text-center">
                <p className="text-slate-700 font-semibold">Loading Payment Options</p>
                <p className="text-slate-500 text-sm">Setting up secure checkout...</p>
              </div>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={createIframeUrl()}
          className="w-full h-[calc(100vh-200px)] border-0"
          onLoad={handleIframeLoad}
          title="PayPal Checkout"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>256-bit SSL encryption</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zm-2 0a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>PCI DSS compliant</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalCheckoutPage;