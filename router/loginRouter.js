//external imports
const express = require("express");

//internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedin } = require("../middlewares/common/checklogin");
const declareHtmlResponse = require("../middlewares/common/declareHtmlResponse");
const {
  doLoginVaildators,
  doLoginVaildationHandler,
} = require("../middlewares/login/loginVaildator");

const router = express.Router();

//set page title
const page_title = "Login";

//login page
router.get("/", declareHtmlResponse(page_title), redirectLoggedin, getLogin);

//process login
router.post(
  "/",
  declareHtmlResponse(page_title),
  doLoginVaildators,
  doLoginVaildationHandler,
  login
);

//logout
router.delete("/", logout);

module.exports = router;
