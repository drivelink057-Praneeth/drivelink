import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.14.0"

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY') ?? ''
const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { school_id, email, business_name } = await req.json()

    if (!school_id) {
      throw new Error("Missing school_id parameter")
    }

    // 1. Create a Stripe Express connected account for the driving school
    const account = await stripe.accounts.create({
      type: 'express',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      email: email,
      business_profile: {
        name: business_name,
        product_description: "Driving school courses and behind-the-wheel instruction",
      },
    })

    // 2. Save the Stripe account ID to our Supabase database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // NOTE: This assumes an added 'stripe_account_id' column on the schools table
    const { error: dbError } = await supabaseClient
      .from('schools')
      .update({ stripe_account_id: account.id })
      .eq('id', school_id)

    if (dbError) throw dbError

    // 3. Generate the onboarding link for the school owner to complete their profile
    const frontendUrl = Deno.env.get('FRONTEND_URL') ?? 'http://localhost:3000'
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${frontendUrl}/business/onboarding/refresh`,
      return_url: `${frontendUrl}/business/onboarding/success?school_id=${school_id}`,
      type: 'account_onboarding',
    })

    // Return the URL directly to the frontend so they can redirect the user
    return new Response(
      JSON.stringify({ url: accountLink.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})