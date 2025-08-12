import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authSlice from './slices/authSlice';
import listingSlice from './slices/listingSlice';
import bidSlice from './slices/bidSlice';
import chatSlice from './slices/chatSlice';
import ordersSlice from './slices/ordersSlice';
import magazineSlice from './slices/magazineSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authSlice,
  listing: listingSlice,
  bid: bidSlice,
  chat: chatSlice,
  orders: ordersSlice,
  magazine: magazineSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;