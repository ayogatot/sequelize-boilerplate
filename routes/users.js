const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const isAuthenticated = require("../middlewares").isAuthenticated

router
  .route("/")
  .get(isAuthenticated, UserController.getUser)
  .post(UserController.createUser);

router
  .route("/:id")
  .get(isAuthenticated, UserController.getUserById)
  .put(UserController.updateUserById)
  .delete(UserController.deleteUserById);

router.post("/login", UserController.loginUser);

module.exports = router;
