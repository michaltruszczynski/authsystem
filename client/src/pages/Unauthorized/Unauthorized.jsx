import React from "react";

import styles from './Unauthorized.module.scss';

const Home = () => {
   return (
      <section className={styles['container']}>
         <h1>You are unauthorized to enter this resources.</h1>
      </section>
   );
};

export default Home;