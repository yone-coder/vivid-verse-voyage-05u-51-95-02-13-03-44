
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0"

// Set up CORS headers for the API
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Handle OPTIONS requests for CORS preflight
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }
}

interface PaymentRequest {
  amount: string
  currency: string
  paymentMethod: string
  orderDetails?: {
    recipientName?: string
    recipientPhone?: string
    transferPurpose?: string
  }
}

// PayPal environment variables
const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID") || "";
const PAYPAL_CLIENT_SECRET = Deno.env.get("PAYPAL_CLIENT_SECRET") || "";
const PAYPAL_BASE_URL = Deno.env.get("PAYPAL_ENVIRONMENT") === "production" 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

// Generate PayPal access token
async function getPayPalAccessToken() {
  try {
    const auth = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`);
    
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Failed to get PayPal access token:", data);
      throw new Error(`Failed to authenticate with PayPal: ${data.error_description || 'Unknown error'}`);
    }
    
    return data.access_token;
  } catch (error) {
    console.error("PayPal auth error:", error);
    throw new Error(`PayPal authentication failed: ${error.message}`);
  }
}

// Create a PayPal order
async function createPayPalOrder(amount: string, currency: string) {
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
        application_context: {
          return_url: `${Deno.env.get("APP_URL") || "http://localhost:5173"}/transfer/confirm`,
          cancel_url: `${Deno.env.get("APP_URL") || "http://localhost:5173"}/transfer`,
        },
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Failed to create PayPal order:", data);
      throw new Error(`Failed to create PayPal order: ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error("PayPal order creation error:", error);
    throw new Error(`PayPal order creation failed: ${error.message}`);
  }
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // For testing/development mode - create dummy successful transactions without PayPal
    const isDevelopmentMode = true; // Set to true to bypass actual PayPal API calls
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase credentials");
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the request data
    const { amount, currency, paymentMethod, orderDetails }: PaymentRequest = await req.json();

    // Validate the input
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    if (!currency || (currency !== "USD" && currency !== "HTG")) {
      return new Response(
        JSON.stringify({ error: "Invalid currency" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }
    
    // Handle PayPal/Credit Card payment
    if (paymentMethod === 'credit-card' || paymentMethod === 'paypal') {
      try {
        let paypalOrder;
        let approvalUrl;
        
        if (!isDevelopmentMode) {
          // Production mode: Create actual PayPal order
          paypalOrder = await createPayPalOrder(amount, currency);
          approvalUrl = paypalOrder.links.find((link: any) => link.rel === "approve")?.href;
          
          if (!approvalUrl) {
            throw new Error("Failed to get PayPal approval URL");
          }
        } else {
          // Development mode: Create dummy PayPal order for testing
          const orderId = `TEST-${Date.now()}`;
          paypalOrder = {
            id: orderId,
            status: "CREATED",
            links: [
              {
                href: `https://sandbox.paypal.com/checkoutnow?token=${orderId}`,
                rel: "approve",
                method: "GET"
              }
            ]
          };
          approvalUrl = paypalOrder.links[0].href;
        }
        
        // Create a pending transaction in database
        const { data: transactionData, error: transactionError } = await supabase
          .from("transactions")
          .insert({
            amount: parseFloat(amount),
            currency,
            status: "pending",
            order_id: paypalOrder.id,
            payment_provider: paymentMethod === 'credit-card' ? "paypal_card" : "paypal",
            payment_method: paymentMethod,
            payment_details: {
              paypal_order_id: paypalOrder.id
            }
          })
          .select()
          .single();
        
        if (transactionError) {
          console.error("Error creating transaction:", transactionError);
          throw new Error(`Database error: ${transactionError.message || 'Failed to create transaction'}`);
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "PayPal order created",
            transaction: transactionData,
            paypalOrder: paypalOrder,
            nextSteps: {
              action: "redirect",
              paymentMethod,
              redirectUrl: approvalUrl
            }
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("PayPal processing error:", error.message);
        throw new Error(`Payment processing failed: ${error.message}`);
      }
    } else {
      // For all other payment methods, we'll just create a pending transaction
      try {
        const orderId = `ORDER-${Date.now()}`;
        
        const { data: transactionData, error: transactionError } = await supabase
          .from("transactions")
          .insert({
            amount: parseFloat(amount),
            currency,
            status: "pending",
            order_id: orderId,
            payment_provider: paymentMethod,
            payment_method: paymentMethod
          })
          .select()
          .single();
        
        if (transactionError) {
          console.error("Error creating transaction:", transactionError);
          throw new Error(`Database error: ${transactionError.message || 'Failed to create transaction'}`);
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Transaction created",
            transaction: transactionData,
            nextSteps: {
              action: "redirect",
              paymentMethod,
              redirectUrl: `/transfer/confirm/${transactionData.id}`
            }
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Transaction creation error:", error.message);
        throw new Error(`Transaction creation failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.error("Payment processing error:", error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack || "No error details available"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
