// Implement your code for auth reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "authuser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    clearUser: (state, _) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

const authReducer = authSlice.reducer;

const authActions = authSlice.actions;

const authSelector = (state) => state.authReducer;

export { authActions, authReducer, authSelector };
