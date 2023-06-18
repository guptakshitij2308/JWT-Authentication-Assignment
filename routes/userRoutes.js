const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();

router
  .get("/getusers", userController.getinfo)
  .post("/signup", userController.signup)
  .post("/login", userController.login);

module.exports = router;
