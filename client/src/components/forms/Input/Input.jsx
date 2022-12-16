import React, { useContext, useEffect, useState } from "react";
import InputError from "../InputError/InputError";
import InputErrorCustom from "../InputErrorCutom/InputErrorCustom";
import styles from "./Input.module.scss";

import { FormContext } from "../FormContainer/FormContainer";

const inputTypes = {
   PASSWORD: "PASSWORD",
   EMAIL: "EMAIL",
   NAME: "NAME",
};

const inputErrorTypes = {
   BASIC: "BASIC",
   CUSTOM: "CUSTOM",
};

const Input = ({ inputType, placeholder, name, validators, showError }) => {
   const [touched, setTouched] = useState(false);
   const [focus, setFocus] = useState(false);
   const { data, errors, setInputValue, registerInput } = useContext(FormContext);

   useEffect(() => {
      registerInput(name, validators);
   }, []);

   let icon = null;
   switch (inputType) {
      case inputTypes.NAME:
         icon = <i className={`fas fa-user ${styles["input__icon"]}`}></i>;
         break;
      case inputTypes.PASSWORD:
         icon = <i className={`fas fa-lock ${styles["input__icon"]}`}></i>;
         break;
      case inputTypes.EMAIL:
         icon = <i className={`fas fa-envelope ${styles["input__icon"]}`}></i>;
         break;
      default:
         icon = null;
   }

   const inputChangeHandler = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setInputValue(name, value);

      if (touched) return;
      setTouched(true);
   };

   const inputOnFocusHandler = () => {
      setFocus(true);
   };

   const inputOnBlurHanlder = () => {
      setFocus(false);
   };

   const getInputClasses = (errors, name, touched) => {
      const isValid = errors?.[name]?.isValid;
      let inputClassArr = [styles["input"]];
      if (!isValid && touched) {
         inputClassArr.push(styles["input--error"])
      }
      return inputClassArr.join(' ')
   }

   const inputClasses = getInputClasses(errors, name, touched)

   return (
      <>
         <div className={inputClasses}>
            {icon}
            <input
               value={data[name] || ""}
               onChange={inputChangeHandler}
               onFocus={inputOnFocusHandler}
               onBlur={inputOnBlurHanlder}
               className={styles["input__field"]}
               type="text"
               placeholder={placeholder}
               name={name}
            />
         </div>
         {showError === inputErrorTypes.BASIC ? (
            <div className={styles["error"]}>
               <div className={styles["error__list"]}>
                  <InputError name={name} touched={touched} focus={focus} />
               </div>
            </div>
         ) : null}
         {showError === inputErrorTypes.CUSTOM ? (
            <div className={styles["error"]}>
               <div className={styles["error__list"]}>
                  <InputErrorCustom name={name} touched={touched} focus={focus} />
               </div>
            </div>
         ) : null}
      </>
   );
};

export default Input;
