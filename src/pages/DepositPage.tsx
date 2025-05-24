
import React, { useState, useRef, useEffect } from 'react';

// Create blob URL for iframe content - moved outside component
const createIframeUrl = () => {
  const iframeContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PPCP Advanced</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .payment-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
        width: 100%;
        max-width: 480px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .hide {
        display: none !important;
      }

      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(102, 126, 234, 0.1);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .form-group {
        margin-bottom: 24px;
      }

      .form-label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
        letter-spacing: 0.025em;
      }

      .div_input {
        width: 100%;
        height: 52px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 0 16px;
        font-size: 16px;
        color: #1a202c;
        transition: all 0.2s ease;
        outline: none;
        display: flex;
        align-items: center;
      }

      .div_input:focus-within {
        border-color: #667eea;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .purchase-btn {
        width: 100%;
        height: 52px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        letter-spacing: 0.025em;
        margin-top: 12px;
      }

      .purchase-btn:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
      }

      .purchase-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }

      .paypal-buttons {
        margin-bottom: 32px;
      }

      .divider {
        display: flex;
        align-items: center;
        margin: 32px 0;
        color: #64748b;
        font-size: 14px;
        font-weight: 500;
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #e2e8f0;
      }

      .divider span {
        padding: 0 16px;
      }

      .alert {
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 500;
        position: relative;
      }

      .alert-success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .alert-error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .alert-warning {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .close-btn {
        position: absolute;
        top: 12px;
        right: 16px;
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0.8;
        padding: 4px;
        line-height: 1;
      }

      .close-btn:hover {
        opacity: 1;
      }

      .title {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 32px;
        letter-spacing: -0.025em;
      }

      #payment_options {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="payment-container">
      <h1 class="title">Secure Checkout</h1>
      
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
              <label class="form-label" for="expiration-date">Expiry Date</label>
              <div class="div_input" id="expiration-date"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="cvv">CVV</label>
              <div class="div_input" id="cvv"></div>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
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
          document.querySelector("#purchase-btn").textContent = "Purchase";
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
          document.getElementById("alerts").innerHTML = \`<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>An Error Occurred! (View console for more info)</p></div>\`;
      }

      let display_success_message = (object) => {
          order_details = object.order_details;
          paypal_buttons = object.paypal_buttons;
          console.log(order_details);
          let intent_object = intent === "authorize" ? "authorizations" : "captures";
          
          document.getElementById("alerts").innerHTML = \`<div class='ms-alert ms-action'>Thank you \` + (order_details?.payer?.name?.given_name || \`\`) + \` \` + (order_details?.payer?.name?.surname || \`\`) + \` for your payment of \` + order_details.purchase_units[0].payments[intent_object][0].amount.value + \` \` + order_details.purchase_units[0].payments[intent_object][0].amount.currency_code + \`!</div>\`;

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
                  color: 'gold',
                  layout: 'vertical',
                  label: 'paypal'
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
                  document.getElementById("alerts").innerHTML = \`<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>Order cancelled!</p></div>\`;
                  
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
                      'font-size': '16pt',
                      'color': '#ffffff'
                  },
                },
                fields: {
                  number: {
                    selector: "#card-number",
                    placeholder: "4111 1111 1111 1111"
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
                  document.querySelector("#purchase-btn").textContent = "Loading...";
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
  const [showCheckout, setShowCheckout] = useState(false);
  const [amount, setAmount] = useState('');
  const iframeRef = useRef(null);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('Payment successful:', event.data.orderDetails);
        setShowCheckout(false);
        // Handle successful payment in your React app
        alert(`Payment successful! Order ID: ${event.data.orderDetails.id}`);
      } else if (event.data.type === 'PAYMENT_CANCELLED') {
        console.log('Payment cancelled');
        // Handle cancelled payment
        alert('Payment was cancelled');
      } else if (event.data.type === 'PAYMENT_ERROR') {
        console.log('Payment error:', event.data.error);
        // Handle payment error
        alert('Payment error occurred');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Update iframe with amount when checkout opens
  const openCheckout = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setShowCheckout(true);
    // Pass amount to iframe via window object
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.orderAmount = amount;
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-500/10 animate-pulse"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {!showCheckout ? (
          /* Product Display */
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Product Image */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative">
                      <img 
                        src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png" 
                        alt="NFT Bored Ape" 
                        className="w-full aspect-square object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-8">
                    <div>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-4">
                        <span className="text-sm font-medium text-blue-300">Premium NFT Collection</span>
                      </div>
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                        AI-Generated Bored Ape
                      </h1>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Exclusive digital artwork powered by advanced AI algorithms. Each piece is unique and authenticated on the blockchain.
                      </p>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                        Set Your Price
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                          <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-xl font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <button
                      onClick={openCheckout}
                      className="group relative w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        <span>Secure Checkout</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>

                    {/* Security badges */}
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>256-bit SSL</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full-width Checkout Iframe */
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-black/20 backdrop-blur-xl border-b border-white/10">
              <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                  <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">${amount}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="group p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Full-width Iframe Container */}
            <div className="flex-1 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black flex items-center justify-center z-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-sm animate-pulse"></div>
                      <div className="relative w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-300 font-medium">Loading secure checkout...</p>
                  </div>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={createIframeUrl()}
                className="w-full h-full min-h-[600px] border-0"
                onLoad={handleIframeLoad}
                title="PayPal Checkout"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes tilt {
            0%, 50%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(0.5deg);
            }
            75% {
              transform: rotate(-0.5deg);
            }
          }
          .animate-tilt {
            animation: tilt 10s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default PayPalCheckoutPage;
