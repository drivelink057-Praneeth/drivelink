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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { school_id } = await req.json()

    if (!school_id) {
      throw new Error("Missing school_id parameter")
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if the school already has a stripe_account_id
    const { data: school, error: fetchError } = await supabaseClient
      .from('schools')
      .select('stripe_account_id, business_name, email')
      .eq('id', school_id)
      .single()

    if (fetchError || !school) throw new Error("School not found")

    let accountId = school.stripe_account_id

    // If no Stripe Connect Express account exists, create one
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        email: school.email || undefined,
        business_profile: {
          name: school.business_name,
        },
      })
      accountId = account.id

      // Save it back to the database
      const { error: dbError } = await supabaseClient
        .from('schools')
        .update({ stripe_account_id: accountId })
        .eq('id', school_id)

      if (dbError) throw dbError
    }

    const frontendUrl = Deno.env.get('FRONTEND_URL') ?? 'http://localhost:3000'
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${frontendUrl}/business/onboarding/refresh?school_id=${school_id}`,
      return_url: `${frontendUrl}/business/onboarding/success?school_id=${school_id}`,
      type: 'account_onboarding',
    })

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