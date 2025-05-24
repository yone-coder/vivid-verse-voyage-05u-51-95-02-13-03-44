
import React, { useRef, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface PayPalIframeCheckoutProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel: () => void;
  onClose: () => void;
}

const PayPalIframeCheckout: React.FC<PayPalIframeCheckoutProps> = ({
  amount,
  onSuccess,
  onError,
  onCancel,
  onClose
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // The HTML content for the iframe
  const iframeContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Transfer Payment</title>
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

      .alert {
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 500;
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
    </style>
  </head>
  <body>
    <div class="payment-container">
      <h1 class="title">Complete Transfer Payment</h1>
      
      <div id="alerts"></div>
      
      <div id="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      
      <div id="content" class="hide">
        <div id="payment_options"></div>
      </div>
    </div>

    <script>
      const BACKEND_URL = 'https://paypal-with-nodejs.onrender.com';
      let current_customer_id = "";
      let order_id;

      const script_to_head = (attributes_object) => {
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

      const display_success_message = (object) => {
          const order_details = object.order_details;
          const paypal_buttons = object.paypal_buttons;
          
          document.getElementById("alerts").innerHTML = \`<div class='alert alert-success'>Transfer payment successful! Amount: \` + order_details.purchase_units[0].payments.captures[0].amount.value + \` \` + order_details.purchase_units[0].payments.captures[0].amount.currency_code + \`</div>\`;

          paypal_buttons.close();
          
          // Notify parent window of successful payment
          window.parent.postMessage({ 
            type: 'PAYMENT_SUCCESS', 
            orderDetails: order_details 
          }, '*');
      }

      const display_error_alert = () => {
          document.getElementById("alerts").innerHTML = \`<div class="alert alert-error">An Error Occurred! Please try again.</div>\`;
      }

      const paypal_sdk_url = "https://www.paypal.com/sdk/js";
      const client_id = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
      const currency = "USD";
      const intent = "capture";

      // Initialize PayPal
      get_client_token()
      .then((client_token) => {
          return script_to_head({"src": paypal_sdk_url + "?client-id=" + client_id + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent + "&components=buttons", "data-client-token": client_token})
      })
      .then(() => {
          document.getElementById("loading").classList.add("hide");
          document.getElementById("content").classList.remove("hide");
          
          let paypal_buttons = paypal.Buttons({
              style: {
                  shape: 'rect',
                  color: 'gold',
                  layout: 'vertical',
                  label: 'paypal'
              },

              createOrder: function(data, actions) {
                  const orderAmount = window.transferAmount || '100.00';
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
      })
      .catch((error) => {
          console.error('Error initializing PayPal:', error);
          display_error_alert();
      });
    </script>
  </body>
</html>`;

  // Create blob URL for iframe content
  const createIframeUrl = () => {
    const blob = new Blob([iframeContent], { type: 'text/html' });
    return URL.createObjectURL(blob);
  };

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('Transfer payment successful:', event.data.orderDetails);
        onSuccess(event.data.orderDetails);
      } else if (event.data.type === 'PAYMENT_CANCELLED') {
        console.log('Transfer payment cancelled');
        onCancel();
      } else if (event.data.type === 'PAYMENT_ERROR') {
        console.log('Transfer payment error:', event.data.error);
        onError(event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onCancel, onError]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    // Pass amount to iframe
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.transferAmount = amount;
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Complete Transfer Payment</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Container */}
        <div className="relative h-[calc(80vh-80px)]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-gray-600">Loading secure payment...</p>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={createIframeUrl()}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title="Transfer Payment"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default PayPalIframeCheckout;
