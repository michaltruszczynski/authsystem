import React, { useCallback } from "react";

const useScrollLock = () => {
   const lockScroll = useCallback(() => {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = '17px';
   }, []);

   const unlockScroll = useCallback(() => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = '';
   }, []);

   return {
      lockScroll,
      unlockScroll,
   };
};

export default useScrollLock;
