import express from "express";
import {postRules} from "../utils/rules";
import {validateRequest, verifyToken} from "../middlewares";
import {createPostController, getPostsController, getPostByIdController, updatePostController, deletePostController} from "../controllers";
import {commentRouter} from "./comment.routes";

const postRouter = express.Router({mergeParams: true});

postRouter.use("/posts/:postId", commentRouter)

postRouter.get('/posts', verifyToken, getPostsController)

postRouter.get('/posts/:postId', verifyToken, getPostByIdController)

postRouter.post('/posts', verifyToken, postRules.forCreatePost, validateRequest, createPostController)

postRouter.put('/posts/:postId', verifyToken, postRules.forCreatePost, validateRequest, updatePostController)

postRouter.patch('/posts/:postId', verifyToken, postRules.forUpdatePost, validateRequest, updatePostController)

postRouter.delete("/posts/:postId", verifyToken, deletePostController)


export {postRouter}