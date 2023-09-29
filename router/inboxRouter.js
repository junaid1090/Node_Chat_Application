//external imports
const express = require("express");

//internal imports
const {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
} = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checklogin");
const declareHtmlResponse = require("../middlewares/common/declareHtmlResponse");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const router = express.Router();

//inbox page
router.get("/", declareHtmlResponse("Inbox"), checkLogin, getInbox);

// search user for conversation
router.post("/search", checkLogin, searchUser);

//add conversation
router.post("/conversation", checkLogin, addConversation);

//get messages of a conversation
router.post("/messages/:conversation_id", checkLogin, getMessages);

//send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
