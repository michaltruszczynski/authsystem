import React, { useState, useEffect } from "react";

import styles from "./Select.module.scss";

const Select = ({ multiple, value, onChange, options }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(0);

   const openSelectHandler = () => {
      setIsOpen((prev) => !prev);
   };

   const closeSelectHandler = () => {
      setIsOpen(false);
   };

   const clearOptionsHandler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onChange(undefined);
   };

   const selectOption = (option) => {
      if (option !== value) onChange(option);
   };

   const selectOptionHandler = (option) => (e) => {
      e.stopPropagation();
      selectOption(option);
   };

   const isOptionSelected = (option) => {
      return option === value;
   };

   useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
   }, [isOpen]);

   return (
      <div onClick={openSelectHandler} onBlur={closeSelectHandler} tabIndex={0} className={styles["container"]}>
         <span className={styles["value"]}>{value?.label}</span>
         <button onClick={clearOptionsHandler} className={styles["clear-btn"]}>
            &times;
         </button>
         <div className={styles["divider"]}></div>
         <div className={styles["caret"]}></div>
         <ul className={`${styles["options"]} ${isOpen ? styles["show"] : ""} `}>
            {options.map((option, index) => (
               <li
                  onClick={selectOptionHandler(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  key={option.value}
                  className={`${styles["option"]} ${isOptionSelected(option) ? styles["selected"] : ""} ${index === highlightedIndex ? styles["highlighted"] : ""}`}
               >
                  {option.label}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Select;
