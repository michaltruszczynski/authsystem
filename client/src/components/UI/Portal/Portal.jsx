import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, targetContainer }) => {
   const mount = document.getElementById(targetContainer);
   const element = document.createElement("div");

   useEffect(() => {
      mount.appendChild(element);
      return () => mount.removeChild(element);
   }, [element, mount]);

   return createPortal(children, element);
};

export default Portal;
