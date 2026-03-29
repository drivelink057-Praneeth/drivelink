import { renderHook, act } from '@testing-library/react';
import { useStripeOnboarding } from './useStripeOnboarding';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../lib/supabase';

vi.mock('../lib/supabase', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

describe('useStripeOnboarding hook (Stripe Redirect Logic)', () => {
  let originalLocationHref: string;

  beforeEach(() => {
    vi.clearAllMocks();
    originalLocationHref = window.location.href;
    // Mock window location
    delete (window as any).location;
    window.location = { href: originalLocationHref } as any;
  });

  afterEach(() => {
    window.location.href = originalLocationHref;
  });

  it('generates an onboarding link and redirects the user when successful', async () => {
    const fakeUrl = 'https://connect.stripe.com/onboarding/test1234';
    vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
      data: { url: fakeUrl },
      error: null,
    });

    const { result } = renderHook(() => useStripeOnboarding());

    await act(async () => {
      await result.current.startOnboarding('school_abc');
    });

    expect(supabase.functions.invoke).toHaveBeenCalledWith('get-onboarding-link', {
      body: { school_id: 'school_abc' },
    });
    
    // Test the redirect logic
    expect(window.location.href).toBe(fakeUrl);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles a missing URL safely', async () => {
    vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
      data: {}, // no URL returned
      error: null,
    });

    const { result } = renderHook(() => useStripeOnboarding());

    await act(async () => {
      await result.current.startOnboarding('school_missing_url');
    });

    expect(result.current.error).toBe('No onboarding URL returned');
    expect(window.location.href).not.toBe('');
  });

  it('sets the error state if the edge function throws an error', async () => {
    const errorMsg = 'Failed to generate onboarding link';
    vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
      data: null,
      error: { message: errorMsg },
    });

    const { result } = renderHook(() => useStripeOnboarding());

    await act(async () => {
      await result.current.startOnboarding('school_error');
    });

    expect(result.current.error).toBe(errorMsg);
    expect(result.current.isLoading).toBe(false);
  });
});
