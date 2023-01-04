import React, { useContext } from "react";
import styles from "./Button.module.scss";

import { FormContext } from "../FormContainer/FormContainer";

const Button = ({ text, onClick }) => {
   const { data, isFormValid, setInputValue } = useContext(FormContext);

   const clickHandler = (e) => {
      e.preventDefault();
      onClick(data, setInputValue)
   }

   return (
      <button className={styles.button} disabled={!isFormValid} type="submit" onClick={clickHandler}>
         {text}
      </button>
   );
};

export default Button;
