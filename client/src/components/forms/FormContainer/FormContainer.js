import React from "react";

import styles from './FormContainer.module.scss';

const FormContainer = ({ children }) => {
   return (
      <div className={styles['form-container']}>
         <form  className={styles.form}>
            {children}
         </form>
      </div>
   );
};

export default FormContainer;
