import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDb } from "./config/db.js";
import authRouter from "./routers/auth.route.js";
import todoRouter from "./routers/todo.route.js";

// dotenv configration
dotenv.config();

// create a app with the help of express
const app = express();

// define a port
const PORT = process.env.PORT || 3003;

// connect to database
ConnectDb();

// use for send or receive a cookie
app.use(cookieParser());

// convert the data into a json format
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the frontend url so frontend, backend and database communicates well
app.use(cors({
    origin: "https://todo-mern-frontend-dats.onrender.com",                //"http://localhost:5173" for local server used
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// api endpoints start

// auth api end points
app.use("/api/auth", authRouter);

// todo api endpoints
app.use("/api/todo", todoRouter);


app.listen(PORT, ()=>{
    console.log(`server started on http://localhost:${PORT}`);
});