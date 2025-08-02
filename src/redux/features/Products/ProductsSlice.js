import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.horizoncomposite.com/",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "api/wood-categories/",
    }),
    getProduct: builder.query({
      query: (slag) => `api/woodtypes/${slag}/`,
    }),
    getCategorysAllProduct: builder.query({
      query: (slug) => `api/wood-categories/${slug}/`,
    }),
    getHeightOptions: builder.query({
      query: () => "api/fence-height-options/",
    }),
    // ai
    aiResponce: builder.mutation({
      query: (data) => ({
        url: "chat/chat_with_bot/",
        method: "POST",
        body: data,
      }),
    }),
    // get all video
    getGallery: builder.query({
      query: () => "api/lending-gallery/",
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "api/contact-form-submit/",
        method: "POST",
        body: data,
      }),
    }),
    getFaq: builder.query({
      query: () => "faqs/",
    }),
    getReviews: builder.query({
      query: () => "api/reviews/paid-orders/",
    }),
    search: builder.query({
      query: (slag) => `search/?q=${slag}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategorysAllProductQuery,
  useGetHeightOptionsQuery, // ✅ Correct
  useAiResponceMutation,
  useSendMessageMutation,
  useGetGalleryQuery,
  useGetFaqQuery,
  useGetReviewsQuery,
  useSearchQuery,
} = productApi;
