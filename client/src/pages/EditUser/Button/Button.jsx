import React, { useContext } from "react";
import styles from "./Button.module.scss";

const Button = ({ text, onClick, disabled = false }) => {


   const clickHandler = (e) => {
      e.preventDefault();
      onClick()
   }

   return (
      <button className={styles.button}  type="submit" onClick={clickHandler} disabled={disabled}>
         {text}
      </button>
   );
};

export default Button;
