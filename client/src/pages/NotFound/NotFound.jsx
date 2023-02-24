import React from "react";

import styles from './NotFound.module.scss';

const NotFound = () => {
   return (
      <section className={styles['container']}>
         <h1>Resources not found.</h1>
      </section>
   );
};

export default NotFound;