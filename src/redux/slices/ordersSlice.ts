import { createSlice } from '@reduxjs/toolkit';

interface OrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
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

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;