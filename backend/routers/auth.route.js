import express from "express";
import { deleteUserAccount, login, logout, signup } from "../controllers/auth.controller.js";
import { loginMiddleware, signupMiddleware } from "../middleware/auth.middleware.js";
import { ensureAuthentication } from "../middleware/jwt.cookies.token.verify.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupMiddleware, signup);
authRouter.route("/login").post(loginMiddleware, login);
authRouter.route("/logout").post(ensureAuthentication, logout);
authRouter.route("/delete").post(ensureAuthentication, deleteUserAccount);

export default authRouter;