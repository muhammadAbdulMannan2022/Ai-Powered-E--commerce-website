import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://endlessly-unified-guppy.ngrok-free.app/",
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
    getAllVideo: builder.query({
      query: () => "api/woodvideos/",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategorysAllProductQuery,
  useGetHeightOptionsQuery, // ✅ Correct
  useAiResponceMutation,
  useGetAllVideoQuery,
} = productApi;
