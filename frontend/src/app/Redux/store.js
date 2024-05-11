import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./baseApi/apiSlice"


import cartSliceReducer from "../Features/Cart/cartSlice"
import productsSliceReducer from "../Features/Products/productsSlice"
import authSliceReducer from "../Features/auth/authSlice"

const store= configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

   

   
    products:productsSliceReducer,
    auth:authSliceReducer,
    cart:cartSliceReducer

   
   
  },

  devTools: !process.env.NODE_ENV ==="production",

  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
