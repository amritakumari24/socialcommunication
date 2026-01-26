import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

// Create Redux store with user and theme slices
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
