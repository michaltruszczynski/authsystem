import React from "react";
import Navbar from "../Navigation/Navbar/Navbar";
import Footer from "./Footer/Footer";

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
   return (
      <>
         <header>
            <Navbar />
         </header>
         <main className={styles['main']}>{children}</main>
         <footer className={styles['footer']}>
            <Footer />
         </footer>
      </>
   );
};

export default Layout;
