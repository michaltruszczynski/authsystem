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
            console.log("verifying refresh token");
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
      console.log("[Persist login] useEffect");
      return () => (effectRan.current = true);
   }, []);

   let content = null;

   // if ((isUninitialized || isLoading) && !checkCompleted) {
   //    console.log('dupa', isUninitialized, isLoading)
   //    content =  <Loading />
   // }

   // console.log('dupa', isUninitialized, isLoading, checkCompleted)

   // if (isLoading) {
   //    console.log('[Persist login] 1')
   //    content =  <Loading />
   // }

   //  if (isUninitialized && !checkCompleted) {
   //    console.log('[Persist login] 2')
   //    content =  <Loading />
   // }

   // if (checkCompleted) {
   //    console.log('[Persist login] 3')
   //    content = <Outlet />
   // }
   // console.log('dupa', isUninitialized, isLoading, checkCompleted, effectRan.current, accessToken)
   if (!persist) {
      // persist: no
      console.log("no persist");
      content = <Outlet />;
   } else if (isLoading) {
      //persist: yes, token: no
      console.log("loading");
      content = <Loading />;
   } else if (isError) {
      //persist: yes, token: no
      console.log("error");
      content = <Outlet />;
      // content = (
      //     <p className='errmsg'>
      //         {`${error?.data?.message} - `}
      //         <Link to="/login">Please login again</Link>.
      //     </p>
      // )
   } else if (isSuccess && checkCompleted) {
      //persist: yes, token: yes
      console.log("success");
      content = <Outlet />;
   } else if (accessToken && isUninitialized) {
      //persist: yes, token: yes
      console.log("token and uninit");
      console.log(isUninitialized);
      content = <Outlet />;
   }

   return content;
};

export default PersistLogin;
