import React from "react";

import styles from "./Editor.module.scss";

const Editor = () => {
   return (
      <section className={styles["container"]}>
         <div className={styles["content"]}>
            <h1 className={styles["page-heading"]}>Editor</h1>
         </div>
      </section>
   );
};

export default Editor;
