import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://21a6-115-127-156-9.ngrok-free.app/",
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
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
