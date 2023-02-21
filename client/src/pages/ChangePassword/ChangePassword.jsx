import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import FormContainer from '../../components/forms/FormContainer/FormContainer';
import Input from '../../components/forms/Input/Input';
import Heading from '../../components/forms/Heading/Heading';
import Button from '../../components/forms/Button/Button';
import image from '../../images/changepwd.png';

import { useChangePwdMutation } from '../../features/auth/authApiSlice';
import { setMessage, showSpinner, closeSpinner } from '../../features/app/appSlice';

import { getErrorMessage } from '../../utility/messages';

import styles from './ChangePassword.module.scss';

import { length, containNumber, containSpecialChar, containCapitalLetter, compareStrings } from '../../utility/validators';

const ChangePassword = () => {
   const [changePwd] = useChangePwdMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { search } = useLocation();

   const queryParams = new URLSearchParams(search);
   const token = queryParams.get('token');
   const id = queryParams.get('id');

   const signupHandler = async (data, setInputValue) => {
      const { password } = data;

      dispatch(showSpinner());
      try {
         const response = await changePwd({ password, token, id }).unwrap();
         dispatch(closeSpinner());
         dispatch(setMessage({ message: 'Password changed.', messageDetails: ['Please signin.'] }));
         navigate('/login');
      } catch (err) {
         dispatch(closeSpinner());
         const { errorMessage, errorDetails } = getErrorMessage(err);
         dispatch(setMessage({ message: errorMessage, messageDetails: errorDetails }));
         navigate('/');
      }
   };

   if (!id || !token) {
      return <Navigate to="/" replace={true} />;
   }

   return (
      <div className={styles['container']}>
         <div className={styles['inner-container']}>
            <FormContainer>
               <Heading heading={'Change password'} />
               <Input
                  inputType={'PASSWORD'}
                  placeholder='Password'
                  name='password'
                  type='password'
                  validators={[
                     { check: length({ min: 4 }), message: '4 characters minimum.' },
                     { check: containCapitalLetter, message: 'Contains at least 1 capital letter' },
                     { check: containNumber, message: 'Contains at least 1 number' },
                     { check: containSpecialChar, message: 'Contains !@#$%^&*' },
                  ]}
                  showError={'CUSTOM'}
               />
               <Input
                  inputType={'PASSWORD'}
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  validators={[{ check: compareStrings('password'), message: 'Passwords does not match.' }]}
                  showError={'BASIC'}
               />
               <Button
                  text='Change password'
                  onClick={signupHandler}
               />
            </FormContainer>
            <div className={styles['panel']}>
               <div className={styles['content']}>
                  <h1 className={styles['content__heading']}>Change password</h1>
                  <p className={styles['content__text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
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

export default ChangePassword;
