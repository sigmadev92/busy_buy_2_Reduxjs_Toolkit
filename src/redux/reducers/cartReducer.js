// Implement your code for cart reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const initialState = {
  cart: [],
};

const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  let tempArr = [];
  const querySnapshot = await getDocs(collection(db, "users", userId, "cart"));
  querySnapshot.docs.forEach((item) => {
    tempArr.push(item);
  });

  return tempArr;
});

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, addedAt = new Date().toISOString() }) => {
    console.log(userId, productId);
    const newProd = await addDoc(collection(db, "users", userId, "cart"), {
      productId,
      quantity: 1,
    });
    console.log(newProd);
    return {
      productId,
      quantity: 1,
      addedAt,
    };
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (userId, cartItemId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "cart", cartItemId));
      return { success: true, id: cartItemId };
    } catch (error) {
      return { success: false };
    }
  }
);
const changeQty = createAsyncThunk(
  "cart/increaseQty",
  async (userId, cartItem, index, qty) => {
    await setDoc(doc(db, "users", userId, "cart", cartItem), {
      quantity: cartItem.quantity + qty,
    });
    return { qty, index };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.log("error");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cart.push({ ...action.payload });
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((ele) => ele.id !== action.payload.id);
      })
      .addCase(changeQty.fulfilled, (state, action) => {
        const { qty, index } = action.payload;
        state.cart[index].quantity += qty;
      });
  },
});

const cartReducer = cartSlice.reducer;

const cartActions = cartSlice.actions;

const cartSelector = (state) => state.cartReducer;

export {
  cartActions,
  cartSelector,
  cartReducer,
  fetchCart,
  addToCart,
  removeFromCart,
};
