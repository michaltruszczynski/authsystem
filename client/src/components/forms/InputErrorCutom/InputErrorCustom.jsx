import React, { useContext } from "react";
import ToggleContent from "../../ToggleContent/ToggleContent";

import { FormContext } from "../FormContainer/FormContainer";

import styles from "./InputErrorCustom.module.scss";

const InputErrorCustom = ({ name, touched, focus }) => {
   const { errors } = useContext(FormContext);

   if (!errors[name]) return;

   const { isValid, errorMessages } = errors[name];

   const validationRulesMsg = errorMessages.map((validationRule) => {
      let validationItemClass = [styles["validation__item"]];
      if (validationRule.validatorStatus) {
         validationItemClass.push(styles["validation__item--valid"]);
      }
      return (
         <li className={validationItemClass.join(" ")} key={validationRule.message}>
            {validationRule.validatorStatus ? (
               <i className={`fa-solid fa-circle-check ${styles["validation__icon"]}`}></i>
            ) : (
               <i className={`fa-solid fa-circle-exclamation ${styles["validation__icon"]}`}></i>
            )}
            <span className={styles["validation__message"]}>{validationRule.message}</span>
         </li>
      );
   });

   return (
      <div className={styles["container"]}>
         <ToggleContent show={touched && focus && !isValid}>
            <h3 className={styles["validation__heading"]}>Password rules</h3>
            <ul className={styles["validation__list"]}>{validationRulesMsg}</ul>
         </ToggleContent>
      </div>
   );
};

export default InputErrorCustom;
