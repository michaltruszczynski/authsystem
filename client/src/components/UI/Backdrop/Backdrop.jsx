import React from "react";

import styles from "./Backdrop.module.scss";

const Backdrop = ({ show, children, onClick = () => {} }) => {
   let backdropClasses = [styles["backdrop"]];

   if (show) {
      backdropClasses.push(styles["backdrop--visible"]);
   }

   const clickHandler = () => {
      onClick();
   };
   return (
      <div className={backdropClasses.join(" ")} onClick={clickHandler}>
         {children}
      </div>
   );
};

export default Backdrop;
