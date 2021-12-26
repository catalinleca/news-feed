import express from "express";
import {feedRules} from "../utils/rules";
import {validateRequest, verifyToken} from "../middlewares";
import {createPostController, getPostsController, getPostByIdController} from "../controllers";

const feedRouter = express.Router({mergeParams: true});

feedRouter.get('/posts', verifyToken, getPostsController)

feedRouter.get('/posts/:postId', verifyToken, getPostByIdController)

feedRouter.post('/post', verifyToken, feedRules.forCreatePost, validateRequest, createPostController)


export {feedRouter}