import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: { email: null, accessToken: null, roles: [], id: null },
   reducers: {
      setCredentials: (state, action) => {
         const {  email, accessToken, roles, id } = action.payload;
         state.id = id;
         state.email = email;
         state.accessToken = accessToken;
         state.roles = roles;
      },
      logOut: (state, action) => {
         state.id = null;
         state.email = null;
         state.accessToken = null;
         state.roles = [];
      },
   },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state =>state.auth;
export const selectCurrentUserId = state => state.auth.id;
export const selectAccessToken = state => state.auth.accessToken;
export const selectUserRoles = state => state.auth.roles;
