const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);
router.post('/resetpassword', authController.resetPasswordRequest);
router.post('/changepassword', authController.changePassword);
router.get('/oauth/google', authController.googleOauthHandler);

module.exports = router;