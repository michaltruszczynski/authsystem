import { useLayoutEffect, useRef } from "react";

const useScrollLock = () => {
   const originalStyleRef = useRef("");
   const scrollOffsetRef = useRef("");

   useLayoutEffect(() => {
      const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
      originalStyleRef.current = window.getComputedStyle(document.body).overflow;
      document.body.style.setProperty("--scrollbar-compensation", `${scrollBarCompensation}px`);

      return () => {
         document.body.style.overflow = originalStyleRef.current;
         document.body.style.paddingRight = "";
         document.body.style.position = "";
         document.body.style.top = ``;
      }
   }, []);

   const lockScroll = () => {
      document.body.dataset.scrollLock = "true";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-compensation)";
      scrollOffsetRef.current = window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollOffsetRef.current}px`;
   };

   const unlockScroll = () => {
      document.body.dataset.scrollLock = "false";
      document.body.style.overflow = originalStyleRef.current;
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = ``;
      window.scrollTo(0, scrollOffsetRef.current);
   };

   return {
      lockScroll,
      unlockScroll,
   };
};

export default useScrollLock;
