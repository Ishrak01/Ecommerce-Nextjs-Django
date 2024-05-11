"use client"

import { apiSlice } from "../../Redux/baseApi/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (data) => ({
        url:`/products/`,
        method: 'GET',
       
        body:data
      }),
    }),

    singleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}/`,
        
       
   
      }),
    }),

    relatedProducts: builder.query({
      query: (id) => ({
        url: `/products/related-product/${id}/`,
        method: 'GET',
       
       
      }),
    }),
  }),
});

export const { useAllProductsQuery,useSingleProductsQuery,useRelatedProductsQuery } = productsApi;
