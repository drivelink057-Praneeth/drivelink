# Stripe Onboarding Logic Guide

This logic implements the core "Money Move" phase for the Lovable UI frontend, bridging the gap between student checkout and driving school payout.

## 1. The Revenue Layer (Stripe Connect Express)
Because DriveLink acts as a **Platform Marketplace**, we use Stripe Connect. We don't touch the funds manually—we route the $495 transaction from the student directly to the school's connected Stripe account, instantly splitting out the platform fee.

## 2. Frontend Logic: The "Book Now" Button

### Scenario A: School is NOT Onboarded (`is_onboarded === false`)
If the selected school does not have `is_onboarded: true` in the Supabase database, they cannot accept real money yet.
*   **Button Text:** "Join Waitlist"
*   **Action:** Clicking the button should open a modal capturing the student's email/phone to add them to a waitlist for this specific school. (This builds demand we can show the school owner).

### Scenario B: School IS Onboarded (`is_onboarded === true`)
If the school has successfully completed their Stripe Express onboarding, they are ready to transact.
*   **Button Text:** "Book Now"
*   **Action:** Clicking the button initiates the standard Stripe Checkout session (using the school's `stripe_account_id` as the destination account).

## 3. The `get-onboarding-link` Edge Function
We have a new edge function ready to deploy at `supabase/functions/get-onboarding-link`.

**How it works:**
When a school owner clicks "Claim Business" in their DriveLink dashboard:
1. The frontend POSTs their `school_id` to this function.
2. The function checks if they have a `stripe_account_id`.
3. If not, it creates a new Stripe Express account for them.
4. It generates a secure, one-time Stripe Onboarding URL.
5. The frontend redirects the owner to that URL so they can add their bank details securely on Stripe.