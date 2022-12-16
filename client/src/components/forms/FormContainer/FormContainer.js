import React, { useState, createContext, useEffect } from "react";

import styles from "./FormContainer.module.scss";

const initialState = {
   data: {},
   validators: {},
   errors: {},
   isFormValid: false,
};

export const FormContext = createContext();

const FormContainer = ({ children }) => {
   const [formState, setFormState] = useState(initialState);
   console.log(formState);

   useEffect(() => {
      setFormState((state) => {
         const errors = validateStateInputData(state.data, state.validators);
         return {
            ...state,
            errors: {
               ...state.errors,
               ...errors,
            },
         };
      });
   }, []);

   const validateInput = (validators = [], value, formInputValues) => {
      if (!validators.length) return [];
      const errorMessages = [];
      let isValid = true;
      validators.forEach((validator) => {
         const validatorStatus = validator.check(value, formInputValues);
         isValid = isValid && validatorStatus;
         errorMessages.push({ validatorStatus, message: validator.message });
      });

      return { isValid, errorMessages };
   };

   const validateStateInputData = (inputData = {}, validators) => {
      const inputNames = Object.keys(inputData);
      const newErrorsObj = {};
      inputNames.forEach((nameKey) => {
         const validatorsArr = validators[nameKey];
         console.log(validateInput(validatorsArr, inputData[nameKey], inputData));
         newErrorsObj[nameKey] = validateInput(validatorsArr, inputData[nameKey], inputData);
      });
      return newErrorsObj;
   };

   const setInputValue = (name, value) => {
      setFormState((state) => {
         const updatedStateInputsData = {
            ...state,
            data: {
               ...state.data,
               [name]: value,
            },
         };

         const newErrorsObj = validateStateInputData(updatedStateInputsData.data,state.validators);

         const updatedStateInputs = {
            ...updatedStateInputsData,
            errors: {
               ...updatedStateInputsData.errors,
               ...newErrorsObj,
            },
         };

         const isFormValid = Object.entries(updatedStateInputs.errors).reduce((isFormValid, [name, input]) => {
            return isFormValid && input.isValid;
         }, true);

         return { ...updatedStateInputs, isFormValid: isFormValid };
      });
   };

   const registerInput = (name, validators) => {
      setFormState((state) => {
         return {
            ...state,
            data: {
               ...state.data,
               [name]: state.data[name] || "",
            },
            validators: {
               ...state.validators,
               [name]: validators || [],
            },
            errors: {
               ...state.errors,
               [name]: {
                  isValid: false,
                  errorMessages: [],
               },
            },
         };
      });
   };

   const formSubmitHandler = (e) => {
      e.preventDefault();
      console.log("submited");
   };

   const providerValue = {
      data: formState.data,
      isFormValid: formState.isFormValid,
      errors: formState.errors,
      setInputValue,
      registerInput,
   };

   return (
      <FormContext.Provider value={providerValue}>
         <div className={styles["form-container"]}>
            <form className={styles.form} onSubmit={formSubmitHandler}>
               {children}
            </form>
         </div>
      </FormContext.Provider>
   );
};

export default FormContainer;
