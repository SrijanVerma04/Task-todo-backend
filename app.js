import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
import cors from "cors";

const app = express();

import authRouter from "./routes/auth.js";
import listRouter from "./routes/list.js";
import taskRouter from "./routes/task.js";

config();
app.use(express.json());
app.use(cors({origin: `${process.env.ORIGIN}`, credentials: true}))
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/list",listRouter);
app.use("/api/task",taskRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(3000))
.then(()=>console.log("Connected to Database"))
.catch((err)=>{
    console.log(err);
})

console.log(process.env.ORIGIN);

app.get('/',(req,res)=>{
    res.send('Hello World');
})