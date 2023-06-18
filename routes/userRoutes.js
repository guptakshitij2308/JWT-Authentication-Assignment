const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();
const { requireAuth } = require("./../middlewares/authMiddleware");

router
  .get("/getuser", requireAuth, userController.getinfo)
  .post("/signup", userController.signup)
  .post("/login", userController.login)
  .get("/logout", userController.logout);

module.exports = router;
