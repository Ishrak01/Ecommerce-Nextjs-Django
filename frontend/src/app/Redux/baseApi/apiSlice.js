"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice= createApi({
  reducerPath: 'api',
  
  baseQuery: fetchBaseQuery({
    
    baseUrl: "https://summerfield.store/",
    prepareHeaders: (headers) => {
       // Retrieve the token from local storage
       const token = localStorage.getItem('access_token');
       if (token) {
          headers.set('Authorization', `Bearer ${token}`);
       }
      
      return headers;
    }



}),

 
  endpoints:(builder)=> ({}),
})

