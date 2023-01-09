import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "../../features/auth/authApiSlice";

import { selectAccessToken } from "../../features/auth/authSlice";

const PersistLogin = () => {
   const accessToken = useSelector(selectAccessToken);
   const effectRan = useRef(false);
   const [trueSuccess, setTrueSuccess] = useState(false);
   const persist = true;

   const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

console.log(isLoading)

   useEffect(() => {
      if (effectRan.current === true || process.env.NODE_ENV !== "development") {
         // React 18 Strict Mode

         const verifyRefreshToken = async () => {
            console.log("verifying refresh token");
            try {
               //const response =
               await refresh();
               //const { accessToken } = response.data
               setTrueSuccess(true);
            } catch (err) {
               console.error(err);
            }
         };

         if (!accessToken && persist) verifyRefreshToken();
      }

      return () => (effectRan.current = true);
   }, []);

   let content = null;
   if (!persist) {
      content = <Outlet />;
   } else if (isLoading) {
      content = <p>Loading!!</p>;
   } else if (isError) {
      content = <p>Please login again.</p>;
   } else if (isSuccess && trueSuccess) {
      content = <Outlet />;
   } else if (accessToken && isUninitialized) {
      content = <Outlet />;
   }

   console.log("content: ", content)

   return content;
};

export default PersistLogin;
