import express from "express";
import {verifyToken} from "../middlewares";
import {getUsersController, getUserByIdController} from "../controllers";
import {feedRouter} from "./feed.routes";

const userRouter = express.Router();

/** TBD: Try to make on controller for getAllData(User, id) where id column in User */
userRouter.get("/users", verifyToken, getUsersController)

userRouter.get("/users/:userId", verifyToken, getUserByIdController)

userRouter.use("/users/:userId", feedRouter)

export {userRouter};