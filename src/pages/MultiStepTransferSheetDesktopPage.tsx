import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, User, CreditCard, Shield, Clock, CheckCircle, Receipt, ChevronLeft, X, Key, TrendingUp, Users, Star, Phone, HelpCircle, Download, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import { toast } from "sonner";

export interface TransferData {
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    commune: string;
  };
  selectedPaymentMethod?: string;
}

const MultiStepTransferSheetDesktopPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const [transferData, setTransferData] = useState<TransferData>({
    amount: '100.00',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
    },
    selectedPaymentMethod: 'credit-card'
  });

  // PayPal integration effect for step 3
  useEffect(() => {
    if (currentStep === 3 && paypalContainerRef.current) {
      const container = paypalContainerRef.current;
      
      // Clear any existing content
      container.innerHTML = '';

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
          display: none !important; /* Hide the form button since we have sticky button */
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

              <!-- Removed the pay button since it's duplicated in sticky footer -->
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

        // Form validation function
        const validatePaymentForm = () => {
          const emailInput = document.getElementById("email");
          const cardNumberField = document.getElementById("card-number");
          const expirationField = document.getElementById("expiration-date");
          const cvvField = document.getElementById("cvv");
          
          const isEmailValid = emailInput && emailInput.value && emailInput.value.includes('@');
          const hasCardFields = cardNumberField && expirationField && cvvField;
          
          // Dispatch validation event to React component
          const validationEvent = new CustomEvent('paymentFormValidation', {
            detail: { isValid: isEmailValid && hasCardFields }
          });
          window.dispatchEvent(validationEvent);
        };

        // Add event listeners for form validation
        const addFormValidationListeners = () => {
          const emailInput = document.getElementById("email");
          if (emailInput) {
            emailInput.addEventListener('input', validatePaymentForm);
            emailInput.addEventListener('blur', validatePaymentForm);
          }
          
          // Initial validation
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
            
            // Dispatch error event to React component to stop loading overlay
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

            // Trigger step completion
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
                  // Add form validation listeners after fields are rendered
                  setTimeout(addFormValidationListeners, 500);
                  
                  // Add hosted fields validation listeners
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
                              display_success_message(order_details);
                           })
                           .catch((error) => {
                              display_error_alert("Payment processing failed. Please try again.");
                              reset_purchase_button();
                           });
                        })
                        .catch((err) => {
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
  }, [currentStep, transferData.amount]);

  // Listen for payment success
  useEffect(() => {
    const handlePaymentSuccess = (event: any) => {
      setPaymentCompleted(true);
      setTransactionId(event.detail.orderDetails.id || `TX${Date.now()}`);
      setCurrentStep(4);
      setIsPaymentLoading(false);
    };

    window.addEventListener('paymentSuccess', handlePaymentSuccess);
    return () => window.removeEventListener('paymentSuccess', handlePaymentSuccess);
  }, []);

  // Listen for form validation changes
  useEffect(() => {
    const handleFormValidation = (event: any) => {
      setIsPaymentFormValid(event.detail.isValid);
    };

    window.addEventListener('paymentFormValidation', handleFormValidation);
    return () => window.removeEventListener('paymentFormValidation', handleFormValidation);
  }, []);

  // Listen for payment errors to stop loading overlay
  useEffect(() => {
    const handlePaymentError = (event: any) => {
      console.log('Payment error detected:', event.detail.message);
      setIsPaymentLoading(false);
    };

    window.addEventListener('paymentError', handlePaymentError);
    return () => window.removeEventListener('paymentError', handlePaymentError);
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      handlePreviousStep();
    }
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const updateTransferData = (data: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...data }));
  };

  const downloadReceiptImage = async () => {
    if (!receiptRef.current) {
      toast.error("Receipt not found");
      return;
    }

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        height: receiptRef.current.scrollHeight,
        width: receiptRef.current.scrollWidth,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `transfer-receipt-${transactionId || Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Receipt downloaded successfully");
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast.error("Failed to download receipt");
    }
  };

  const shareReceiptImage = async () => {
    if (!receiptRef.current) {
      toast.error("Receipt not found");
      return;
    }

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        height: receiptRef.current.scrollHeight,
        width: receiptRef.current.scrollWidth,
      });

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Failed to generate receipt image");
          return;
        }

        const file = new File([blob], `transfer-receipt-${transactionId || Date.now()}.png`, { 
          type: 'image/png' 
        });

        // Check if Web Share API is supported and can share files
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Money Transfer Receipt',
              text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully.`,
              files: [file]
            });
            toast.success("Receipt shared successfully");
          } catch (shareError: any) {
            if (shareError.name !== 'AbortError') {
              console.error('Error sharing receipt:', shareError);
              // Fallback to download
              downloadReceiptImage();
            }
          }
        } else {
          // Fallback: copy transaction details to clipboard and download image
          const receiptText = `Money Transfer Receipt
Transaction ID: ${transactionId || 'N/A'}
Amount: $${transferData.amount}
Recipient: ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}
Location: ${transferData.receiverDetails.commune}, ${transferData.receiverDetails.department}
Date: ${new Date().toLocaleDateString()}`;

          try {
            await navigator.clipboard.writeText(receiptText);
            toast.success("Receipt details copied to clipboard");
          } catch (clipboardError) {
            console.error('Error copying to clipboard:', clipboardError);
          }
          
          // Also download the image
          downloadReceiptImage();
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating receipt image:', error);
      toast.error("Failed to share receipt");
    }
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName && 
                              transferData.receiverDetails.lastName &&
                              transferData.receiverDetails.phoneNumber && 
                              transferData.receiverDetails.commune;

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment Method', 'Transfer Complete'];

  const transferFee = transferData.amount ? (Math.ceil(parseFloat(transferData.amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = transferData.amount ? (parseFloat(transferData.amount) + parseFloat(transferFee)).toFixed(2) : '0.00';
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';

  const handleStickyPayment = async () => {
    setIsPaymentLoading(true);
    
    try {
      const cardForm = document.querySelector("#card-form") as HTMLFormElement;
      if (cardForm) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        cardForm.dispatchEvent(submitEvent);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Payment Loading Overlay */}
      {isPaymentLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {stepTitles[currentStep - 1]}
              </h1>
            </div>
            
            <button 
              onClick={handleCloseClick}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Step Indicator */}
          <div className="mt-6 mb-2">
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className={`rounded-full flex items-center justify-center w-12 h-12 transition-all duration-300 ${
                        step === currentStep 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : step < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {step < currentStep ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : step === currentStep ? (
                        step === 1 ? <DollarSign className="h-6 w-6" /> :
                        step === 2 ? <User className="h-6 w-6" /> :
                        step === 3 ? <CreditCard className="h-6 w-6" /> :
                        <Receipt className="h-6 w-6" />
                      ) : (
                        step
                      )}
                    </motion.div>
                    <span className="text-sm font-medium mt-2 text-gray-700">
                      {stepTitles[index]}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full ${
                      step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Multi-column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column - Quick Stats & Info */}
          <div className="col-span-3 space-y-6">
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Exchange Rate</span>
                  <span className="font-semibold">1 USD = 127.50 HTG</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transfer Fee</span>
                  <span className="font-semibold">${transferFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery Time</span>
                  <span className="font-semibold">24-48 hrs</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Transfers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">Marie Jean</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <span className="text-sm font-semibold">$150</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">Pierre Louis</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                  <span className="text-sm font-semibold">$75</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">Roseline Paul</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                  <span className="text-sm font-semibold">$200</span>
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Jean Baptiste</p>
                    <p className="text-xs text-gray-500">Port-au-Prince</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Marie Claire</p>
                    <p className="text-xs text-gray-500">Cap-Haïtien</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Center Column - Main Form */}
          <div className="col-span-6">
            <Card className="min-h-[600px]">
              <CardContent className="p-8">
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Money to Haiti</h2>
                      <p className="text-gray-600">Enter the amount you want to send</p>
                    </div>
                    
                    <StepOneTransfer 
                      amount={transferData.amount}
                      onAmountChange={(amount) => updateTransferData({ amount })}
                    />

                    <div className="flex justify-end space-x-4 pt-6">
                      <Button 
                        onClick={handleNextStep}
                        disabled={!canProceedFromStep1}
                        size="lg"
                        className="px-8"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Recipient Details</h2>
                      <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
                    </div>
                    
                    <StepTwoTransfer 
                      receiverDetails={transferData.receiverDetails}
                      onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
                    />

                    <div className="flex justify-between space-x-4 pt-6">
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousStep}
                        size="lg"
                        className="px-8"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Previous
                      </Button>
                      <Button 
                        onClick={handleNextStep}
                        disabled={!canProceedFromStep2}
                        size="lg"
                        className="px-8"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h2>
                      <p className="text-gray-600">
                        Sending <span className="font-semibold text-blue-600">${transferData.amount}</span> to{' '}
                        <span className="font-semibold text-gray-900">
                          {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                        </span>
                      </p>
                    </div>
                    
                    {/* PayPal Button */}
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                      size="lg"
                    >
                      Pay with PayPal
                    </Button>

                    {/* Separator */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="text-gray-500 text-sm font-medium px-4">or continue with</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    
                    {/* PayPal Checkout Container */}
                    <div ref={paypalContainerRef}></div>

                    <div className="flex justify-between space-x-4 pt-6">
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousStep}
                        size="lg"
                        className="px-8"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Previous
                      </Button>
                      <Button 
                        onClick={handleStickyPayment}
                        disabled={isPaymentLoading || !isPaymentFormValid}
                        size="lg"
                        className="px-8 bg-green-600 hover:bg-green-700"
                      >
                        {isPaymentLoading ? 'Processing...' : `Pay $${totalAmount}`}
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Transfer Complete!</h2>
                      <p className="text-gray-600">Your money transfer has been successfully processed</p>
                    </div>
                    
                    {/* Receipt */}
                    <div 
                      ref={receiptRef}
                      className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Receipt className="h-5 w-5 mr-2" />
                          Transfer Receipt
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Transaction ID</span>
                          <p className="font-mono text-gray-900">{transactionId || `TX${Date.now()}`}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Status</span>
                          <p className="text-green-600 font-medium">Completed</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Recipient</span>
                          <p className="font-medium">{transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone</span>
                          <p className="font-medium">+509 {transferData.receiverDetails.phoneNumber}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Location</span>
                          <p className="font-medium">{transferData.receiverDetails.commune}, {transferData.receiverDetails.department}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Sent</span>
                          <span className="font-medium">${transferData.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transfer Fee</span>
                          <span className="font-medium">${transferFee}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold border-t pt-2">
                          <span>Total Paid</span>
                          <span className="text-blue-600">${totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4 pt-6">
                      <div className="flex space-x-3">
                        <Button variant="outline" size="lg" onClick={downloadReceiptImage}>
                          <Download className="mr-2 h-5 w-5" />
                          Download
                        </Button>
                        <Button variant="outline" size="lg" onClick={shareReceiptImage}>
                          <Share2 className="mr-2 h-5 w-5" />
                          Share
                        </Button>
                      </div>
                      <Button 
                        onClick={() => navigate('/for-you')}
                        size="lg"
                        className="px-8"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Support */}
          <div className="col-span-3 space-y-6">
            
            {/* Transfer Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Send Amount</span>
                    <span className="font-semibold">${transferData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transfer Fee</span>
                    <span className="font-semibold">${transferFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total to Pay</span>
                    <span className="text-blue-600">${totalAmount}</span>
                  </div>
                </div>
                
                {transferData.receiverDetails.firstName && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Recipient</p>
                      <p className="text-sm text-gray-600">
                        {transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transferData.receiverDetails.commune}, {transferData.receiverDetails.department}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">256-bit SSL Encryption</p>
                    <p className="text-xs text-gray-500">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Licensed & Regulated</p>
                    <p className="text-xs text-gray-500">Authorized money transmitter</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">24/7 Monitoring</p>
                    <p className="text-xs text-gray-500">Fraud detection systems</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepTransferSheetDesktopPage;
