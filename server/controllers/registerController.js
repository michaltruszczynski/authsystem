const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });

   try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10);
      //create and store the new user

      const result = await User.create({
         name: name,
         email: email,
         password: hashedPwd,
         roles: { User: 2001 },
         registeredFrom: 'App',
         isPasswordSet: true,
      });
      res.status(201).json({ message: `New user ${email} created` });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

module.exports = {
   handleNewUser,
};
