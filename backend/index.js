import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDb } from "./config/db.js";
import authRouter from "./routers/auth.route.js";
import todoRouter from "./routers/todo.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3003;

ConnectDb();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
app.listen(PORT, ()=>{
    console.log(`server started on http://localhost:${PORT}`);
});