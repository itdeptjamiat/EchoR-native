import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectListingState = (state: RootState) => state.listing;

// Memoized selectors
export const selectListings = createSelector(
  [selectListingState],
  (listing) => listing.listings || []
);

export const selectListingLoading = createSelector(
  [selectListingState],
  (listing) => listing.loading || false
);

export const selectListingError = createSelector(
  [selectListingState],
  (listing) => listing.error || null
);

// Computed selectors
export const selectListingsCount = createSelector(
  [selectListings],
  (listings) => listings.length
); 