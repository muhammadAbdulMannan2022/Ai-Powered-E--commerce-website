// // redux/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cartSlice",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.cart.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.selectedColor === action.payload.selectedColor
//       );
//       if (existing) {
//         existing.quantity += action.payload.quantity;
//         existing.totalPrice =
//           existing.quantity * parseFloat(existing.unitPrice);
//       } else {
//         state.cart.push(action.payload);
//       }
//     },
//     updateCartItem: (state, action) => {
//       const { productId, selectedColor, key, value } = action.payload;
//       const item = state.cart.find(
//         (item) =>
//           item.productId === productId && item.selectedColor === selectedColor
//       );
//       if (item) {
//         item[key] = value;
//         item.totalPrice = item.quantity * parseFloat(item.unitPrice);
//       }
//     },
//     removeCartItem: (state, action) => {
//       const { productId, selectedColor } = action.payload;
//       state.cart = state.cart.filter(
//         (item) =>
//           item.productId !== productId || item.selectedColor !== selectedColor
//       );
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     },
//   },
// });

// export const { addToCart, updateCartItem, removeCartItem, clearCart } =
//   cartSlice.actions;

// export default cartSlice.reducer;

// local test

// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load saved cart from localStorage, or fallback to empty array
const savedCart =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;

const initialState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedColor === action.payload.selectedColor
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.totalPrice =
          existing.quantity * parseFloat(existing.unitPrice);
      } else {
        state.cart.push(action.payload);
      }
    },
    updateCartItem: (state, action) => {
      const { productId, selectedColor, key, value } = action.payload;
      const item = state.cart.find(
        (item) =>
          item.productId === productId && item.selectedColor === selectedColor
      );
      if (item) {
        item[key] = value;
        item.totalPrice = item.quantity * parseFloat(item.unitPrice);
      }
    },
    removeCartItem: (state, action) => {
      const { productId, selectedColor } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          item.productId !== productId || item.selectedColor !== selectedColor
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, updateCartItem, removeCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
