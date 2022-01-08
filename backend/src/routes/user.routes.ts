import express from "express";
import {verifyToken} from "../middlewares";
import {getUsersController, getUserByIdController} from "../controllers";
import {postRouter} from "./post.routes";

const userRouter = express.Router();

userRouter.get("/users", verifyToken, getUsersController)

userRouter.get("/users/:userId", verifyToken, getUserByIdController)

userRouter.use("/users/:userId", postRouter)

export {userRouter};