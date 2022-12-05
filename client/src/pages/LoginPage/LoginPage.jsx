import React from "react";
import FormContainer from "../../components/forms/FormContainer/FormContainer";
import Input from "../../components/forms/Input/Input";
import Heading from '../../components/forms/Heading/Heading'
import Button from '../../components/forms/Button/Button';
import GoogleLogin from "../../components/forms/GoogleLogin/GoogleLogin";

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
      </div>
   );
};

export default LoginPage;
