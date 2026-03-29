import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSchoolsByRadius } from './api';
import { supabase } from './supabase';

vi.mock('./supabase', () => ({
  supabase: {
    rpc: vi.fn(),
  },
}));

describe('fetchSchoolsByRadius (Radius Engine)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches schools successfully for a valid zip code', async () => {
    const mockData = [
      { id: '1', business_name: 'School A', zip_code: '30062' },
      { id: '2', business_name: 'School B', zip_code: '30060' },
    ];
    vi.mocked(supabase.rpc).mockResolvedValueOnce({ data: mockData, error: null });

    const result = await fetchSchoolsByRadius('30062', 10);
    
    expect(supabase.rpc).toHaveBeenCalledWith('get_schools_by_radius', {
      target_zip: '30062',
      radius_miles: 10,
    });
    expect(result).toEqual(mockData);
  });

  it('handles invalid/empty zip codes correctly by returning empty arrays', async () => {
    vi.mocked(supabase.rpc).mockResolvedValueOnce({ data: [], error: null });

    const result = await fetchSchoolsByRadius('00000', 5);
    
    expect(supabase.rpc).toHaveBeenCalledWith('get_schools_by_radius', {
      target_zip: '00000',
      radius_miles: 5,
    });
    expect(result).toEqual([]);
  });

  it('throws an error if Supabase RPC fails', async () => {
    const errorMsg = 'Database connection error';
    vi.mocked(supabase.rpc).mockResolvedValueOnce({ data: null, error: { message: errorMsg } });

    await expect(fetchSchoolsByRadius('30062', 20)).rejects.toThrow(errorMsg);
  });
});
