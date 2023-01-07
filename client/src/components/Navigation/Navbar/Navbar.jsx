import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { menuData } from "./MenuData";

import useScrollLock from "../../../hooks/useScrollLock";

import { selectCurrentToken, selectUserRoles } from "../../../features/auth/authSlice";

import styles from "./Navbar.module.scss";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { lockScroll, unlockScroll } = useScrollLock();
   const accessToken = useSelector(selectCurrentToken);
   const userRoles = useSelector(selectUserRoles);

   const closeMenuHandler = () => {
      if (!isOpen) {
         lockScroll();
      } else {
         unlockScroll();
      }

      setIsOpen((prevState) => !prevState);
   };

   const renderNavlinks = () => {
      const userNavLinks = menuData.filter((navLink) => {
         if (!navLink?.allowedRoles.length) return true;
         return navLink.allowedRoles.filter((allowedRole) => userRoles.includes(allowedRole)).length > 0;
      });
      return userNavLinks.map((item) => (
         <li key={item.title}>
            <NavLink className={styles[`${item.cName}`]} to={item.url}>
               {item.title}
            </NavLink>
         </li>
      ));
   };

   return (
      <>
         <div className={isOpen ? `${styles["backdrop"]} ${styles["backdrop--visible"]}` : `${styles["backdrop"]}`} onClick={closeMenuHandler}></div>
         <nav className={styles["navbar-items"]}>
            <div className={styles["logo"]}>
               <h1 className={styles["logo__heading"]}>AuthSystem</h1>
               <i className={`fa-solid fa-user-shield ${styles["logo__icon"]}`}></i>
            </div>
            <div onClick={closeMenuHandler} className={styles["menu-icons"]}>
               <i className={isOpen ? `fa-solid fa-xmark ${styles["icon"]}` : `fas fa-bars ${styles["icon"]}`}></i>
            </div>
            <ul className={isOpen ? `${styles["navmenu"]} ${styles["navmenu--active"]}` : `${styles["navmenu"]}`}>
               {renderNavlinks()}
               {accessToken ? (
                  <li key={"logout"}>
                     <NavLink className={styles["nav-link"]} to={"/logout"}>
                        Logout
                     </NavLink>
                  </li>
               ) : (
                  <li key={"login"}>
                     <NavLink className={styles["nav-link"]} to={"/login"}>
                        Login
                     </NavLink>
                  </li>
               )}
            </ul>
         </nav>
      </>
   );
};

export default Navbar;
