import express from "express";
import { createTodoMiddleware } from "../middleware/todo.middleware.js";
import { createTodo, deleteTodo, fetchAllTodo, updateTodo } from "../controllers/todo.controller.js";
import { ensureAuthentication } from "../middleware/jwt.cookies.token.verify.js";

const todoRouter = express.Router();

todoRouter.route("/create").post(ensureAuthentication, createTodoMiddleware, createTodo)
todoRouter.route("/fetch").get(ensureAuthentication, fetchAllTodo)
todoRouter.route("/update/:id").put(ensureAuthentication, updateTodo)
todoRouter.route("/delete/:id").delete(ensureAuthentication, deleteTodo)

export default todoRouter;