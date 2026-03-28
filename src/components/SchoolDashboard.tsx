import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useStripeOnboarding } from '../hooks/useStripeOnboarding';

interface SchoolProfile {
  id: string;
  business_name: string;
  is_onboarded: boolean;
  stripe_account_id: string | null;
}

export function SchoolDashboard({ schoolId }: { schoolId: string }) {
  const [school, setSchool] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { startOnboarding, isLoading: isStripeLoading, error: stripeError } = useStripeOnboarding();

  // Fetch the latest school profile status when the dashboard loads 
  // (e.g., when they return from the Stripe onboarding success redirect)
  useEffect(() => {
    async function fetchSchool() {
      try {
        const { data, error } = await supabase
          .from('schools')
          .select('id, business_name, is_onboarded, stripe_account_id')
          .eq('id', schoolId)
          .single();

        if (error) throw error;
        setSchool(data);
      } catch (err) {
        console.error('Error fetching school profile:', err);
      } finally {
        setLoading(false);
      }
    }

    if (schoolId) {
      fetchSchool();
    }
  }, [schoolId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  if (!school) {
    return <div className="p-8 text-center text-red-500">School profile not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-2">Welcome, {school.business_name}</h1>
      <p className="text-gray-600 mb-8">Manage your bookings, packages, and payments here.</p>

      <div className="p-6 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Payment & Payout Status</h2>
        
        {school.is_onboarded ? (
          <div className="flex items-center space-x-3 text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-medium text-lg">Your Stripe account is fully connected. You are ready to accept bookings!</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-3 text-amber-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">Action Required: You cannot receive student bookings until you set up your payout details.</span>
            </div>
            
            <button
              onClick={() => startOnboarding(school.id)}
              disabled={isStripeLoading}
              className={`px-6 py-3 font-semibold text-white rounded-md transition-all ${
                isStripeLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isStripeLoading ? 'Generating Link...' : 'Set Up Direct Deposits via Stripe'}
            </button>
            
            {stripeError && (
              <p className="text-red-500 mt-3 text-sm">{stripeError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}