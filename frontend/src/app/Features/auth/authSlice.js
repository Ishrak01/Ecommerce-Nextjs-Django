import { createSlice } from "@reduxjs/toolkit";

const initialState={

}

const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{

    userLoggedIn: (state,action)=>{
      state.tokens=action.payload.tokens
      
    },

    userLoggedOut: (state,action)=>{
      state.tokens=undefined
     
    }

  }
})

export const {userLoggedIn,userLoggedOut}=authSlice.actions
export default authSlice.reducer