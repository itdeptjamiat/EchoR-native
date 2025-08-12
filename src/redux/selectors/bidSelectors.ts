import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectBidState = (state: RootState) => state.bid;

// Memoized selectors
export const selectBids = createSelector(
  [selectBidState],
  (bid) => bid.bids || []
);

export const selectBidLoading = createSelector(
  [selectBidState],
  (bid) => bid.loading || false
);

export const selectBidError = createSelector(
  [selectBidState],
  (bid) => bid.error || null
);

// Computed selectors
export const selectBidsCount = createSelector(
  [selectBids],
  (bids) => bids.length
); 