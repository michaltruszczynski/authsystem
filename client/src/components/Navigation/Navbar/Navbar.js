import React, { useState } from "react";
import { menuData } from "./MenuData";
import styles from "./Navbar.module.scss";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const closeMenuHandler = () => {
      setIsOpen((prevState) => !prevState);
   };

   return (
      <nav className={styles["NavbarItems"]}>
         <div className={styles["logo"]}>Logo</div>
         <div  onClick={closeMenuHandler} className={styles['menu-icons']}>
            <i className={isOpen ? `fas fa-bars ${styles['icon']}` : `fa-solid fa-xmark ${styles['icon']}`}></i>
         </div>
         <ul className={isOpen ? `${styles["navmenu"]}` : `${styles["navmenu"]} ${styles["navmenu--active"]}`}>
            {menuData.map((item) => {
               return (
                  <li key={item.title}>
                     <a className={styles[`${item.cName}`]} href={item.url}>
                        {item.title}
                     </a>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

export default Navbar;
