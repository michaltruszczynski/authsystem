import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar/Navbar";
import Footer from "./Footer/Footer";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
   return (
      <>
         <header>
            <Navbar />
         </header>
         <main className={styles["main"]}>
            <Outlet />
         </main>
         <footer className={styles["footer"]}>
            <Footer />
         </footer>
      </>
   );
};

export default Layout;
