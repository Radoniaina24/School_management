const asyncHandler = require("express-async-handler");
const express = require("express");
const authRoutes = express.Router();
const auhtContollers = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

authRoutes.post("/register", asyncHandler(auhtContollers.registerUser));
authRoutes.post("/login", asyncHandler(auhtContollers.login));
authRoutes.get("/me", isLoggedIn, asyncHandler(auhtContollers.getMe));
authRoutes.post("/logout", asyncHandler(auhtContollers.logout));

module.exports = authRoutes;
