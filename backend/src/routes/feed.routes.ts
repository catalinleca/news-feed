import express from "express";
import {feedRules} from "../utils/rules";
import {validateRequest, verifyToken} from "../middlewares";
import {createPostController, getPostsController, getPostByIdController} from "../controllers";

const router = express.Router();

router.post('/api/post', verifyToken, feedRules.forCreatePost, validateRequest, createPostController)

router.get('/api/posts', verifyToken, getPostsController)

router.get('/api/posts/:postId', verifyToken, getPostByIdController)

export {router as postRouter};