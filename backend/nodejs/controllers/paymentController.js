
// Mock database for development
const transactions = [];

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
    
    // Create a mock transaction (similar to the Supabase function)
    const orderId = `TEST-${Date.now()}`;
    let redirectUrl = "";
    const transaction = {
      id: require('crypto').randomUUID(),
      created_at: new Date().toISOString(),
      amount: parseFloat(amount),
      currency,
      status: "pending",
      order_id: orderId,
      payment_provider: paymentMethod === 'credit-card' ? "paypal_card" : paymentMethod,
      payment_method: paymentMethod,
      user_id: "demo-user-id"
    };
    
    // Handle PayPal/Credit Card payment
    if (paymentMethod === 'credit-card' || paymentMethod === 'paypal') {
      redirectUrl = "https://www.paypal.com/demo/checkout";
      
      // Add PayPal specific mock data
      transaction.payment_details = {
        paypal_order_id: orderId
      };
    } else {
      redirectUrl = `/transfer/confirm/${transaction.id}`;
    }
    
    // Store in our mock database
    transactions.push(transaction);
    console.log(`Created mock transaction: ${JSON.stringify(transaction)}`);
    
    return res.status(200).json({
      success: true,
      message: "Transaction created (development mode)",
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
