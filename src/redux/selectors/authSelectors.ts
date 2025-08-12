import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectAuthState = (state: RootState) => state.auth;

// Memoized selectors
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

// Computed selectors
export const selectIsAuthReady = createSelector(
  [selectAuthLoading, selectIsAuthenticated],
  (loading, isAuthenticated) => !loading && isAuthenticated
);

export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name || ''
);

export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user?.email || ''
);

export const selectUserAvatar = createSelector(
  [selectUser],
  (user) => user?.avatar
);