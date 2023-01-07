import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Portal from "../Portal/Portal";
import Backdrop from "../Backdrop/Backdrop";

import { clearMessage } from "../../../features/app/appSlice";
import { selectMessage, selectMessageDetails } from "../../../features/app/appSlice";

import styles from "./Modal.module.scss";

const Modal = () => {
   const dispatch = useDispatch();
   const message = useSelector(selectMessage);
   const messageDetails = useSelector(selectMessageDetails);

   const closeModal = () => {
      dispatch(clearMessage());
   };
   const renderMessage = () => {
      if (!message) return null;
      return message;
   };

   const renderMessageDetails = () => {
      if (!messageDetails.length) return null;
      return messageDetails.map((messageDetail, index) => (
         <li key={`mesageDetail${index}`} className={styles["modal__text"]}>
            {messageDetail}
         </li>
      ));
   };

   return message || messageDetails.length ? (
      <Portal targetContainer={"modal"}>
         <Backdrop show={true} onClick={closeModal}>
            <div className={styles["container"]}>
               <div className={styles["modal"]}>
                  <div className={styles["modal__header"]}>
                     <i className={`fa-solid fa-xmark ${styles["modal__icon"]}`} onClick={closeModal}></i>
                  </div>
                  <div className={styles["modal__content"]}>
                     <h1 className={styles["modal__message"]}>{renderMessage()}</h1>
                     <ul className={styles["modal__details"]}>{renderMessageDetails()}</ul>
                  </div>
               </div>
            </div>
         </Backdrop>
      </Portal>
   ) : null;
};

export default Modal;
