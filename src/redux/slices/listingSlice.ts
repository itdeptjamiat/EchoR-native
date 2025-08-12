import { createSlice } from '@reduxjs/toolkit';

interface ListingState {
  listings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  listings: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add async thunk cases here
  },
});

export const { clearError } = listingSlice.actions;
export default listingSlice.reducer;