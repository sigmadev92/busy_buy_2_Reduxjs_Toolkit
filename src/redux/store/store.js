import { configureStore } from "@reduxjs/toolkit";
// Import your reducer and use them accordingly
// Note that you have to name the auth ,product and cart only.
export const store = configureStore({
  reducer: {},
});

// Expose the store to window for debugging in development mode do not modify the below code or else the test case will not run
if (process.env.NODE_ENV === "development") {
  window.store = store;
}
