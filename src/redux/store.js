import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import { authApi } from "./features/auth/AuthSlice";
import profileSlice from "./Profile/ProfileSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [authApi.reducerPath]: authApi.reducer, // ✅ RTK Query reducer
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // ✅ RTK Query middleware
});

// localStorage still for cart or token if needed
store.subscribe(() => {
  if (typeof window !== "undefined") {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.cart));
  }
});

export default store;
