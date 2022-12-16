const useLockElementHeight = (elementRef) => {

   const lockElementHeight = () => {
      if (!elementRef.current) return;
      console.log(window.innerHeight)
      if (window.innerHeight > elementRef.current.clientHeight) return;
      elementRef.current.style.height = `${window.innerHeight}px`;
   };

   const unlockElementHeight = () => {
      if (!elementRef.current) return;
      elementRef.current.style.height = "auto";
   };

   return {
      lockElementHeight,
      unlockElementHeight,
   };
};

export default useLockElementHeight;
