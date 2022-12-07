import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
   return (
      <div className={styles['footer']}>
         <div className={styles["container"]}>
            <div className={styles['logo']}>
               <h1 className={styles['logo__heading']}>AuthSystem</h1>
               <i className={`fa-solid fa-user-shield ${styles['logo__icon']}`}></i>
            </div>

            <div>
               <h1 className={styles['content__heading']}>About Us</h1>
               <p className={styles['content__text']}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            </div>
            <div>
               <h1 className={styles['content__heading']}>Contact</h1>
               <p className={styles['content__text']}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            </div>
         </div>
      </div>
   );
};

export default Footer;
