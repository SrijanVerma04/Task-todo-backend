import express from "express";
import { signup, login, logout, onrefresh } from '../controllers/auth.js';
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/refresh", onrefresh);

export default authRouter;