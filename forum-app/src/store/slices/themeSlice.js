import { createSlice } from '@reduxjs/toolkit';

// Theme slice to manage dark/light mode
const initialState = {
  mode: 'light', // 'light' or 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggle between light and dark mode
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    // Set a specific theme
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
