import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://endlessly-unified-guppy.ngrok-free.app", // replace with your actual base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("ngrok-skip-browser-warning", "true");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/auth/user_profile/", // your GET profile endpoint
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/auth/user_profile/",
        method: "PATCH",
        body: profileData,
      }),
    }),
    // extra
    getRecent: builder.query({
      query: () => "api/recent-views/",
    }),
    changeEmail: builder.mutation({
      query: (email) => ({
        url: "/auth/email-change-request/",
        method: "POST",
        body: email,
      }),
    }),
    emailOtpVerify: builder.mutation({
      query: (otpData) => ({
        url: "auth/verify-email-change/",
        method: "POST",
        body: otpData,
      }),
    }),
    getCart: builder.query({
      query: () => "api/cart/",
    }),
    addItemsToCart: builder.mutation({
      query: (cart) => ({
        url: "api/cart/add/",
        method: "POST",
        body: cart,
      }),
    }),
    updateCartItemData: builder.mutation({
      query: (updates) => ({
        url: `api/cart/items/${updates.itemId}/`,
        method: "PATCH",
        body: updates.data,
      }),
    }),
    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `api/cart/items/${id}/`,
        method: "DELETE",
      }),
    }),
    checkout: builder.mutation({
      query: (checkoutData) => ({
        url: `api/orders/place/`,
        method: "POST",
        body: checkoutData,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `api/orders/${id}/`,
    }),
    getAllOrderDetails: builder.query({
      query: () => `api/orders/`,
    }),
    // recent-views
    recientViews: builder.mutation({
      query: (woodId) => ({
        url: "api/recent-views/",
        method: "POST",
        body: woodId,
      }),
    }),
    // all success order
    allComplitedOrder: builder.query({
      query: () => "api/orders/",
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetRecentQuery,
  useChangeEmailMutation,
  useEmailOtpVerifyMutation,
  // cart
  useAddItemsToCartMutation,
  useGetCartQuery,
  useUpdateCartItemDataMutation,
  useRemoveCartItemMutation,
  useCheckoutMutation,
  // success
  useGetOrderDetailsQuery,
  useGetAllOrderDetailsQuery,
  //add to recent
  useRecientViewsMutation,
  // get all success order
  useAllComplitedOrderQuery,
} = profileApi;
