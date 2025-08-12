import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selectors
const selectChatState = (state: RootState) => state.chat;

// Memoized selectors
export const selectConversations = createSelector(
  [selectChatState],
  (chat) => chat.conversations || []
);

export const selectMessages = createSelector(
  [selectChatState],
  (chat) => chat.messages || []
);

export const selectChatLoading = createSelector(
  [selectChatState],
  (chat) => chat.loading || false
);

export const selectChatError = createSelector(
  [selectChatState],
  (chat) => chat.error || null
);

// Computed selectors
export const selectConversationsCount = createSelector(
  [selectConversations],
  (conversations) => conversations.length
);

export const selectMessagesCount = createSelector(
  [selectMessages],
  (messages) => messages.length
); 