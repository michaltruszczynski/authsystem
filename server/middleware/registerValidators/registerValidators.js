const { body } = require('express-validator');

const User = require('../../model/User');

const userRegisterValidation = () => {
    return [
        body('name')
            .trim()
            .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (value, { req }) => {
                const userDoc = await User.findOne({ email: value });
                    console.log(userDoc);
                    if (userDoc) {
                            return Promise.reject('Email already exists. Please enter different one.');
                    }
                    else {
                            return Promise.resolve(true);
                    }
                // .catch(err => {
                //     console.log(err)
                //     return Promise.reject(err)
                // })
            })
            .normalizeEmail({ "gmail_remove_dots": false }),
        body('password')
            .trim()
            .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long.')
            .bail()
            .matches(/[!@#$%^&*]/).withMessage('Password missing special character.')
            .matches(/[A-Z]/).withMessage('Password missing at least one capital letter.')
            .matches(/\d/).withMessage('Password missing at least one number.'),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                console.log('dupa')
                console.log(typeof (value), req.body.password)
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.')
                }
                return true;
            }),
    ]
}

const userSigninValidation = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail({ "gmail_remove_dots": false }),
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter a valid password.')
    ]
}

module.exports = {
    userRegisterValidation,
    userSigninValidation
}