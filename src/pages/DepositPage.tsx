
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, AlertTriangle, ArrowLeft, Check, CreditCard } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const DepositPage: React.FC = () => {
  // State for the deposit flow
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState(100);
  const [showContent, setShowContent] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  
  // Refs for PayPal elements
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const expirationDateRef = useRef<HTMLDivElement>(null);
  const cvvRef = useRef<HTMLDivElement>(null);
  const cardFormRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();

  // Configuration for the PayPal backend
  const CONFIG = {
    SERVER_URL: 'https://paypal-with-nodejs.onrender.com',
    PAYPAL_CLIENT_ID: 'AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj',
    CURRENCY: 'USD',
    INTENT: 'capture'
  };

  // Initialize PayPal SDK and components
  useEffect(() => {
    let orderId: string;
    let paypalButtons: any;
    let paypalHostedFields: any;

    const loadPayPalScript = async () => {
      try {
        setLoading(true);
        setShowContent(false);

        // Get client token from backend
        const clientToken = await getClientToken();

        // Load PayPal SDK
        await loadScript({
          src: `https://www.paypal.com/sdk/js?client-id=${CONFIG.PAYPAL_CLIENT_ID}&enable-funding=venmo&currency=${CONFIG.CURRENCY}&intent=${CONFIG.INTENT}&components=buttons,hosted-fields`,
          'data-client-token': clientToken
        });

        // Initialize PayPal components
        await initializePayPalComponents();

        setLoading(false);
        setShowContent(true);
      } catch (err) {
        console.error('Error initializing PayPal:', err);
        setLoading(false);
        setError('Failed to initialize payment system. Please refresh the page and try again.');
      }
    };

    const loadScript = (attributes: Record<string, string>): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        for (const [key, value] of Object.entries(attributes)) {
          script.setAttribute(key, value);
        }
        script.addEventListener('load', () => resolve());
        script.addEventListener('error', () => reject(new Error('Script loading failed')));
        document.head.appendChild(script);
      });
    };

    const getClientToken = async (): Promise<string> => {
      const response = await apiCall('/get_client_token', {});
      return response as string;
    };

    const createOrder = async (): Promise<string> => {
      const orderData = await apiCall('/create_order', { 
        intent: CONFIG.INTENT,
        amount: amount.toString(),
        in_app_checkout: true
      });
      return orderData.id;
    };

    const completeOrder = async (orderIdToComplete: string, email: string | null = null) => {
      return await apiCall('/complete_order', {
        intent: CONFIG.INTENT,
        order_id: orderIdToComplete,
        email: email
      });
    };

    const apiCall = async (endpoint: string, data = {}) => {
      try {
        const response = await fetch(`${CONFIG.SERVER_URL}${endpoint}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType?.includes('application/json')) {
          return await response.json();
        } else {
          return await response.text();
        }
      } catch (error) {
        console.error(`Error calling ${endpoint}:`, error);
        throw error;
      }
    };

    const initializePayPalComponents = async () => {
      if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        return;
      }

      // Initialize PayPal Buttons
      if (paypalButtonsRef.current) {
        try {
          paypalButtons = window.paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'paypal'
            },

            createOrder: createOrder,

            onApprove: async (data: any) => {
              try {
                setProcessingPayment(true);
                orderId = data.orderID;
                const email = emailInputRef.current?.value || '';
                const orderDetails = await completeOrder(orderId, email);
                handlePaymentSuccess(orderDetails);
                setProcessingPayment(false);
              } catch (error) {
                console.error('Error in onApprove:', error);
                showErrorMessage('Payment processing failed. Please try again.');
                setProcessingPayment(false);
              }
            },

            onCancel: () => {
              showErrorMessage('Payment was cancelled.');
            },

            onError: (err: any) => {
              console.error('PayPal error:', err);
              showErrorMessage('An error occurred with PayPal. Please try again.');
            }
          });

          if (paypalButtons.isEligible()) {
            paypalButtons.render(paypalButtonsRef.current);
          }
        } catch (err) {
          console.error('Error rendering PayPal Buttons:', err);
        }
      }

      // Initialize Hosted Fields for Credit Cards
      if (window.paypal.HostedFields && window.paypal.HostedFields.isEligible()) {
        if (cardNumberRef.current && expirationDateRef.current && cvvRef.current) {
          try {
            paypalHostedFields = await window.paypal.HostedFields.render({
              createOrder: async () => {
                orderId = await createOrder();
                return orderId;
              },

              styles: {
                '.valid': { 
                  color: 'green' 
                },
                '.invalid': { 
                  color: 'red' 
                },
                'input': {
                  'font-size': '16px',
                  'font-family': 'Arial, sans-serif',
                  'color': 'var(--foreground)',
                  'font-weight': 'normal',
                  'transition': 'color 160ms linear',
                  'background-color': 'transparent'
                }
              },

              fields: {
                number: {
                  selector: '#card-number',
                  placeholder: '4111 1111 1111 1111',
                },
                cvv: {
                  selector: '#cvv',
                  placeholder: '123',
                },
                expirationDate: {
                  selector: '#expiration-date',
                  placeholder: 'MM/YY',
                }
              }
            });

            console.log('PayPal Hosted Fields initialized successfully');

            // Handle credit card form submission
            if (cardFormRef.current) {
              cardFormRef.current.addEventListener('submit', async (event) => {
                event.preventDefault();
                setProcessingPayment(true);

                try {
                  if (!paypalHostedFields) {
                    throw new Error('Payment system not initialized');
                  }

                  // Submit the card data to PayPal
                  await paypalHostedFields.submit({
                    cardholderName: 'Card Holder',
                    billingAddress: {
                      streetAddress: '123 Main St',
                      extendedAddress: '',
                      region: 'CA',
                      locality: 'San Jose',
                      postalCode: '95131',
                      countryCodeAlpha2: 'US'
                    }
                  });

                  // Complete the order
                  const email = emailInputRef.current?.value || '';
                  const orderDetails = await completeOrder(orderId, email);
                  handlePaymentSuccess(orderDetails);

                } catch (error) {
                  console.error('Error processing card payment:', error);
                  showErrorMessage('Card payment failed. Please check your details and try again.');
                } finally {
                  setProcessingPayment(false);
                }
              });
            }
          } catch (hostedFieldsError) {
            console.error('Error initializing PayPal Hosted Fields:', hostedFieldsError);
            if (cardFormRef.current) {
              cardFormRef.current.innerHTML = '<p class="text-red-500 text-center">Credit card payments are not available at this time.</p>';
            }
          }
        }
      } else {
        console.log('Hosted Fields not eligible');
        if (cardFormRef.current) {
          cardFormRef.current.innerHTML = '<p class="text-yellow-500 text-center">Credit card payments are not available at this time.</p>';
        }
      }
    };

    const handlePaymentSuccess = (orderDetails: any) => {
      const intentObject = CONFIG.INTENT === 'authorize' ? 'authorizations' : 'captures';
      const payment = orderDetails.purchase_units[0].payments[intentObject][0];
      
      setTransactionId(orderDetails.id);
      setPaymentSuccess(true);
      
      toast({
        title: "Deposit Successful!",
        description: `Your deposit of $${payment.amount.value} ${payment.amount.currency_code} has been completed.`,
        variant: "success",
      });
    };

    const showErrorMessage = (message: string) => {
      toast({
        title: "Payment Error",
        description: message,
        variant: "destructive",
      });
    };

    loadPayPalScript();

    // Clean up
    return () => {
      if (paypalButtons) {
        try {
          paypalButtons.close();
        } catch (err) {
          console.error("Error closing PayPal buttons:", err);
        }
      }
      
      if (paypalHostedFields) {
        try {
          paypalHostedFields.close();
        } catch (err) {
          console.error("Error closing PayPal hosted fields:", err);
        }
      }
    };
  }, [amount]);

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold text-center">Deposit Funds</h1>
        <div className="w-[70px]"></div> {/* Empty div for alignment */}
      </div>
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading payment options...</p>
        </div>
      )}
      
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">Error</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showContent && !paymentSuccess && (
        <div className="space-y-6">
          {/* Amount Input */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Deposit Amount</CardTitle>
              <CardDescription>How much would you like to deposit?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="amount" className="mb-2">Amount (USD)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">$</div>
                  <Input 
                    type="number" 
                    id="amount" 
                    className="pl-7"
                    placeholder="100.00" 
                    min="1" 
                    step="0.01" 
                    value={amount} 
                    onChange={handleAmountChange}
                    required 
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-center mt-4">${amount.toFixed(2)} USD</p>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select how you want to make your deposit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PayPal Buttons */}
              <div className="mb-6">
                <div ref={paypalButtonsRef}></div>
              </div>
              
              <div className="flex items-center justify-center my-4">
                <div className="flex-grow border-t"></div>
                <span className="px-4 text-muted-foreground text-sm">OR</span>
                <div className="flex-grow border-t"></div>
              </div>
              
              {/* Credit Card Form */}
              <form ref={cardFormRef} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Pay with Credit Card</h3>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="card-number" className="mb-2">Card Number</Label>
                  <div id="card-number" ref={cardNumberRef} className="border border-input bg-background h-11 rounded-md px-3 w-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiration-date" className="mb-2">Expiration Date</Label>
                    <div id="expiration-date" ref={expirationDateRef} className="border border-input bg-background h-11 rounded-md px-3"></div>
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="mb-2">Security Code</Label>
                    <div id="cvv" ref={cvvRef} className="border border-input bg-background h-11 rounded-md px-3"></div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="mb-2">Email (for receipt)</Label>
                  <Input 
                    ref={emailInputRef}
                    placeholder="username@email.com" 
                    type="email" 
                    id="email" 
                    required 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-2"
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Deposit ${amount.toFixed(2)}</>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                Your payment information is secure and encrypted
              </p>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {paymentSuccess && (
        <Card className="border-success">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Deposit Successful!</h3>
              <p className="text-muted-foreground mb-2">Your funds have been added to your account.</p>
              <p className="text-xl font-bold mb-6">${amount.toFixed(2)} USD</p>
              
              {transactionId && (
                <p className="text-xs text-muted-foreground mb-6">
                  Transaction ID: {transactionId}
                </p>
              )}
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setPaymentSuccess(false);
                    setShowContent(true);
                  }}
                  variant="outline"
                >
                  Make Another Deposit
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                >
                  Go Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <footer className="text-center text-muted-foreground mt-8 text-sm">
        <p>Secure Payment Processing</p>
      </footer>
    </div>
  );
};

export default DepositPage;
