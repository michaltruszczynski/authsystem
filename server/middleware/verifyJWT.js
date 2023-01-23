const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
   // console.log(req.headers)
   const authHeader = req.headers["authorization"] || req.headers["Authorization"];
   if (!authHeader?.startsWith("Bearer ")) {
      console.log("dupa");
      return res.sendStatus(401);
   }
   // console.log(authHeader);
   const token = authHeader.split(" ")[1];
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      console.log('decoded: ', decoded);
      req.name = decoded.UserInfo.name;
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
      next();
   });
};

module.exports = verifyJWT;
