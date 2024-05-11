

import { apiSlice } from "../../Redux/baseApi/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  tagTypes:['cart','delete','update'],
  endpoints: (builder) => ({
    cart: builder.query({
      query: () => ({
        url: "/cart/",
        method: 'GET',
      }),
      providesTags: ['cart','delete','update']
    }),

    addEmptyCart: builder.mutation({
      query: (data) => ({
        url: `/cart/`,
        method: 'POST',
        body:data
      }),
      invalidatesTags:['cart'],
      providesTags: ['cart','delete','update']
    }),
    addToCart: builder.mutation({
      query: ({user_cart_id, body}) => ({
        url: `/cart/${user_cart_id}/items/`,
        method: 'POST',
        body:body
      }),
      invalidatesTags:['cart'],
      providesTags: ['cart','delete','update']
    }),

    updateCartQuantity: builder.mutation({
      query: ({user_cart_id, body}) => ({
        url: `/cart/${user_cart_id}/items/`,
        method: 'PATCH',
       
        body:body
      }),
      invalidatesTags:['update','price'],
      providesTags: ['cart','delete','update']
    }),

    deleteCartItem: builder.mutation({
      query: ({data,user_cart_id,item_id}) => ({
        url: `/cart/${user_cart_id}/items/${item_id}/`,
        method: 'DELETE',
       
        body:data
      }),
      invalidatesTags:['delete'],
      providesTags: ['cart','delete','update']
      

      

    }),
  }),
});

export const { useCartQuery,useAddToCartMutation,useUpdateCartQuantityMutation,useDeleteCartItemMutation, useAddEmptyCartMutation } = cartApi;
