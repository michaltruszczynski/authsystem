import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { showSpinner, closeSpinner } from "../../../features/app/appSlice";

const Loading = () => {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(showSpinner());
      return () => dispatch(closeSpinner());
   });

   return <div>Loading..</div>;
};

export default Loading;
