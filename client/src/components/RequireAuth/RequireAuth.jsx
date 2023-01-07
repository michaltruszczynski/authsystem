import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { selectCurrentToken, selectUserRoles } from "../../features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
   const location = useLocation();
   const accessToken = useSelector(selectCurrentToken);
   const userRoles = useSelector(selectUserRoles);

   const isUserAllowed = Boolean(userRoles.filter((userRole) => allowedRoles.include(userRole)).length);

   return isUserAllowed ? (
      <Outlet />
   ) : accessToken ? (
      <Navigate to={"/umauthorized"} state={{ from: location }} replace />
   ) : (
      <Navigate to={"/login"} state={{ from: location }} replace />
   );
};

export default RequireAuth;
