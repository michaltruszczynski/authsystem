const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { userSigninValidation, changePasswordValidation, resetPasswordValidation } = require('../middleware/validators/authValidators');
const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers');

router.post('/', userSigninValidation(), dataErrorHandler, throwError('Sign in validation failed.'), authController.handleLogin);
router.post('/resetpassword', resetPasswordValidation, dataErrorHandler, throwError('Reset password validation failed.'), authController.resetPasswordRequest);
router.post('/changepassword', changePasswordValidation(), dataErrorHandler, throwError('Change password validation failed.'), authController.changePassword);
router.get('/oauth/google', authController.googleOauthHandler);

module.exports = router;
