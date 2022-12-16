import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuData } from "./MenuData";
import useScrollLock from "../../../hooks/useScrollLock";

import styles from "./Navbar.module.scss";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { lockScroll, unlockScroll } = useScrollLock();

   const closeMenuHandler = () => {
      if (!isOpen) {
         lockScroll();
      } else {
         unlockScroll();
      }

      setIsOpen((prevState) => !prevState);
   };

   return (
      <nav className={styles["NavbarItems"]}>
         <div className={styles["logo"]}>
            <h1 className={styles["logo__heading"]}>AuthSystem</h1>
            <i className={`fa-solid fa-user-shield ${styles["logo__icon"]}`}></i>
         </div>
         <div onClick={closeMenuHandler} className={styles["menu-icons"]}>
            <i className={isOpen ? `fa-solid fa-xmark ${styles["icon"]}` : `fas fa-bars ${styles["icon"]}`}></i>
         </div>
         <ul className={isOpen ? `${styles["navmenu"]} ${styles["navmenu--active"]}` : `${styles["navmenu"]}`}>
            {menuData.map((item) => {
               return (
                  <li key={item.title}>
                     <NavLink className={styles[`${item.cName}`]} to={item.url}>
                        {item.title}
                     </NavLink>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

export default Navbar;
