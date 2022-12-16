import React, { useContext } from "react";
import { FormContext } from "../FormContainer/FormContainer";

import styles from "./InputError.module.scss";

const InputError = ({ name, touched, focus }) => {
   const { errors } = useContext(FormContext);

   if (!errors[name]) return;

   const { isValid, errorMessages } = errors[name];

   let errorClasses = [styles["error__message"]];

   let errorMessage = <li className={errorClasses.join(" ")}></li>;

   //    if (touched) {
   if (!isValid && touched && focus) {
      errorClasses.push(styles["error__message--red"]);
      errorClasses.push(styles["error__message--visible"]);
   }
   errorMessages.length > 0 &&
      (errorMessage = errorMessages.map((error, index) => (
         <li key={`error${index}`} className={errorClasses.join(" ")}>
            {error.message}
         </li>
      )));
   //    }

   return <ul className={styles["error__list"]}>{errorMessage}</ul>;
};

export default InputError;
