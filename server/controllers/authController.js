const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendGridMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const User = require('../model/User');
const ResetPwdToken = require('../model/ResetPwdToken');
const { getGoogleOauthToken, getGoogleUser } = require('../services/googleService');

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const handleLogin = async (req, res) => {
   try {
      const cookies = req.cookies;
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Username and password are required.' });

      const foundUser = await User.findOne({ email: email }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Not autorized' });

      // evaluate password
      const match = await bcrypt.compare(password, foundUser.password);

      if (match) {
         const roles = Object.values(foundUser.roles).filter(Boolean);
         //create JWT
         const accessToken = jwt.sign(
            {
               UserInfo: {
                  id: foundUser._id,
                  email: foundUser.email,
                  name: foundUser.name,
                  roles: roles,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
         );
         const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

         const newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

         if (cookies?.jwt) {
            res.clearCookie('jwt', {
               httpOnly: true,
               sameSite: 'None',
               secure: true,
            });
         }

         //Saving refreshToken with current user
         foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
         const result = await foundUser.save();

         // creates secure cookie with refresh token
         res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: 'true',
            maxAge: 24 * 60 * 60 * 1000,
         }); // secure: "true",

         // send authorization roles and access token to user
         res.json({ message: `User ${foundUser.email} is logged in.`, accessToken, roles, email: foundUser.email, id: foundUser._id });
      } else {
         res.status(401).json({ message: 'Passord is incorrect' });
      }
   } catch (error) {
      res.status(500).json({ message: err.message });
   }
};

const googleOauthHandler = async (req, res, next) => {
   try {
      // Get the code from the query
      const code = req.query.code;
      const pathUrl = req.query.state || '/';

      if (!code) {
         return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
      }

      // Use the code to get the id and access tokens
      const { id_token, access_token } = await getGoogleOauthToken({ code });

      // Use the token to get the User
      const { name, verified_email, email } = await getGoogleUser({
         id_token,
         access_token,
      });

      // Check if user is verified
      if (!verified_email) {
         return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
      }

      // Update user if user already exist or create new user

      const foundUser = await User.findOne({ email });

      // Case user exists
      if (foundUser) {
         const roles = Object.values(foundUser.roles).filter(Boolean);
         //create refreshtoken

         const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

         //Saing refreshToken with current user
         foundUser.refreshToken = [...foundUser.refreshToken, newRefreshToken];
         const result = await foundUser.save();

         // creates secure cookie with refresh token
         res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: 'true',
            maxAge: 24 * 60 * 60 * 1000,
         }); // secure: "true",

         // send authorization roles and access token to user

         return res.redirect(`${process.env.CLIENT_ORIGIN}`);
      }

      //case no use in db new user must be created
      if (!foundUser) {
         const randomPwd = crypto.randomBytes(18).toString('hex');
         const hashedPwd = await bcrypt.hash(randomPwd, 10);
         //create and store the new user

         const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPwd,
            roles: { User: 2001 },
            registeredFrom: 'google',
         });

         //create refreshtoken

         const newRefreshToken = jwt.sign({ email: newUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

         //Saing refreshToken with current user
         newUser.refreshToken = [...newUser.refreshToken, newRefreshToken];
         const result = await newUser.save();

         // creates secure cookie with refresh token
         // secure: true
         res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: 'true',
            maxAge: 24 * 60 * 60 * 1000,
         });

         // send authorization roles and access token to user

         return res.redirect(`${process.env.CLIENT_ORIGIN}`);
      }
   } catch (err) {
      console.log('Failed to authorize Google User', err);
      res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
   }
};

const resetPasswordRequest = async (req, res, next) => {
   try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
         return res.status(404).send({ message: 'User does not exists' });
      }

      const token = await ResetPwdToken.findOne({ userId: user._id });

      if (token) {
         const response = await token.deleteOne();
         console.log('Delete reset token response: ', response);
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedResetToken = await bcrypt.hash(resetToken, 10);

      const newResetToken = new ResetPwdToken({
         userId: user._id,
         token: hashedResetToken,
         createdAt: Date.now(),
      });

      await newResetToken.save();
      const link = `${process.env.CLIENT_ORIGIN}/changepassword?token=${resetToken}&id=${user._id}`;

      const source = fs.readFileSync(path.join(__dirname, '../utility/email/resetPasswordRequest.hbs'), 'utf8');
      const compiledTemplate = handlebars.compile(source);

      function getMessage(user, link) {
         console.log(user.email);
         return {
            to: user.email,
            from: process.env.SENDGRID_SENDER,
            subject: 'AuthSystem Reset Password.',
            html: compiledTemplate({ link }),
         };
      }

      await sendGridMail.send(getMessage(user, link));

      res.json({ message: 'Reset email request processed successully.' });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const changePassword = async (req, res, next) => {
   try {
      const { password, token, id } = req.body;
      const passwordResetToken = await ResetPwdToken.findOne({ userId: id });
      console.log(token)
      console.log(passwordResetToken.token)
      if (!passwordResetToken) {
         console.log('dupa1')
         return res.status(401).send({ message: 'Invalid or expired password reset token' });
      }

      const isValid = await bcrypt.compare(token, passwordResetToken.token);
console.log(isValid)
      if (!isValid) {
         console.log('dupa2')
         return res.status(401).send({ message: 'Invalid or expired password reset token' });
      }

      const hash = await bcrypt.hash(password, 10);

      await User.updateOne({ _id: id }, { $set: { password: hash } }, { new: true });

      await passwordResetToken.deleteOne();

      console.log(password, token, id);
      res.json({ message: 'Password changed.' });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = {
   handleLogin,
   googleOauthHandler,
   resetPasswordRequest,
   changePassword,
};
