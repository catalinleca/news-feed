import express, {NextFunction, Request, Response} from "express";
import {verifyToken} from "../middlewares";
import Comment from "../models/Comment";

const commentRouter = express.Router({mergeParams: true});

/** TBD: Refactor routes the right way in specailly comments */

commentRouter.get("/comments", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId || req.currentUser!.userId;
    const postId = req.params.postId || req.query.postId;

    const result = await Comment.findAll({
      where: {
        userId,
        postId
      }
    })

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})

commentRouter.get("/comments/:commentId", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.commentId

    const result = await Comment.findOne({
      where: {
        id: commentId
      }
    })

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})


commentRouter.post("/comments", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.userId || +req.currentUser!.userId;
    const email = req.currentUser!.email;
    const postId = req.params.postId || req.query.postId;

    const {description: body, name} = req.body;

    const result = await Comment.create({
      userId,
      postId: +postId!,
      email,
      body,
      name
    })

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})
commentRouter.delete("/comments/:commentId", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = req.params.commentId


    const result = await Comment.destroy({
      where: {
        id: commentId
      }
    })

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})


export {commentRouter}