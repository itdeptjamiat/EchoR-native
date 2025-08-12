import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

// Base selectors
export const selectMagazineState = (state: RootState) => state.magazine;

// Memoized selectors
export const selectMagazines = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.magazines
);

export const selectArticles = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.articles
);

export const selectDigests = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.digests
);

export const selectMagazineLoading = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.loading
);

export const selectMagazineDetailLoading = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.detailLoading
);

export const selectSelectedMagazine = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.selectedMagazine
);

export const selectMagazineError = createSelector(
  [selectMagazineState],
  (magazineState) => magazineState.error
);

// Computed selectors
export const selectMagazinesCount = createSelector(
  [selectMagazines],
  (magazines) => magazines.length
);

export const selectArticlesCount = createSelector(
  [selectArticles],
  (articles) => articles.length
);

export const selectDigestsCount = createSelector(
  [selectDigests],
  (digests) => digests.length
);

export const selectTotalMagazineCount = createSelector(
  [selectMagazinesCount, selectArticlesCount, selectDigestsCount],
  (magazinesCount, articlesCount, digestsCount) => 
    magazinesCount + articlesCount + digestsCount
);

export const selectFreeMagazines = createSelector(
  [selectMagazines],
  (magazines) => magazines.filter((mag: any) => mag.type === 'free')
);

export const selectProMagazines = createSelector(
  [selectMagazines],
  (magazines) => magazines.filter((mag: any) => mag.type === 'pro')
);

export const selectFreeArticles = createSelector(
  [selectArticles],
  (articles) => articles.filter((article: any) => article.type === 'free')
);

export const selectProArticles = createSelector(
  [selectArticles],
  (articles) => articles.filter((article: any) => article.type === 'pro')
);

export const selectFreeDigests = createSelector(
  [selectDigests],
  (digests) => digests.filter((digest: any) => digest.type === 'free')
);

export const selectProDigests = createSelector(
  [selectDigests],
  (digests) => digests.filter((digest: any) => digest.type === 'pro')
); 