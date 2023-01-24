import React from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../features/auth/authSlice";
import { getRoleString } from "../../utility/helpers";

import styles from "./Home.module.scss";

const Home = () => {
   const { email, roles } = useSelector(selectCurrentUser);
   
   return (
      <section className={styles["container"]}>
         <div className={styles["content"]}>
            <h1 className={styles["page-heading"]}>Home</h1>
            {email ? (
               <div>
                  <h2 className={styles["content-heading"]}>You are currently logged in as:</h2>
                  <div className={styles["form__data"]}>
                     <div className={styles["form__label"]}>Email</div>
                     <div className={styles["form__value"]}>{email}</div>
                     <div className={styles["form__label"]}>Roles</div>
                     <div className={styles["form__value"]}>{getRoleString(roles)}</div>
                  </div>
                  <p className={styles['information']}>Change your user role to see test pages accessible for other roles (editor, administrator).</p>
                  <p className={styles['information']}>Go to -> <i>User list</i> -> <i>User details</i> to change your user role.</p>
               </div>
            ) : <h2 className={styles["content-heading"]}>Login to get access.</h2>}
         </div>
      </section>
   );
};

export default Home;
