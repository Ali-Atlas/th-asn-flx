import { create } from 'zustand';

interface AppState {
  // Test data
  testData: any;
  
  // Common data
  selectedItem: any | null;
  items: any[];
  
  // UI State
  searchTerm: string;
  isLoading: boolean;
  isModalOpen: boolean;
  
  // Filters
  filters: {
    category: string;
    sortBy: string;
    orderBy: 'asc' | 'desc';
  };
  
  // Actions
  setTestData: (data: any) => void;
  setSelectedItem: (item: any) => void;
  setItems: (items: any[]) => void;
  setSearchTerm: (term: string) => void;
  setLoading: (loading: boolean) => void;
  toggleModal: () => void;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  testData: null,
  selectedItem: null,
  items: [],
  searchTerm: '',
  isLoading: false,
  isModalOpen: false,
  filters: {
    category: 'all',
    sortBy: 'name',
    orderBy: 'asc',
  },
  
  // Actions
  setTestData: (data) => set({ testData: data }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setItems: (items) => set({ items }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  resetFilters: () => set({
    filters: {
      category: 'all',
      sortBy: 'name',
      orderBy: 'asc',
    }
  }),
}));