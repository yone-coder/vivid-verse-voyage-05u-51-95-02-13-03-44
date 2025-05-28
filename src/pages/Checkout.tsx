import React, { useState, useEffect, useRef } from 'react';

const PayPalPaymentComponent = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState('');
  const [paypalButtons, setPayPalButtons] = useState(null);
  const [email, setEmail] = useState('');
  const [orderID, setOrderID] = useState('');
  const [purchaseButtonDisabled, setPurchaseButtonDisabled] = useState(false);
  const [purchaseButtonText, setPurchaseButtonText] = useState('Purchase');
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  
  const cardFormRef = useRef(null);
  const paymentOptionsRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cvvRef = useRef(null);
  const expirationDateRef = useRef(null);
  const isInitialized = useRef(false);
  
  // Replace with your actual backend URL
  const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";
  const CLIENT_ID = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
  const CURRENCY = "USD";
  const INTENT = "capture";

  // Utility function to load PayPal SDK
  const loadPayPalSDK = (clientToken) => {
    return new Promise((resolve, reject) => {
      // Remove existing PayPal script if it exists
      const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (existingScript) {
        existingScript.remove();
        delete window.paypal;
      }

      const script = document.createElement('script');
      const paypalSDKUrl = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&enable-funding=venmo&currency=${CURRENCY}&intent=${INTENT}&components=buttons,hosted-fields`;
      
      script.src = paypalSDKUrl;
      script.setAttribute('data-client-token', clientToken);
      script.onload = () => {
        // Small delay to ensure PayPal SDK is fully loaded
        setTimeout(() => resolve(window.paypal), 100);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Get client token from backend
  const getClientToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_client_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: "" }),
      });
      return await response.text();
    } catch (error) {
      throw error;
    }
  };

  const displaySuccessMessage = (orderDetails, paypalButtonsInstance) => {
    const intentObject = INTENT === "authorize" ? "authorizations" : "captures";
    const givenName = orderDetails?.payer?.name?.given_name || '';
    const surname = orderDetails?.payer?.name?.surname || '';
    const amount = orderDetails.purchase_units[0].payments[intentObject][0].amount.value;
    const currency = orderDetails.purchase_units[0].payments[intentObject][0].amount.currency_code;
    
    setAlerts(
      `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        Thank you ${givenName} ${surname} for your payment of ${amount} ${currency}!
      </div>`
    );
    
    if (paypalButtonsInstance && paypalButtonsInstance.close) {
      paypalButtonsInstance.close();
    }
    
    // Hide card form
    if (cardFormRef.current) {
      cardFormRef.current.style.display = 'none';
    }
  };

  const displayErrorAlert = () => {
    setAlerts(
      `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <span class="cursor-pointer float-right text-xl font-bold" onclick="this.parentElement.remove()">×</span>
        <p>An Error Occurred! (View console for more info)</p>
      </div>`
    );
  };

  const resetPurchaseButton = () => {
    setPurchaseButtonDisabled(false);
    setPurchaseButtonText('Purchase');
  };

  const handleCardFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!hostedFieldsInstance) {
      console.error('Hosted fields not initialized');
      return;
    }

    setPurchaseButtonDisabled(true);
    setPurchaseButtonText('Loading...');

    try {
      await hostedFieldsInstance.submit({
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

      const response = await fetch(`${API_BASE_URL}/complete_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: INTENT,
          order_id: orderID,
          email: email
        })
      });

      const orderDetails = await response.json();
      displaySuccessMessage(orderDetails, paypalButtons);
    } catch (error) {
      console.error('Card submission error:', error);
      resetPurchaseButton();
      displayErrorAlert();
    }
  };

  const clearAlerts = () => {
    setAlerts('');
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (paypalButtons && paypalButtons.close) {
        try {
          paypalButtons.close();
        } catch (e) {
          console.log('Error closing PayPal buttons:', e);
        }
      }
    };
  }, [paypalButtons]);

  useEffect(() => {
    if (isInitialized.current) return;
    
    const initializePayPal = async () => {
      try {
        console.log('Initializing PayPal...');
        const clientToken = await getClientToken();
        console.log('Got client token');
        
        const paypal = await loadPayPalSDK(clientToken);
        console.log('PayPal SDK loaded');
        
        setLoading(false);

        // Initialize PayPal Buttons
        const buttons = paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal'
          },
          createOrder: async () => {
            const response = await fetch(`${API_BASE_URL}/create_order`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ intent: INTENT })
            });
            const order = await response.json();
            return order.id;
          },
          onApprove: async (data) => {
            setOrderID(data.orderID);
            const response = await fetch(`${API_BASE_URL}/complete_order`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                intent: INTENT,
                order_id: data.orderID
              })
            });
            const orderDetails = await response.json();
            displaySuccessMessage(orderDetails, buttons);
          },
          onCancel: () => {
            setAlerts(
              `<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                <span class="cursor-pointer float-right text-xl font-bold" onclick="this.parentElement.remove()">×</span>
                <p>Order cancelled!</p>
              </div>`
            );
          },
          onError: (err) => {
            console.log('PayPal button error:', err);
            displayErrorAlert();
          }
        });

        if (paymentOptionsRef.current) {
          await buttons.render(paymentOptionsRef.current);
          setPayPalButtons(buttons);
          console.log('PayPal buttons rendered');
        }

        // Initialize Hosted Fields for card payments
        if (paypal.HostedFields && paypal.HostedFields.isEligible()) {
          console.log('Initializing hosted fields...');
          
          const hostedFields = await paypal.HostedFields.render({
            createOrder: async () => {
              const response = await fetch(`${API_BASE_URL}/create_order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ intent: INTENT })
              });
              const order = await response.json();
              setOrderID(order.id);
              return order.id;
            },
            styles: {
              '.valid': { color: 'green' },
              '.invalid': { color: 'red' },
              'input': {
                'font-size': '16px',
                'color': '#000000',
                'padding': '12px'
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
          });
          
          setHostedFieldsInstance(hostedFields);
          console.log('Hosted fields initialized');
        } else {
          console.log('Hosted fields not eligible');
        }

        isInitialized.current = true;

      } catch (error) {
        console.error('Error initializing PayPal:', error);
        setLoading(false);
        displayErrorAlert();
      }
    };

    initializePayPal();
  }, []);

  // Handle alert close clicks
  useEffect(() => {
    const handleAlertClick = (e) => {
      if (e.target.onclick || e.target.getAttribute('onclick')) {
        e.target.parentElement.remove();
        setAlerts('');
      }
    };

    document.addEventListener('click', handleAlertClick);
    return () => document.removeEventListener('click', handleAlertClick);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">AI-Generated NFT Bored Ape</h2>
      
      <div className="text-center mb-4">
        <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold">
          $100.00 USD
        </span>
      </div>

      {alerts && (
        <div 
          dangerouslySetInnerHTML={{ __html: alerts }} 
          className="mb-4" 
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <img 
              src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png" 
              alt="NFT Bored Ape"
              className="w-full max-w-sm mx-auto rounded-lg"
            />
          </div>

          <div>
            {/* PayPal Buttons Container */}
            <div ref={paymentOptionsRef} className="mb-4"></div>
            
            {/* Card Form */}
            <div ref={cardFormRef} className="space-y-4">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div 
                  id="card-number" 
                  ref={cardNumberRef}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  style={{ minHeight: '45px' }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <div 
                    id="expiration-date" 
                    ref={expirationDateRef}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white"
                    style={{ minHeight: '45px' }}
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    Security Code
                  </label>
                  <div 
                    id="cvv" 
                    ref={cvvRef}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white"
                    style={{ minHeight: '45px' }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@email.com"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <button
                onClick={handleCardFormSubmit}
                disabled={purchaseButtonDisabled}
                className={`w-full py-3 px-4 rounded-md font-medium ${
                  purchaseButtonDisabled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition duration-200`}
              >
                {purchaseButtonText}
              </button>
            </div>
            
            <hr className="my-6 border-gray-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PayPalPaymentComponent;