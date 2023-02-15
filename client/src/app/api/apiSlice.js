import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const API_URL = process.env.REACT_APP_API || "http://localhost:3500";

const baseQuery = fetchBaseQuery({
        baseUrl: API_URL,
        credentials: "include", // sending http only cookie
        prepareHeaders: (headers, { getState }) => {
                const token = getState().auth.accessToken;
                if (token) {
                   headers.set("authorization", `Bearer ${token}`);
                }
                return headers;
             },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
   
        if (result?.error?.originalStatus === 403) {
           //send refresh token to get new access token
           const refreshResult = await baseQuery("/refresh", api, extraOptions);
           if (refreshResult?.data) {
              const user = api.getState().auth.user;
              // store the new token
              api.dispatch(setCredentials({ ...refreshResult.data, user }));
              // retry the original query with new access token
              result = await baseQuery(args, api, extraOptions);
           } else {
              api.dispatch(logOut());
           }
        }
        return result;
     };

export const apiSlice = createApi({
        baseQuery: baseQueryWithReAuth,
        endpoints: builder => ({})
})
