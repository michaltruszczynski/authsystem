import React from "react";
import { useSelector } from "react-redux";

import Portal from "../Portal/Portal";
import Backdrop from "../Backdrop/Backdrop";

import { selectShowSpinner } from "../../../features/app/appSlice";

import styles from "./Spinner.module.scss";

const Spinner = () => {
   const showSpinner = useSelector(selectShowSpinner);

   return showSpinner ? (
      <Portal targetContainer={"spinner"}>
         <Backdrop show={true} onClick={() => {}}>
            <div className={styles["container"]}>
               <div className={styles["lds-dual-ring"]}></div>
            </div>
         </Backdrop>
      </Portal>
   ) : null;
};

export default Spinner;
