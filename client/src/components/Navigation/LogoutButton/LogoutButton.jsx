import React from "react";
import { useDispatch } from "react-redux";

import styles from "./LogoutButton.module.scss";

import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { showSpinner, closeSpinner, setMessage } from "../../../features/app/appSlice";
import { getErrorMessage } from "../../../utility/messages";


const LogoutButton = ({onClick}) => {
   const dispatch = useDispatch();
   const [sendLogout] = useSendLogoutMutation();

   const logoutHandler = async (e) => {
      e.preventDefault();
      try {
         dispatch(showSpinner())
         const response = await sendLogout().unwrap();
         dispatch(closeSpinner())
      } catch (err) {
         dispatch(closeSpinner())
         const { errorMessage, errorDetails } = getErrorMessage(err);
         dispatch(setMessage({ message: errorMessage, messageDetails: errorDetails }));
      } finally {
         onClick()
      }
   };

   return (
      <div>
         <button className={styles["button"]} onClick={logoutHandler}>
            Logout
         </button>
      </div>
   );
};

export default LogoutButton;
