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
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
              ${amount}
            </span>
          </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Loading...</p>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={createIframeUrl()}
            className="w-full h-[600px] border-0 rounded-2xl shadow-sm"
            onLoad={handleIframeLoad}
            title="PayPal Checkout"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default PayPalCheckoutPage;