import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (credentails) => ({
            url: "/auth",
            method: "POST",
            body: {
               ...credentails,
            },
         }),
      }),
      register: builder.mutation({
         query: (userData) => ({
            url: "/register",
            method: "POST",
            body: {
               ...userData,
            },
         }),
      }),
   }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
