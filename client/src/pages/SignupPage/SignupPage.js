import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import Input from "../../components/forms/Input/Input";
import Heading from "../../components/forms/Heading/Heading";
import Button from "../../components/forms/Button/Button";
import GoogleLogin from "../../components/forms/GoogleLogin/GoogleLogin";
import image from "../../images/signup.png";

import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { setMessage } from "../../features/message/messageSlice";

import styles from "./SignupPage.module.scss";

import { length, containNumber, containSpecialChar, containCapitalLetter, email, compareStrings } from "../../utility/validators";

const Signup = () => {
   const [register, { isLoading }] = useRegisterMutation();
   const dispatch = useDispatch();

   const signupHandler = async (data) => {
      console.log(data);
      const { email, password } = data;
      console.log(email, password);

      try {
         const response = await register({ user: email, pwd: password });
         console.log(response);
         dispatch(setMessage({message: "You have been successfully registered.", messageDetails: ['Please signin.']}))
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div className={styles["container"]}>
         <div className={styles["inner-container"]}>
            <FormContainer>
               <Heading heading={"Signup"} />
               <Input
                  inputType={"NAME"}
                  placeholder="Name"
                  name="name"
                  validators={[{ check: length({ min: 3, max: 10 }), message: "Name must be 3-10 characters long." }]}
                  showError={"BASIC"}
               />
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
                     { check: length({ min: 4 }), message: "4 characters minimum." },
                     { check: containCapitalLetter, message: "Contains at least 1 capital letter" },
                     { check: containNumber, message: "Contains at least 1 number" },
                     { check: containSpecialChar, message: "Contains !@#$%^&*" },
                  ]}
                  showError={"CUSTOM"}
               />
               <Input
                  inputType={"PASSWORD"}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  validators={[{ check: compareStrings("password"), message: "Passwords does not match." }]}
                  showError={"BASIC"}
               />
               <Button text="SIGNUP" onClick={signupHandler} />
               <GoogleLogin />
            </FormContainer>
            <div className={styles["panel"]}>
               <div className={styles["content"]}>
                  <h1 className={styles["content__heading"]}>Already have an account?</h1>
                  <p className={styles["content__text"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
                  <NavLink to={"/login"} className={styles["btn"]}>
                     Login
                  </NavLink>
               </div>
               <img src={image} alt="" className={styles["image"]} />
            </div>
         </div>
      </div>
   );
};

export default Signup;
