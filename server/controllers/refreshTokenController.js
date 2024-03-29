const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res, next) => {
   try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401);

      const refreshToken = cookies.jwt;
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // we send new refreshToken cookie with every request for new token, "old" refresh token is removed from coookie
      const foundUser = await User.findOne({ refreshToken }).exec();
      // Detected refresh token reuse! Refresh tokens can only be used once. When refresh token is used it is deleted.
      // Code below deals with situations when refreshtoken is used but it has already been deleted.
      // not included but you can also store tokens send to client and delete them as well when refresh token is compromized.
      if (!foundUser) {
         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
               return res.sendStatus(403); // Forbiden
            }
            // find user which refresh token was compromized and delete all refresh tokens just in case
            const hackedUser = await User.findOne({
               email: decoded.email,
            }).exec();

            if (hackedUser) {
               hackedUser.refreshToken = [];
               const result = await hackedUser.save();
            }
         });
         return res.sendStatus(403); // Forbidden
      }

      const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

      // ewaluate JWT
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
         // case for expired refresh token
         if (err) {
            foundUser.refreshToken = [...newRefreshTokenArray];
            const result = await foundUser.save();
         }
         if (err || foundUser.username !== decoded.username) {
            return res.sendStatus(403); //Forbiden
         }

         // refresh token was still valid
         const roles = Object.values(foundUser.roles).filter(Boolean);
         const accessToken = jwt.sign(
            {
               UserInfo: {
                  id: foundUser._id,
                  name: foundUser.name,
                  email: foundUser.email,
                  roles: roles,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
         );

         const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

         // Saving refreshToken with current user
         foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
         const result = await foundUser.save();
         // secure: true
         res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: 'true',
            maxAge: 24 * 60 * 60 * 1000,
         }); // secure: "true",
         res.json({ accessToken, roles, email: foundUser.email, id: foundUser._id, registeredFrom: foundUser.registeredFrom, isPasswordSet: foundUser.isPasswordSet });
      });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

module.exports = {
   handleRefreshToken,
};
