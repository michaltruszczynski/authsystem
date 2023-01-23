const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
   .route("/")
   .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), usersController.getAllUsers)
   .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), usersController.getUser);

router.route("/").put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), usersController.putUser);

module.exports = router;
