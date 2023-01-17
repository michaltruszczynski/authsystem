// const usersDB = {
//    users: require("../model/users.json"),
//    setUser: function (data) {
//       this.users = data;
//    },
// };

const User = require("../model/User");
// const fsPromises = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
   const { name, email, password } = req.body;
   console.log(req.body.user);
   if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });

   //check for duplicate usernames in the db
   // const duplicate = await User.findOne({ username: user }).exec();
   // if (duplicate) return res.status(409).json({ message: "User already exists" }); //Conflict
   
   try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10);
      //create and store the new user

      const result = await User.create({
         name: name,
         email: email,
         password: hashedPwd,
         roles: {'User': 2001}
      });
      console.log(result);
      res.status(201).json({ message: `New user ${email} created` });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

module.exports = {
   handleNewUser,
};
