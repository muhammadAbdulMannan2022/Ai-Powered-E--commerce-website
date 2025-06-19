import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://62a3-115-127-156-9.ngrok-free.app/",
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategorysAllProductQuery,
  useGetHeightOptionsQuery, // ✅ Correct
} = productApi;
