import { apiSlice } from '../../app/api/apiSlice';
import { setCredentials, logOut } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (credentails) => ({
            url: '/auth',
            method: 'POST',
            body: {
               ...credentails,
            },
         }),
      }),
      register: builder.mutation({
         query: (userData) => ({
            url: '/register',
            method: 'POST',
            body: {
               ...userData,
            },
         }),
      }),
      resetpwd: builder.mutation({
         query: (userData) => ({
            url: '/auth/resetpassword',
            method: 'POST',
            body: {
               ...userData,
            },
         }),
      }),
      changePwd: builder.mutation({
         query: (userData) => ({
            url: '/auth/changepassword',
            method: 'POST',
            body: {
               ...userData,
            },
         }),
      }),
      refresh: builder.mutation({
         query: () => ({
            url: '/refresh',
            method: 'GET',
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               const { accessToken, email, roles, id, registeredFrom, isPasswordSet } = data;
               dispatch(setCredentials({ accessToken, email, roles, id, registeredFrom, isPasswordSet }));
            } catch (err) {
               console.log(err);
            }
         },
      }),
      sendLogout: builder.mutation({
         query: () => ({
            url: '/logout',
            method: 'GET',
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(logOut());
               setTimeout(() => {
                  dispatch(apiSlice.util.resetApiState());
               }, 1000);
            } catch (err) {
               console.log(err);
            }
         },
      }),
   }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useSendLogoutMutation, useResetpwdMutation, useChangePwdMutation } = authApiSlice;
