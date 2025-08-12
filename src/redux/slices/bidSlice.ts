import { createSlice } from '@reduxjs/toolkit';

interface BidState {
  bids: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BidState = {
  bids: [],
  loading: false,
  error: null,
};

const bidSlice = createSlice({
  name: 'bid',
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

export const { clearError } = bidSlice.actions;
export default bidSlice.reducer;