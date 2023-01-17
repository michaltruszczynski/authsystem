import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => "/users",
         keepUnusedDataFor: 5,
      }),
      getUser: builder.query({
         query: (userId) => ({
            url: `/users/${userId}`}),
      }),
   }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApiSlice;
