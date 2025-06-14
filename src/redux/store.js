import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// local setup
// Subscribe to store changes and save cart to localStorage
store.subscribe(() => {
  if (typeof window !== "undefined") {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  }
});

// end local continue

export default store;
