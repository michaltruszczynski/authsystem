import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
        baseUrl: "htp://localHost:3500"
});

export const apiSlice = createApi({
        baseQuery: baseQuery,
        endpoints: builder => ({})
})
