import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: { email: null, accessToken: null, roles: [] },
   reducers: {
      setCredentials: (state, action) => {
         const { email, accessToken, roles } = action.payload;
         state.email = email;
         state.accessToken = accessToken;
         state.roles = roles;
      },
      logOut: (state, action) => {
         state.email = null;
         state.accessToken = null;
         state.roles = [];
      },
   },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectAccessToken = state => state.auth.accessToken;
export const selectUserRoles = state => state.auth.roles;
