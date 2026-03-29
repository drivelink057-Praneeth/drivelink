import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchResults from './SearchResults';
import { BrowserRouter } from 'react-router-dom';
import * as useSchoolsHook from '../hooks/useSchools';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/Navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('@/components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('@/components/SchoolCard', () => ({ 
  default: ({ school }: any) => <div data-testid={`school-card-${school.id}`}>{school.business_name}</div> 
}));

// Mock ResizeObserver for Radix UI
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Search Components (UI Filtering)', () => {
  const mockSchools = [
    { id: '1', business_name: 'School A', zip_code: '30080', description: 'Offers pickup and drop-off', rating: 5 },
    { id: '2', business_name: 'School B', zip_code: '30062', description: 'Standard driving lessons', rating: 4 },
    { id: '3', business_name: 'School C', zip_code: '30080', description: 'No transport available', rating: 3 },
  ];

  const mockPackages = [
    { school_id: '1', price: 299 },
    { school_id: '2', price: 450 },
    { school_id: '3', price: 600 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useSchoolsHook, 'useSchools').mockReturnValue({ data: mockSchools, isLoading: false } as any);
    vi.spyOn(useSchoolsHook, 'useAllPackages').mockReturnValue({ data: mockPackages, isLoading: false } as any);
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );
  };

  it('renders correctly and filters by default zip code (30080)', () => {
    renderComponent();
    expect(screen.getByTestId('school-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('school-card-3')).toBeInTheDocument();
    expect(screen.queryByTestId('school-card-2')).not.toBeInTheDocument();
  });

  it('filters by pickup feature', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    // Radix checkbox is a button with role="checkbox"
    const pickupCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(pickupCheckbox);

    await waitFor(() => {
      expect(screen.queryByTestId('school-card-3')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('school-card-1')).toBeInTheDocument();
  });
});
