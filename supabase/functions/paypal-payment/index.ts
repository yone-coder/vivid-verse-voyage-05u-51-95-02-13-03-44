
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

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

    // Get client credentials from environment variables
    const clientId = Deno.env.get("PAYPAL_CLIENT_ID")
    const clientSecret = Deno.env.get("PAYPAL_SECRET_KEY")

    if (!clientId || !clientSecret) {
      throw new Error("PayPal configuration missing")
    }

    // Get the request data
    const { amount, currency, paymentMethod, orderDetails }: PaymentRequest = await req.json()

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

    // If this is a PayPal payment that was processed client-side, we just need to verify and save
    if (req.headers.get("x-paypal-transaction-id")) {
      const paypalTransactionId = req.headers.get("x-paypal-transaction-id")
      const paypalOrderId = req.headers.get("x-paypal-order-id")
      
      // Get the authentication token
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      const tokenResponse = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${auth}`
        },
        body: "grant_type=client_credentials"
      })

      const tokenData = await tokenResponse.json()
      
      if (!tokenResponse.ok) {
        console.error("Error getting PayPal access token:", tokenData)
        throw new Error("Failed to authenticate with PayPal")
      }
      
      // Verify the transaction with PayPal
      const verifyResponse = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}`, {
        headers: {
          "Authorization": `Bearer ${tokenData.access_token}`
        }
      })
      
      const verifyData = await verifyResponse.json()
      
      if (!verifyResponse.ok) {
        console.error("Error verifying PayPal transaction:", verifyData)
        throw new Error("Failed to verify PayPal transaction")
      }
      
      // Save the transaction in the database
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          amount: parseFloat(amount),
          currency,
          status: "completed",
          order_id: paypalOrderId,
          payment_provider: "paypal",
          payment_token: null,
          transaction_id: paypalTransactionId,
          user_id: req.headers.get("authorization") ? req.headers.get("authorization")!.split(" ")[1] : null
        })
        .select()
        .single()
      
      if (transactionError) {
        console.error("Error saving transaction:", transactionError)
        throw new Error("Failed to save transaction")
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Payment verified and saved",
          transaction: transactionData
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }
    
    // For other payment methods, we'll just create a pending transaction
    // In a real app, you'd integrate with additional payment gateways here
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
      .single()
    
    if (transactionError) {
      console.error("Error creating transaction:", transactionError)
      throw new Error("Failed to create transaction")
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
    )
  } catch (error) {
    console.error("Payment processing error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
