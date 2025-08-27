// Implement your code for product reducer

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  products: [],
};

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  let tempArr = [];
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.docs.forEach((product) => {
    tempArr.push(product.data());
  });

  return tempArr;
});
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (buildder) => {
    buildder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

const productsReducer = productsSlice.reducer;

const productsActions = productsSlice.actions;

const productsSelector = (state) => state.products;

export { productsActions, productsReducer, productsSelector, fetchProducts };
