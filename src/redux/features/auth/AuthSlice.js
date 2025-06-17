// features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://21a6-115-127-156-9.ngrok-free.app/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/normal_signup/",
        method: "POST",
        body: userData,
      }),
    }),
    socialSignupSignin: builder.mutation({
      query: (signupData) => ({
        url: "/auth/social_signup_signin/",
        method: "POST",
        body: signupData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/auth/login/",
        method: "POST",
        body: otpData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (newData) => ({
        url: "/reset-password",
        method: "POST",
        body: newData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSocialSignupSigninMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
