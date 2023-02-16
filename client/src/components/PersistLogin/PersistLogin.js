import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "../../features/auth/authApiSlice";
import Loading from "../UI/Loading/Loading";

import { selectAccessToken } from "../../features/auth/authSlice";

const PersistLogin = () => {
   const accessToken = useSelector(selectAccessToken);
   const effectRan = useRef(false);
   const [checkCompleted, setCheckCompleted] = useState(false);
   const persist = true;

   const [refresh, { isUninitialized, isLoading, isSuccess, isError }] = useRefreshMutation();

   useEffect(() => {
      if (effectRan.current === true || process.env.NODE_ENV !== "development") {
         // React 18 Strict Mode

         const verifyRefreshToken = async () => {
            try {
               await refresh().unwrap();
            } catch (err) {
               console.error(err);
            } finally {
               setCheckCompleted(true);
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
      content = <Loading />;
   } else if (isError) {
      content = <Outlet />;
   } else if (isSuccess && checkCompleted) {
      content = <Outlet />;
   } else if (accessToken && isUninitialized) {
      content = <Outlet />;
   } else if(!accessToken && checkCompleted) {
      content = <Outlet />
   }

   return content;
};

export default PersistLogin;
