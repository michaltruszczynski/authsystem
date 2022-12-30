import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: { user: null, token: null },
   reducers: {
      setCredentils: (state, action) => {
         const { user, accessToken } = action.payload;
         state.user = user;
         state.token = accessToken;
      },
      logOut: (state, action) => {
         state.user = null;
         state.token = null;
      },
   },
});

export const {setCredentils, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
