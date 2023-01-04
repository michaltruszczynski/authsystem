import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar/Navbar";
import Footer from "./Footer/Footer";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner"

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
   return (
      <>
         <Modal />
         <Spinner />
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
