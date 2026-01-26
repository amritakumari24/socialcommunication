import { createSlice } from '@reduxjs/toolkit';

// User slice to manage logged-in user state
const initialState = {
  currentUser: {
    id: 1,
    username: 'john_doe',
    displayName: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john_doe',
    email: 'john@example.com'
  },
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the current logged-in user
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    // Clear user when logging out
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
