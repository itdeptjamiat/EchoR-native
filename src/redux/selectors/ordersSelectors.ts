import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectOrdersState = (state: RootState) => state.orders;

// Memoized selectors
export const selectOrders = createSelector(
  [selectOrdersState],
  (orders) => orders.orders || []
);

export const selectOrdersLoading = createSelector(
  [selectOrdersState],
  (orders) => orders.loading || false
);

export const selectOrdersError = createSelector(
  [selectOrdersState],
  (orders) => orders.error || null
);

// Computed selectors
export const selectOrdersCount = createSelector(
  [selectOrders],
  (orders) => orders.length
); 