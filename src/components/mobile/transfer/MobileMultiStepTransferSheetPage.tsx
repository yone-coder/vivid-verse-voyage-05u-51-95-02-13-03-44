import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, Key, Globe, Search, CheckCircle, User, Receipt, ArrowRight, CreditCard, Banknote, Landmark, CircleDollarSign, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import TransferTypeSelector from '@/components/transfer/TransferTypeSelector';
import StepOneTransfer from '@/components/transfer/StepOneTransfer';
import StepOneLocalTransfer from '@/components/transfer/StepOneLocalTransfer';
import StepTwoTransfer from '@/components/transfer/StepTwoTransfer';
import { EmailNotificationService } from '@/components/transfer/EmailNotificationService';
import IndexBottomNav from '@/components/layout/IndexBottomNav';

export interface TransferData {
  transferType?: 'international' | 'national';
  amount: string;
  receiverDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    department: string;
    commune: string;
    email?: string;
  };
  selectedPaymentMethod?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  fee: string;
  processorUrl?: string;
}

interface MobileMultiStepTransferSheetPageProps {
  defaultTransferType?: 'international' | 'national';
}

const MobileMultiStepTransferSheetPage: React.FC<MobileMultiStepTransferSheetPageProps> = ({
  defaultTransferType = 'international'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [transferData, setTransferData] = useState<TransferData>({
    transferType: defaultTransferType,
    amount: '100.00',
    receiverDetails: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: 'Artibonite',
      commune: '',
      email: '',
    },
    selectedPaymentMethod: 'credit-card'
  });

  // PayPal backend API URL as a constant
  const PAYPAL_BACKEND_URL = 'https://paypal-backend-9mw4.onrender.com';

  // International payment methods (USD)
  const internationalPaymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Safe and secure card payment',
      fee: '3.5% + $0.30',
      processorUrl: PAYPAL_BACKEND_URL
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer / ACH',
      icon: Banknote,
      description: 'Direct from your bank account',
      fee: '$0.25'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: Landmark,
      description: 'Fast transfers between US banks',
      fee: 'Free'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CircleDollarSign,
      description: 'Send using your PayPal balance',
      fee: '2.9% + $0.30'
    },
    {
      id: 'cashapp',
      name: 'Cash App',
      icon: DollarSign,
      description: 'Send using Cash App',
      fee: '1.5%'
    }
  ];

  // PayPal integration effect for step 3
  useEffect(() => {
    if (currentStep === 3 && paypalContainerRef.current) {
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
          
          // Store email in React component state
          if (emailInput && emailInput.value) {
            window.dispatchEvent(new CustomEvent('emailCaptured', {
              detail: { email: emailInput.value }
            }));
          }
          
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

            // Trigger step completion with the actual order details
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
  }, [currentStep, transferData.amount]);

  // Listen for email capture from PayPal form
  useEffect(() => {
    const handleEmailCapture = (event: any) => {
      setUserEmail(event.detail.email);
    };

    window.addEventListener('emailCaptured', handleEmailCapture);
    return () => window.removeEventListener('emailCaptured', handleEmailCapture);
  }, []);

  // Add function to send email notification
  const sendEmailNotification = async (orderDetails: any) => {
    if (!userEmail) {
      console.log('No email captured from payment form');
      return;
    }

    // Use the actual transaction ID from PayPal order details
    const actualTransactionId = orderDetails?.id || transactionId || `TX${Date.now()}`;

    try {
      const emailData = {
        to: userEmail,
        subject: "Money Transfer Confirmation - Transaction Completed",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h1 style="color: #10b981; text-align: center; margin-bottom: 30px;">💰 Money Transfer Successful!</h1>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1e40af; margin-top: 0;">Transfer Details</h2>
                <p><strong>Amount Sent:</strong> $${transferData.amount} USD</p>
                <p><strong>Recipient:</strong> ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}</p>
                <p><strong>Location:</strong> ${transferData.receiverDetails.commune}, ${transferData.receiverDetails.department}</p>
                <p><strong>Transaction ID:</strong> ${actualTransactionId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Your Email:</strong> ${userEmail}</p>
              </div>
              
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #065f46; margin-top: 0;">📱 Next Steps</h3>
                <p>Your money transfer has been processed successfully and will be available for pickup within 24-48 hours.</p>
                <p>The recipient will receive an SMS notification at <strong>+509 ${transferData.receiverDetails.phoneNumber}</strong> when the funds are ready for pickup.</p>
              </div>
              
              <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #c2410c; margin-top: 0;">💡 Important Information</h3>
                <p>• Keep this email as your receipt</p>
                <p>• Transaction ID: <strong>${actualTransactionId}</strong></p>
                <p>• Customer support: support@example.com</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px;">
                  This is an automated confirmation email. Please keep this for your records.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Money Transfer Confirmation - Your transfer of $${transferData.amount} USD to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} has been completed successfully. Transaction ID: ${actualTransactionId}. The recipient will be notified when funds are ready for pickup within 24-48 hours.`
      };

      console.log('Sending email notification to:', userEmail);
      console.log('Using transaction ID:', actualTransactionId);

      const response = await fetch('https://resend-u11p.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        console.log('Email notification sent successfully');
      } else {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  // MonCash payment handler for national transfers
  const handleMonCashPayment = async () => {
    if (!transferData.amount || !transferData.receiverDetails.firstName) {
      toast("Missing Information: Please complete all required fields before proceeding.");
      return;
    }

    setIsProcessingPayment(true);
    setIsPaymentLoading(true);

    try {
      // First get the access token
      const tokenResponse = await fetch('https://moncash-backend.onrender.com/api/get-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.error || 'Failed to get MonCash access token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.accessToken;

      if (!accessToken) {
        throw new Error('Invalid access token received from MonCash');
      }

      // Create payment with access token
      const orderId = `TX${Date.now()}`;
      const paymentResponse = await fetch('https://moncash-backend.onrender.com/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken,
          amount: transferData.amount,
          orderId
        })
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || 'Failed to create MonCash payment');
      }

      const paymentData = await paymentResponse.json();

      if (!paymentData.paymentUrl) {
        throw new Error('No payment URL received from MonCash');
      }

      // Redirect to MonCash payment page
      window.location.href = paymentData.paymentUrl;

    } catch (error) {
      console.error('MonCash payment error:', error);
      toast("Payment Failed: " + (error instanceof Error ? error.message : "Failed to process MonCash payment. Please try again."));
      setIsProcessingPayment(false);
      setIsPaymentLoading(false);
    }
  };

  // Listen for payment success
  useEffect(() => {
    const handlePaymentSuccess = (event: any) => {
      console.log('Payment success event received:', event.detail);
      const orderDetails = event.detail.orderDetails;

      setPaymentCompleted(true);
      const actualTransactionId = orderDetails?.id || `TX${Date.now()}`;
      setTransactionId(actualTransactionId);
      setCurrentStep(4);
      setIsPaymentLoading(false);

      // Send email notification using the static service method
      if (userEmail) {
        setTimeout(() => {
          EmailNotificationService.sendTransferConfirmation(
            userEmail,
            transferData,
            actualTransactionId
          );
        }, 1000);
      }
    };

    window.addEventListener('paymentSuccess', handlePaymentSuccess);
    return () => window.removeEventListener('paymentSuccess', handlePaymentSuccess);
  }, [userEmail, transferData.amount, transferData.receiverDetails.firstName, transferData.receiverDetails.lastName, transferData.receiverDetails.commune, transferData.receiverDetails.phoneNumber]);

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

  const generateReceiptImage = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'receipt.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'Transfer Receipt',
              text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
              files: [file]
            });
          } catch (error) {
            console.log('Sharing cancelled or failed:', error);
            // Fallback to downloading the image
            downloadImage(canvas);
          }
        } else {
          // Fallback to downloading the image
          downloadImage(canvas);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating receipt image:', error);
      // Fallback to text sharing
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Transfer Receipt',
            text: `Transfer of $${transferData.amount} to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} completed successfully. Transaction ID: ${transactionId}`,
          });
        } catch (shareError) {
          console.log('Text sharing failed:', shareError);
          navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
        }
      } else {
        navigator.clipboard?.writeText(`Transaction ID: ${transactionId}`);
      }
    }
  };

  const downloadImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `receipt-${transactionId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const canProceedFromStep1 = transferData.amount && parseFloat(transferData.amount) > 0;
  const canProceedFromStep2 = transferData.receiverDetails.firstName &&
    transferData.receiverDetails.lastName &&
    transferData.receiverDetails.phoneNumber &&
    transferData.receiverDetails.commune;
  const canProceedFromStep3 = transferData.selectedPaymentMethod !== undefined && transferData.selectedPaymentMethod !== '';

  const stepTitles = ['Send Money', 'Recipient Details', 'Payment Method', 'Transfer Complete'];

  const stepVariants = {
    inactive: {
      scale: 1,
      backgroundColor: '#E5E7EB',
      color: '#6B7280'
    },
    active: {
      scale: 1.05,
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    completed: {
      scale: 1,
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const lineVariants = {
    inactive: {
      backgroundColor: '#E5E7EB',
      scaleX: 1
    },
    active: {
      backgroundColor: '#10B981',
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const transferFee = transferData.amount ? (Math.ceil(parseFloat(transferData.amount) / 100) * 15).toFixed(2) : '0.00';
  const totalAmount = transferData.amount ? (parseFloat(transferData.amount) + parseFloat(transferFee)).toFixed(2) : '0.00';
  const receiverAmount = transferData.amount ? (parseFloat(transferData.amount) * 127.5).toFixed(2) : '0.00';

  const handleStickyPayment = async () => {
    if (transferData.transferType === 'national') {
      // Handle MonCash payment for national transfers
      await handleMonCashPayment();
    } else {
      // Handle PayPal payment for international transfers
      setIsPaymentLoading(true);

      try {
        // Trigger the PayPal form submission
        const cardForm = document.querySelector("#card-form") as HTMLFormElement;
        if (cardForm) {
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          cardForm.dispatchEvent(submitEvent);
        }
      } catch (error) {
        console.error('Payment failed:', error);
        setIsPaymentLoading(false);
      }
    }
  };

  const onContinue = () => {
    if (currentStep === 1) {
      handleNextStep();
    } else if (currentStep === 2) {
      handleNextStep();
    } else if (currentStep === 3) {
      handleStickyPayment();
    }
  };

  const getButtonColor = () => {
    if (currentStep === 1) {
      return 'bg-blue-600 hover:bg-blue-700';
    } else if (currentStep === 2) {
      return 'bg-blue-600 hover:bg-blue-700';
    } else if (currentStep === 3) {
      return 'bg-blue-600 hover:bg-blue-700';
    } else {
      return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const getButtonText = () => {
    if (currentStep === 1) {
      return 'Next';
    } else if (currentStep === 2) {
      return 'Next';
    } else if (currentStep === 3) {
      return 'Pay Now';
    } else {
      return 'Done';
    }
  };

  const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Loading Overlay */}
      {isPaymentLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="relative">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            {/* Key Icon in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Header with blue background, GLOBAL TRANSFÈ, logo, and search icon */}
      <div className="sticky top-0 z-50">
        <div className="bg-blue-600">
          <div className="flex items-center justify-between px-4 py-2 h-12">
            {/* Logo placeholder */}
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-white">
              GLOBAL TRANSFÈ
            </h1>

            {/* Search icon */}
            <button className="p-1.5 rounded-full hover:bg-blue-700">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Animated Step Indicator with white background and top spacing */}
        <div className="bg-white px-4 pt-3 pb-3">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 shadow-sm ${
                      step === currentStep
                        ? 'w-auto h-7 px-2 bg-red-600 text-white'
                        : 'w-7 h-7 bg-gray-200 text-gray-600'
                    }`}
                    variants={stepVariants}
                    initial="inactive"
                    animate={
                      step === currentStep ? 'active' :
                        step < currentStep ? 'completed' :
                          'inactive'
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : step === currentStep ? (
                      <div className="flex items-center space-x-1">
                        {step === 1 ? (
                          <DollarSign className="h-3 w-3" />
                        ) : step === 2 ? (
                          <User className="h-3 w-3" />
                        ) : step === 3 ? (
                          <CreditCard className="h-3 w-3" />
                        ) : (
                          <Receipt className="h-3 w-3" />
                        )}
                        <span className="font-medium whitespace-nowrap text-xs">
                          {stepTitles[index].split(' ')[0]}
                        </span>
                      </div>
                    ) : (
                      step
                    )}
                  </motion.div>
                </div>
                {index < 3 && (
                  <motion.div
                    className="flex-1 h-0.5 mx-2 rounded-full origin-left"
                    variants={lineVariants}
                    initial="inactive"
                    animate={step < currentStep ? 'active' : 'inactive'}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Transfer Type Selector - Sticky below steps indicator - Only show on step 1 */}
        {currentStep === 1 && (
          <div className="bg-white">
            <TransferTypeSelector
              transferType={transferData.transferType || 'international'}
              onTransferTypeChange={(type) => updateTransferData({ transferType: type })}
              disableNavigation={true}
            />
          </div>
        )}
      </div>

      {/* Step Content - Reduced bottom padding since button is now in nav */}
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="px-4 py-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Amount Entry Section - removed transfer type selector */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600">Enter the amount you want to send</p>
                </div>

                {transferData.transferType === 'national' ? (
                  <StepOneLocalTransfer
                    amount={transferData.amount}
                    onAmountChange={(amount) => updateTransferData({ amount })}
                  />
                ) : (
                  <StepOneTransfer
                    amount={transferData.amount}
                    onAmountChange={(amount) => updateTransferData({ amount })}
                  />
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">Who are you sending ${transferData.amount} to?</p>
              </div>

              <StepTwoTransfer
                receiverDetails={transferData.receiverDetails}
                onDetailsChange={(receiverDetails) => updateTransferData({ receiverDetails })}
              />
            </div>
          )}

          {currentStep === 3 && (
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
                  {/* Pay with PayPal Button */}
                  <div className="w-full">
                    <Button 
                      onClick={onContinue}
                      disabled={
                        !canProceed || 
                        isPaymentLoading || 
                        (currentStep === 3 && transferData?.transferType === 'international' && !isPaymentFormValid)
                      }
                      className={cn(
                        "transition-all duration-200 text-white font-semibold",
                        currentStep === 1 ? "flex-1" : "flex-2",
                        getButtonColor()
                      )}
                    >
                      {isPaymentLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {getButtonText()}
                        </>
                      ) : (
                        <>
                          {getButtonText()}
                          {currentStep < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Separator */}
                  <div className="flex items-center justify-center space-x-4 my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500 text-sm font-medium px-4">or continue with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* PayPal Checkout Container (Form) */}
                  <div ref={paypalContainerRef}></div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div
                ref={receiptRef}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Receipt
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">{transactionId}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="text-green-600 font-medium">Completed</span>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recipient</span>
                      <span className="font-medium">{transferData.receiverDetails.firstName} {transferData.receiverDetails.lastName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="font-medium">+509 {transferData.receiverDetails.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-right max-w-xs">{transferData.receiverDetails.commune}, {transferData.receiverDetails.department}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Sent</span>
                      <span className="font-medium">${transferData.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transfer Fee</span>
                      <span className="font-medium">${transferFee}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total Paid</span>
                      <span className="text-blue-600">${totalAmount}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium capitalize">
                        {transferData.selectedPaymentMethod?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {userEmail && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Confirmation Email</span>
                        <span className="font-medium">{userEmail}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Delivery Information</h4>
                      <p className="text-sm text-green-700 mt-1">
                        The recipient will receive the funds within 24-48 hours. They will be notified via SMS when the money is ready for pickup.
                      </p>
                      {userEmail && (
                        <p className="text-sm text-green-700 mt-1">
                          A confirmation email has been sent to {userEmail}.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={generateReceiptImage}
                  className="flex-1"
                >
                  Share Receipt
                </Button>
                <Button
                  onClick={() => navigate('/for-you')}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Index Bottom Navigation with integrated continue button */}
      <IndexBottomNav
        showContinueButton={currentStep < 4}
        currentStep={currentStep}
        canProceed={
          (currentStep === 1 && canProceedFromStep1) ||
          (currentStep === 2 && canProceedFromStep2) ||
          (currentStep === 3 && canProceedFromStep3)
        }
        onContinue={currentStep === 3 ? handleStickyPayment : handleNextStep}
        onPrevious={handlePreviousStep}
        isPaymentLoading={isPaymentLoading}
        transferData={transferData}
        isPaymentFormValid={isPaymentFormValid}
      />
    </div>
  );
};

export default MobileMultiStepTransferSheetPage;
