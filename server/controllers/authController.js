const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { getGoogleOauthToken, getGoogleUser } = require("../services/googleService");

const ORIGIN = "http://localhost:3000";

class AppError extends Error {
   status;
   isOperational;

   constructor(message, statusCode = 500) {
      super(message);
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}

const handleLogin = async (req, res) => {
   const cookies = req.cookies;
   console.log("cookies: ", cookies);

   const { email, password } = req.body;
   if (!email || !password) return res.status(400).json({ message: "Username and password are required." });

   const foundUser = await User.findOne({ email: email }).exec();

   if (!foundUser) return res.status(401).json({ message: "Not autorized" });

   // evaluate password
   const match = await bcrypt.compare(password, foundUser.password);

   if (match) {
      console.log(foundUser.roles);
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
         { expiresIn: "30s" }
      );
      const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

      const newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
         res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
         });
      }

      //Saing refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
      console.log(result);

      // creates secure cookie with refresh token
      //TODO secure: true
      res.cookie("jwt", newRefreshToken, {
         httpOnly: true,
         sameSite: "None",
         secure: "true",
         maxAge: 24 * 60 * 60 * 1000,
      }); // secure: "true",

      // send authorization roles and access token to user
      res.json({ message: `User ${foundUser.email} is logged in.`, accessToken, roles, email: foundUser.email, id: foundUser._id });
   } else {
      res.status(401).json({ message: "Passord is incorrect" });
   }
};

const googleOauthHandler = async (req, res, next) => {
   try {
      // Get the code from the query
      const code = req.query.code;
      const pathUrl = req.query.state || "/";

      if (!code) {
         // next(new AppError('Authorization code not provided!', 401));
         // return res.status(401).json({ message: "Authorization failed. Google authcode not provided!"});
         return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
      }

      // Use the code to get the id and access tokens
      const { id_token, access_token } = await getGoogleOauthToken({ code });

      // Use the token to get the User
      const { name, verified_email, email } = await getGoogleUser({
         id_token,
         access_token,
      });

      console.log(name, verified_email, email);

      // Check if user is verified
      if (!verified_email) {
         // return next(new AppError("Google account not verified", 403));
         return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
      }

      // Update user if user already exist or create new user

      const foundUser = await User.findOne({ email });

      // Case user exists
      if (foundUser) {
         console.log(foundUser.roles);
         const roles = Object.values(foundUser.roles).filter(Boolean);
         //create refreshtoken

         const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

         // const newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

         // if (cookies?.jwt) {
         //    res.clearCookie("jwt", {
         //       httpOnly: true,
         //       sameSite: "None",
         //       secure: true,
         //    });
         // }

         //Saing refreshToken with current user
         foundUser.refreshToken = [...foundUser.refreshToken, newRefreshToken];
         const result = await foundUser.save();
         console.log(result);

         // creates secure cookie with refresh token
         //TODO secure: true
         res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: "true",
            maxAge: 24 * 60 * 60 * 1000,
         }); // secure: "true",

         // send authorization roles and access token to user

         return res.redirect(`${process.env.CLIENT_ORIGIN}`);
      }

      //case no use in db new user must be created
      if (!foundUser) {
         const hashedPwd = await bcrypt.hash('1234567890', 10);
         //create and store the new user

         const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPwd,
            roles: {'User': 2001}
         });

         //create refreshtoken

         const newRefreshToken = jwt.sign({ email: newUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

         // const newRefreshTokenArray = !cookies?.jwt ? newUser.refreshToken : newUser.refreshToken.filter((rt) => rt !== cookies.jwt);

         // if (cookies?.jwt) {
         //    res.clearCookie("jwt", {
         //       httpOnly: true,
         //       sameSite: "None",
         //       secure: true,
         //    });
         // }

         //Saing refreshToken with current user
         newUser.refreshToken = [...newUser.refreshToken, newRefreshToken];
         const result = await newUser.save();
         console.log(result);

         // creates secure cookie with refresh token
         //TODO secure: true
         res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: "true",
            maxAge: 24 * 60 * 60 * 1000,
         }); // secure: "true",

         // send authorization roles and access token to user

         return res.redirect(`${process.env.CLIENT_ORIGIN}`);
      }

      // const user = await findAndUpdateUser(
      //    { email },
      //    {
      //       name,
      //       photo: picture,
      //       email,
      //       provider: "Google",
      //       verified: true,
      //    },
      //    { upsert: true, runValidators: false, new: true, lean: true }
      // );

      // if (!user) return res.redirect(`${config.get("origin")}/oauth/error`);

      // Create access and refresh token
      // const { access_token: accessToken, refresh_token } = await signToken(user);
      
     
      // Send cookie
      // res.cookie("refresh-token", refresh_token, refreshTokenCookieOptions);
      // res.cookie("access-token", accessToken, accessTokenCookieOptions);
      // res.cookie("logged_in", true, {
      // expires: new Date(Date.now() + config.get("accessTokenExpiresIn") * 60 * 1000),
      // });

      // res.redirect(`${config.get < string > "origin"}${pathUrl}`);
   } catch (err) {
      console.log("Failed to authorize Google User", err);
      // return res.redirect(`${config.get < string > "origin"}/oauth/error`);
      res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`);
   }
};

module.exports = {
   handleLogin,
   googleOauthHandler,
};
