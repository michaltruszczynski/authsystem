const User = require("../model/User");

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

const getAllUsers = async (req, res) => {
   const users = await User.find({}, "_id name email roles").lean();
   const foundUsers = users.map((user) => {
      user.roles = Object.values(user.roles).filter(Boolean);
      return user;
   });
   if (!users) return res.status(204).json({ message: "No users found" });
   res.json(foundUsers);
};

const deleteUser = async (req, res) => {
   if (!req?.body?.id) return res.status(400).json({ message: "User ID required" });
   const user = await User.findOne({ _id: req.body.id }).exec();
   if (!user) {
      return res.status(204).json({ message: `User ID ${req.body.id} not found` });
   }
   const result = await user.deleteOne({ _id: req.body.id });
   res.json(result);
};

const getUser = async (req, res) => {
   console.log(!req?.params?.id);
   if (!req?.params?.id) return res.status(400).json({ message: "User ID required" });
   const user = await User.findOne({ _id: req.params.id }, "_id name email roles").lean();
   console.log(user);
   if (!user) {
      return res.status(204).json({ message: `User ID ${req.params.id} not found` });
   }

   user.roles = Object.values(user.roles).filter(Boolean);
   res.json(user);
};

const putUser = async (req, res) => {
   console.log("req.body.roles", req.body);
   console.log("req.user", req.email);
   const { userEmail, userRole } = req.body;

   if (userEmail !== req.email) {
      return res.sendStatus(401);
   }

   const createUserRoles = (rolesObj, roles) => {
      const keys = Object.keys(rolesObj);
      const rolesObjMod = {};
      keys.forEach((key) => {
         console.log("key: ",key)
         rolesObjMod[rolesObj[key]] = { [key]: rolesObj[key] };
      });
      console.log('rolesObjMod: ', rolesObjMod)
      console.log('roles: ', roles)

      return rolesObjMod[roles];
   };
   console.log('dupa', createUserRoles(ROLES, userRole));
   const response = await User.findOneAndUpdate({ email: userEmail }, { $set: { roles: createUserRoles(ROLES, userRole) } });
   console.log(response);

   res.json({ message: "ok" });
};
module.exports = {
   getAllUsers,
   deleteUser,
   getUser,
   putUser,
};
