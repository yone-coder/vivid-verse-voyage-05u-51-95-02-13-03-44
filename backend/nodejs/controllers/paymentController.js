
const fetch = require('node-fetch');

// MonCash API configuration
const MONCASH_API_URL = 'https://sandbox.moncashbutton.digicelgroup.com/Api';
const MONCASH_GATEWAY_URL = 'https://sandbox.moncashbutton.digicelgroup.com';

// Mock database for development
const transactions = [];

/**
 * Get MonCash access token
 */
async function getMonCashToken() {
  try {
    const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${MONCASH_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: 'grant_type=client_credentials&scope=read,write',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log('MonCash Token Error:', errorData, 'Status:', response.status);
      throw new Error(errorData.message || 'Failed to get access token');
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting MonCash access token:', error);
    throw error;
  }
}

/**
 * Create a payment transaction
 */
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethod, developmentMode = true } = req.body;
    
    // Validate inputs
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!currency || (currency !== "USD" && currency !== "HTG")) {
      return res.status(400).json({ error: "Invalid currency" });
    }
    
    // Create a transaction ID and order ID
    const transactionId = require('crypto').randomUUID();
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create transaction object
    const transaction = {
      id: transactionId,
      created_at: new Date().toISOString(),
      amount: parseFloat(amount),
      currency,
      status: "pending",
      order_id: orderId,
      payment_provider: paymentMethod,
      payment_method: paymentMethod,
      user_id: "demo-user-id"
    };
    
    let redirectUrl = "";
    
    // Handle different payment methods
    if (paymentMethod === 'credit-card' || paymentMethod === 'paypal') {
      // PayPal or credit card payment
      redirectUrl = "https://www.paypal.com/demo/checkout";
      transaction.payment_details = {
        paypal_order_id: orderId
      };
    } 
    else if (paymentMethod === 'moncash') {
      try {
        // Get MonCash token
        const accessToken = await getMonCashToken();
        
        // Create MonCash payment
        const monCashResponse = await fetch(`${MONCASH_API_URL}/v1/CreatePayment`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            amount: parseFloat(amount), 
            orderId: orderId 
          }),
        });
        
        if (!monCashResponse.ok) {
          const errorData = await monCashResponse.json();
          console.error('MonCash payment creation error:', errorData);
          return res.status(monCashResponse.status).json({ 
            error: errorData.message || 'Payment creation failed',
            details: errorData
          });
        }
        
        const paymentData = await monCashResponse.json();
        
        // Construct MonCash redirect URL
        if (paymentData.payment_token && paymentData.payment_token.token) {
          redirectUrl = `${MONCASH_GATEWAY_URL}/Moncash-middleware/Payment/Redirect?token=${paymentData.payment_token.token}`;
          
          // Add MonCash specific details
          transaction.payment_details = {
            moncash_token: paymentData.payment_token.token,
            moncash_transaction_id: paymentData.transaction_id || null
          };
        } else {
          console.error('Invalid MonCash response:', paymentData);
          return res.status(500).json({ error: 'Invalid MonCash response structure' });
        }
      } catch (error) {
        console.error('MonCash processing error:', error);
        return res.status(500).json({ 
          error: 'Failed to process MonCash payment',
          details: error.message
        });
      }
    } 
    else {
      // For other payment methods
      redirectUrl = `/transfer/confirm/${transaction.id}`;
    }
    
    // Store in our database
    transactions.push(transaction);
    console.log(`Created transaction: ${JSON.stringify(transaction)}`);
    
    return res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
      nextSteps: {
        action: "redirect",
        paymentMethod,
        redirectUrl
      }
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to process payment",
      details: error.stack || "No error details available"
    });
  }
};

/**
 * Get payment status by ID
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find transaction in our mock database
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    
    return res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return res.status(500).json({ error: error.message });
  }
};
