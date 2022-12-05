import React from "react";

import styles from "./GoogleLogin.module.scss";

const GoogleLogin = () => {
   return (
      <>
         <p className={styles['social-text']}>Or sign in with social platform</p>
         <div className={styles['social-media']}>
            <a href="/" className={styles['social-icon']}>
               <i class="fab fa-facebook-f"></i>
            </a>
            <a href="/" className={styles['social-icon']}>
               <i class="fab fa-twitter"></i>
            </a>
            <a href="/" className={styles['social-icon']}>
               <i class="fab fa-google"></i>
            </a>
            <a href="/" className={styles['social-icon']}>
               <i class="fab fa-linkedin-in"></i>
            </a>
         </div>
      </>
   );
};

export default GoogleLogin;
