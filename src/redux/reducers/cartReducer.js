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

/*
  cartItem = {
    cartItemId,
    productId,
    quantity,
    addedAt:
  }
*/

const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  let tempArr = [];
  const querySnapshot = await getDocs(collection(db, "users", userId, "cart"));
  querySnapshot.docs.forEach((item) => {
    tempArr.push({ ...item.data(), cartItemId: item.id });
  });
  console.log(tempArr);
  return tempArr;
});

const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, addedAt = new Date().toISOString() }) => {
    console.log(userId, productId);
    const ref = await addDoc(collection(db, "users", userId, "cart"), {
      productId,
      quantity: 1,
    });

    return {
      productId,
      quantity: 1,
      addedAt,
      cartItemId: ref.id,
    };
  }
);

const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, cartItemId, index }) => {
    console.log(userId, cartItemId);
    try {
      await deleteDoc(doc(db, "users", userId, "cart", cartItemId));
      return { success: true, index };
    } catch (error) {
      return { success: false };
    }
  }
);
const changeQty = createAsyncThunk(
  "cart/increaseQty",
  async ({ userId, index, cartItem, qty }) => {
    const { cartItemId, quantity } = cartItem;
    await setDoc(doc(db, "users", userId, "cart", cartItemId), {
      quantity: quantity + qty,
    });
    return { qty, index, quantity };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state, _) => {
      state.cart = [];
    },
  },
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
        console.log(action.payload);
        state.cart.splice(action.payload.index, 1);
      })
      .addCase(changeQty.fulfilled, (state, action) => {
        const { qty, index, quantity } = action.payload;
        state.cart[index].quantity = quantity + qty;
      });
  },
});

const cartReducer = cartSlice.reducer;

const cartActions = cartSlice.actions;

const cartSelector = (state) => state.cart;

export {
  cartActions,
  cartSelector,
  cartReducer,
  fetchCart,
  addToCart,
  removeFromCart,
  changeQty,
};
