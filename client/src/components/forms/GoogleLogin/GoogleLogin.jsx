import React from "react";
import { getGoogleUrl } from "../../../utility/getGoogleUrl";

import styles from "./GoogleLogin.module.scss";
import googleImg from "../../../images/google.svg";

const GoogleLogin = () => {
   return (
      <div className={styles["social"]}>
         <p className={styles["social__heading"]}>Or sign in with social platform</p>
         <a href={getGoogleUrl("/")} className={styles["social__link"]}>
            <img className={styles["google-img"]} src={googleImg} alt="googleImg" />
            <span className={styles["social__text"]}>Sign in with Google</span>
         </a>
      </div>
   );
};

export default GoogleLogin;
