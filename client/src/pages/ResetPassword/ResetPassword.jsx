import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormContainer from '../../components/forms/FormContainer/FormContainer';
import Input from '../../components/forms/Input/Input';
import Heading from '../../components/forms/Heading/Heading';
import Button from '../../components/forms/Button/Button';

import { setCredentials } from '../../features/auth/authSlice';
import { useResetpwdMutation } from '../../features/auth/authApiSlice';
import { setMessage, showSpinner, closeSpinner } from '../../features/app/appSlice';

import { getErrorMessage } from '../../utility/messages';

import image from '../../images/resetpwd.png';
import styles from './ResetPassword.module.scss';

import { email } from '../../utility/validators';

const ResetPassword = () => {
   const [resetpwd] = useResetpwdMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const loginHandler = async (data, setInputValue) => {
      const { email} = data;

      dispatch(showSpinner());
      try {
         const response = await resetpwd({ email: email}).unwrap();
         dispatch(setMessage({ message: 'Password reset request sent.', messageDetails: ['A password reset message was sent to your email address.', 'Mail was sent using SendGrid.', 'SendGrid emails may be consideres as spam.', 'Check your spam folder just in case!'] }));
         dispatch(closeSpinner());
         navigate('/');
      } catch (err) {
         dispatch(closeSpinner());
         const { errorMessage, errorDetails } = getErrorMessage(err);
         dispatch(setMessage({ message: errorMessage, messageDetails: errorDetails }));
      }
   };

   return (
      <div className={styles['container']}>
         <div className={styles['inner-container']}>
            <FormContainer>
               <Heading heading={'Reset password'} />
               <Input
                  inputType={'EMAIL'}
                  placeholder='Email'
                  name='email'
                  type='email'
                  validators={[
                     {
                        check: email,
                        message: 'Please enter a valid email.',
                     },
                  ]}
                  showError={'BASIC'}
               />
               <Button
                  text='Reset Password'
                  onClick={loginHandler}
               />
            </FormContainer>
            <div className={styles['panel']}>
               <div className={styles['content']}>
                  <h1 className={styles['content__heading']}>Forgot your password?</h1>
                  <p className={styles['content__text']}>Please enter the email address associated with your account and we will send you a link to reset your password.</p>
               </div>
               <img
                  src={image}
                  alt=''
                  className={styles['image']}
               />
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
