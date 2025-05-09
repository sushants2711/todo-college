import express from "express";

// import todo middleware
import { createTodoMiddleware } from "../middleware/todo.middleware.js";

// import todo controllers
import { createTodo, deleteTodo, fetchAllTodo, updateTodo } from "../controllers/todo.controller.js";

// import user authentication
import { ensureAuthentication } from "../middleware/jwt.cookies.token.verify.js";

// create a router with the help of express.Router()
const todoRouter = express.Router();

// create todo 
todoRouter.route("/create").post(ensureAuthentication, createTodoMiddleware, createTodo);

// fetch todo
todoRouter.route("/fetch").get(ensureAuthentication, fetchAllTodo);

// update todo
todoRouter.route("/update/:id").put(ensureAuthentication, updateTodo);

// delete todo
todoRouter.route("/delete/:id").delete(ensureAuthentication, deleteTodo);

export default todoRouter;