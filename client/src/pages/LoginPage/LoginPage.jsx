import React from "react";
import { NavLink } from "react-router-dom";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import Input from "../../components/forms/Input/Input";
import Heading from "../../components/forms/Heading/Heading";
import Button from "../../components/forms/Button/Button";
import GoogleLogin from "../../components/forms/GoogleLogin/GoogleLogin";
import image from "../../images/login.svg";

import styles from "./LoginPage.module.scss";

import { email, required } from "../../utility/validators";

const LoginPage = () => {
   return (
      <div className={styles["container"]}>
         <div className={styles["inner-container"]}>
            <FormContainer>
               <Heading heading={"Login"} />
               <Input
                  inputType={"EMAIL"}
                  placeholder="Email"
                  name="email"
                  validators={[
                     {
                        check: email,
                        message: "Please enter a valid email.",
                     },
                  ]}
                  showError={"BASIC"}
               />
               <Input
                  inputType={"PASSWORD"}
                  placeholder="Password"
                  name="password"
                  validators={[
                     { check: required(), message: "Password is required." },
                  ]}
                  showError={"BASIC"}
               />
               <Button text="LOGIN" />
               <GoogleLogin />
            </FormContainer>
            <div className={styles["panel"]}>
               <div className={styles["content"]}>
                  <h1 className={styles["content__heading"]}>Do not have an account?</h1>
                  <p className={styles["content__text"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
                  <NavLink to={"/signup"} className={styles["btn"]}>
                     Signup
                  </NavLink>
               </div>
               <img src={image} alt="" className={styles["image"]} />
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
