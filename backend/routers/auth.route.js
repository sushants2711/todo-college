import express from "express";

// import all the auth controllers part
import { deleteUserAccount, login, logout, signup } from "../controllers/auth.controller.js";

// import all the middlewares
import { deleteUserAccountMiddleware, loginMiddleware, signupMiddleware } from "../middleware/auth.middleware.js";

import { ensureAuthentication } from "../middleware/jwt.cookies.token.verify.js";

// create a router with the help of express.Router() function
const authRouter = express.Router();

// signup route
authRouter.route("/signup").post(signupMiddleware, signup);

// login route
authRouter.route("/login").post(loginMiddleware, login);

// logout route
authRouter.route("/logout").post(ensureAuthentication, logout);

// delete route
authRouter.route("/delete").post(ensureAuthentication, deleteUserAccountMiddleware, deleteUserAccount);

// export the route so we should use it any where
export default authRouter;