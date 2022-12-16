import React, { useContext } from "react";
import styles from "./Button.module.scss";

import { FormContext } from "../FormContainer/FormContainer";

const Button = ({ text }) => {
   const { isFormValid } = useContext(FormContext);

   return (
      <button className={styles.button} disabled={!isFormValid} type="submit">
         {text}
      </button>
   );
};

export default Button;
