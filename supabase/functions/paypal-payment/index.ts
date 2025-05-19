
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
    throw new Error("Failed to authenticate with PayPal");
  }
  
  return data.access_token;
}

// Create a PayPal order
async function createPayPalOrder(amount: string, currency: string) {
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
    throw new Error("Failed to create PayPal order");
  }
  
  return data;
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

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
        const paypalOrder = await createPayPalOrder(amount, currency);
        
        // Find the approval URL
        const approvalUrl = paypalOrder.links.find((link: any) => link.rel === "approve").href;
        
        // Create a pending transaction in database
        const { data: transactionData, error: transactionError } = await supabase
          .from("transactions")
          .insert({
            amount: parseFloat(amount),
            currency,
            status: "pending",
            order_id: paypalOrder.id,
            payment_provider: "paypal",
            user_id: req.headers.get("authorization") ? req.headers.get("authorization")!.split(" ")[1] : null,
            payment_details: {
              paypal_order_id: paypalOrder.id
            }
          })
          .select()
          .single();
        
        if (transactionError) {
          console.error("Error creating transaction:", transactionError);
          throw new Error("Failed to create transaction");
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
        console.error("PayPal order creation error:", error.message);
        throw new Error(`Failed to create PayPal payment: ${error.message}`);
      }
    } else {
      // For all other payment methods, we'll just create a pending transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          amount: parseFloat(amount),
          currency,
          status: "pending",
          order_id: `ORDER-${Date.now()}`,
          payment_provider: paymentMethod,
          user_id: req.headers.get("authorization") ? req.headers.get("authorization")!.split(" ")[1] : null
        })
        .select()
        .single();
      
      if (transactionError) {
        console.error("Error creating transaction:", transactionError);
        throw new Error("Failed to create transaction");
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
    }
  } catch (error) {
    console.error("Payment processing error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
