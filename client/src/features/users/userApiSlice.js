import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => "/users",
         keepUnusedDataFor: 5,
      }),
      getUser: builder.query({
         query: (userId) => ({
            url: `/users/${userId}`,
         }),
      }),
      putUser: builder.mutation({
         query: (userData) => ({
            url: "/users",
            method: "PUT",
            body: {
               ...userData,
            },
         }),
      }),
   }),
});

export const { useGetUsersQuery, useGetUserQuery, usePutUserMutation } = usersApiSlice;
