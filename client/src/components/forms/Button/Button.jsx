import React, { useContext } from "react";
import styles from "./Button.module.scss";

import { FormContext } from "../FormContainer/FormContainer";

const Button = ({ text, onClick }) => {
   const { data, isFormValid } = useContext(FormContext);

   const clickHandler = (e) => {
      e.preventDefault();
      onClick(data)
   }

   return (
      <button className={styles.button} disabled={!isFormValid} type="submit" onClick={clickHandler}>
         {text}
      </button>
   );
};

export default Button;
