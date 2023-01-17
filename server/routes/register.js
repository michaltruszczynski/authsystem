const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

const { userRegisterValidation } = require("../middleware/registerValidators/registerValidators.js");
const { dataErrorHandler, throwError } = require("../middleware/errorHandlers/errorHandlers");

router.post("/", userRegisterValidation(), dataErrorHandler, throwError("Registration validation failed."), registerController.handleNewUser);

module.exports = router;
