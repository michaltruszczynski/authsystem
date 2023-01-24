import React from "react";

import styles from "./Admin.module.scss";

const Admin = () => {
   return (
      <section className={styles["container"]}>
         <div className={styles["content"]}>
            <h1 className={styles["page-heading"]}>Administrator</h1>
         </div>
      </section>
   );
};

export default Admin;
