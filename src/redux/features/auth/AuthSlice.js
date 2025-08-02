// features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://backend.horizoncomposite.com";

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
    // TODO: rest of not implimented
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/auth/verify_otp/",
        method: "POST",
        body: otpData,
      }),
    }),
    reSendOtp: builder.mutation({
      query: (userEmail) => ({
        url: "/auth/resend_otp/",
        method: "POST",
        body: userEmail,
      }),
    }),
    resetPassword: builder.mutation({
      query: (newData) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: newData,
      }),
    }),
    resetPasswordOtp: builder.mutation({
      query: (otpData) => ({
        url: "/auth/forgot-password-verify-otp/",
        method: "POST",
        body: otpData,
      }),
    }),

    changeEmail: builder.mutation({
      query: (newMail) => ({
        url: "/auth/email-change-request/",
        method: "POST",
        body: newMail,
      }),
    }),
    verifyChangeEmail: builder.mutation({
      query: (verifyData) => ({
        url: "/auth/verify-email-change/",
        method: "POST",
        body: verifyData,
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
  useReSendOtpMutation,
  useResetPasswordMutation,
  useResetPasswordOtpMutation,
  //
  useChangeEmailMutation,
  useVerifyChangeEmailMutation,
} = authApi;
