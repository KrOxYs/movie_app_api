import {
  register,
  login,
  verify,
} from "../../controller/Auth/authController.js";
import { isSignIn } from "../../middleware/Auth/isSignin.js";
import express from "express";

const Router = express.Router();

Router.post("/register", register);
Router.post("/verify", isSignIn, verify);
Router.post("/login", login);

export default Router;
