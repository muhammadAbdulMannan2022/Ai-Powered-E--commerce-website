import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62a3-115-127-156-9.ngrok-free.app", // replace with your actual base URL
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
        method: "PPATCH",
        body: updates.data,
      }),
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
} = profileApi;
