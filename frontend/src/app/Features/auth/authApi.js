

import { apiSlice } from "../../Redux/baseApi/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register/",
        method: 'POST',
       
        body:data
      }),
    }),


    login: builder.mutation({
      query: (data) => ({
        url: "/login/",
        method: 'POST',
       
        body:data
      }),
      
     
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        
          // Check if the result contains valid tokens
          if (result.data && result.data.tokens && result.data.full_name && result.data.email && result.data.user_id) { 

            const { access_token, refresh_token } = result.data.tokens;
            const {full_name}=result.data
            const {email}=result.data
            const {user_id}=result.data
            
            // Store tokens in localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("full_name", full_name);
            localStorage.setItem("email", email);
            localStorage.setItem("user_id", user_id);


            // Dispatch userLoggedIn action with token and user data
            dispatch(userLoggedIn({
              token: { access_token, refresh_token },
              user: {
                email: result.data.email,
                full_name: result.data.full_name,
                user_id:result.data.user_id
              }
            }));
          } else {
            console.error("Login failed. Invalid token received.");
          
          }
        } catch (error) {
          console.error("Login failed:", error);
        
        }
      }
    }),
  }),
});

export const { useRegisterMutation,useLoginMutation } = authApi;
