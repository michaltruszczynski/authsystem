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

   const clearOptions = () => {
      multiple ? onChange([]) : onChange(undefined);
   };

   const clearOptionsHandler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      clearOptions();
   };

   const selectOption = (option) => {
      if (multiple) {
         if (value.includes(option)) {
            onChange(value.filter((o) => o !== option));
         } else {
            onChange([...value, option]);
         }
      } else {
         if (option !== value) onChange(option);
      }
   };

   const selectOptionHandler = (option) => (e) => {
      e.stopPropagation();
      selectOption(option);
   };

   const isOptionSelected = (option) => {
      return multiple ? value.includes(option) : option === value;
   };

   useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
   }, [isOpen]);

   const renderValueForMultiple = () => {
      return value.map((v) => (
         <button
            key={v.value}
            onClick={(e) => {
               e.stopPropagation();
               selectOption(v)
            }}
            className={styles['option-badge']}
         >
            {v.label}<span className={styles["remove-btn"]}>&times;</span>
         </button>
      ));
   };

   return (
      <div onClick={openSelectHandler} onBlur={closeSelectHandler} tabIndex={0} className={styles["container"]}>
         <span className={styles["value"]}>{multiple ? renderValueForMultiple() : value?.label}</span>
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
