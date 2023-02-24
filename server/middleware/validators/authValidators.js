const { body } = require('express-validator');

const User = require('../../model/User');

const userSigninValidation = () => {
   return [
      body('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail({ gmail_remove_dots: false }),
      body('password').trim().not().isEmpty().withMessage('Please enter a valid password.'),
   ];
};

const resetPasswordValidation = () => {
   return [body('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail({ gmail_remove_dots: false })];
};

const changePasswordValidation = () => {
   return [
      body('password')
         .trim()
         .not()
         .isEmpty()
         .withMessage('Please enter a valid password.')
         .bail()
         .matches(/[!@#$%^&*]/)
         .withMessage('Password missing special character.')
         .matches(/[A-Z]/)
         .withMessage('Password missing at least one capital letter.')
         .matches(/\d/)
         .withMessage('Password missing at least one number.'),
   ];
};

module.exports = {
   userSigninValidation,
   resetPasswordValidation,
   changePasswordValidation
};
