import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: { user: null, token: null, roles: [] },
   reducers: {
      setCredentials: (state, action) => {
         const { user, accessToken, roles } = action.payload;
         state.user = user;
         state.accessToken = accessToken;
         state.roles = roles;
      },
      logOut: (state, action) => {
         state.user = null;
         state.accessToken = null;
      },
   },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
export const selectUserRoles = state => state.auth.roles;
