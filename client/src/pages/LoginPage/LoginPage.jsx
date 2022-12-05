import React from "react";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import Input from "../../components/forms/Input/Input";
import Heading from '../../components/forms/Heading/Heading'
import Button from '../../components/forms/Button/Button';
import GoogleLogin from "../../components/forms/GoogleLogin/GoogleLogin";
import image from '../../images/log.svg'

import styles from "./LoginPage.module.scss";

const LoginPage = () => {

   //test
   return (
      <div className={styles.container}>
         <FormContainer>
            <Heading heading={'Sign in'}/>
            <Input inputType={"EMAIL"} placeholder="Email"/>
            <Input inputType={"PASSWORD"} placeholder="Password"/>
            <Button text="LOGIN"/>
            <GoogleLogin/>
         </FormContainer>
         <div className={styles['panel']}>
            <div className={styles['content']} >
               <h1 className={styles['content__heading']}>New here?</h1>
               <p className={styles['content__text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
               <button className={styles['btn']} >Sign up</button>
            </div>
            <img src={image} alt="" className={styles['image']} />
         </div>
      </div>
   );
};

export default LoginPage;
