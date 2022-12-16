import React, { useRef, useLayoutEffect } from "react";

import styles from "./ToggleContent.module.scss";

const ToggleContent = ({ children, show = false }) => {
   const contentContainerRef = useRef();

   useLayoutEffect(() => {
      const setHeight = () => {
         let height = 0;
         if (show) {
            if (!contentContainerRef) return;
            height = contentContainerRef.current?.scrollHeight;
            contentContainerRef.current.style.height = height + "px";
         } else {
            contentContainerRef.current.style.height = height + "px";
         }
      };

      setHeight();
   }, [show]);

   return (
      <div className={styles["toggle-container"]}>
         <div ref={contentContainerRef} className={styles["toggle-content-container"]}>
            {children}
         </div>
      </div>
   );
};

export default ToggleContent;
