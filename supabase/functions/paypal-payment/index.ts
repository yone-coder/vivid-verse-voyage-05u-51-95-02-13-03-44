
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
    
    // For all payment methods, we'll just create a pending transaction
    // In a real app, you'd integrate with the specific payment gateways here
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
