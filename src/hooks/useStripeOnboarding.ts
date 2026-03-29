import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useStripeOnboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startOnboarding = async (schoolId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('get-onboarding-link', {
        body: { school_id: schoolId },
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate onboarding link');
      }

      if (data?.url) {
        // Redirect the user to the Stripe Connect Onboarding page
        window.location.href = data.url;
      } else {
        throw new Error('No onboarding URL returned');
      }
    } catch (err: any) {
      console.error('Stripe Onboarding Error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { startOnboarding, isLoading, error };
}