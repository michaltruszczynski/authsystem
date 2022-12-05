import React from "react";
import styles from "./Input.module.scss";

const inputTypes = {
   PASSWORD: "PASSWORD",
   EMAIL: "EMAIL",
   NAME: "NAME",
};

const Input = ({ inputType, placeholder }) => {
   let icon = null;
   switch (inputType) {
      case inputTypes.NAME:
         icon = <i class={`fas fa-user ${styles['input__icon']}`}></i>;
         break;
      case inputTypes.PASSWORD:
         icon = <i class={`fas fa-lock ${styles['input__icon']}`}></i>;
         break;
         case inputTypes.EMAIL:
         icon = <i class={`fas fa-envelope ${styles['input__icon']}`}></i>;
         break;
      default:
         icon = null;
   }

   return (
      <div className={styles.input}>
         {icon}
         <input className={styles.input__field} type="text" placeholder={placeholder}/>
      </div>
   );
};

export default Input;
