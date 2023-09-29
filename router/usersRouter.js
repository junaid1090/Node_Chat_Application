//external imports
const express = require("express");

//internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const { checkLogin } = require("../middlewares/common/checklogin");
const declareHtmlResponse = require("../middlewares/common/declareHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userVaildators");

const router = express.Router();

//users page
router.get("/", declareHtmlResponse("Users"), checkLogin, getUsers);

//add users
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

//delete user
router.delete("/:id", removeUser);

module.exports = router;
