const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();

router
  .get("/getuserinfo", userController.getinfo)
  .post("/signup", userController.checkBody, userController.signup)
  .post("/login", userController.checkBody, userController.login);

module.exports = router;
