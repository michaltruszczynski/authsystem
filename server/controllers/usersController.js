const User = require('../model/User');

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

const getAllUsers = async (req, res, next) => {
   try {
      const { userId } = req;
      const users = await User.find({}, '_id name email roles').lean();
      if (!users) {
         return res.status(204).json({ message: 'No users found' });
      }

      const foundUsers = users.map((user) => {
         user.roles = Object.values(user.roles).filter(Boolean);
         if (user._id.toString() !== userId.toString()) {
            user.name = user.name.slice(0, 1).padEnd(user.name.length - 1, '*');
            user.email = user.email.slice(0, 1).padEnd(user.email.length - 1, '*');
         }
         return user;
      });

      res.json(foundUsers);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

const deleteUser = async (req, res, next) => {
   try {
      if (!req?.body?.id) return res.status(400).json({ message: 'User ID required' });

      const user = await User.findOne({ _id: req.body.id }).exec();

      if (!user) {
         return res.status(204).json({ message: `User ID ${req.body.id} not found` });
      }
      const result = await user.deleteOne({ _id: req.body.id });

      res.json(result);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

const getUser = async (req, res) => {
   try {
      if (!req?.params?.id) {
         return res.status(400).json({ message: 'User ID required' });
      }
      const { userId } = req;
      const requestedUserData = await User.findOne({ _id: req.params.id }, '_id name email roles').lean();

      if (!requestedUserData) {
         return res.status(204).json({ message: `User ID ${req.params.id} not found` });
      }
      if (requestedUserData._id.toString() !== userId) {
         requestedUserData.name = requestedUserData.name.slice(0, 1).padEnd(requestedUserData.name.length - 1, '*');
         requestedUserData.email = requestedUserData.email.slice(0, 1).padEnd(requestedUserData.email.length - 1, '*');
      }

      requestedUserData.roles = Object.values(requestedUserData.roles).filter(Boolean);
      res.json(requestedUserData);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

const putUser = async (req, res, next) => {
   const { userEmail, userRole } = req.body;

   try {
      if (userEmail !== req.email) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 401;
         throw error;
      }

      const createUserRoles = (rolesObj, roles) => {
         const keys = Object.keys(rolesObj);
         const rolesObjMod = {};
         keys.forEach((key) => {
            rolesObjMod[rolesObj[key]] = { [key]: rolesObj[key] };
         });

         return rolesObjMod[roles];
      };

      const response = await User.findOneAndUpdate({ email: userEmail }, { $set: { roles: createUserRoles(ROLES, userRole) } });

      res.json({ message: 'User updated.', status: 'Success.' });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
module.exports = {
   getAllUsers,
   deleteUser,
   getUser,
   putUser,
};
