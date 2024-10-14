const asyncHandler = require("express-async-handler");
const express = require("express");
const userRoutes = express.Router();
const userContollers = require("../controllers/userControllers");
const isLoggedIn = require("../middlewares/isLoggedIn");

userRoutes.get("/", asyncHandler(userContollers.getAllUser));
userRoutes.get(
  "/profile",
  isLoggedIn,
  asyncHandler(userContollers.getUserProfile)
);
userRoutes.get("/:uid", userContollers.getOneUser);
//userRoutes.put(("/update/:uid"), userContollers.updateUser)
userRoutes.post("/register", asyncHandler(userContollers.postUser));
userRoutes.post("/login", asyncHandler(userContollers.loginUser));
userRoutes.put(
  "/update/shipping",
  isLoggedIn,
  asyncHandler(userContollers.updateShippingAddress)
);
userRoutes.put("/update/:uid", asyncHandler(userContollers.updateUser));
userRoutes.delete("/delete/:uid", userContollers.deleteUser);
module.exports = userRoutes;
