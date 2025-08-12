import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  conversations: any[];
  messages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
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

export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;