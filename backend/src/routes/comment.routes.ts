import express, {NextFunction, Request, Response} from "express";
import {validateRequest, verifyToken} from "../middlewares";
import Comment from "../models/Comment";
import {getPaginationConditions, getQueryConditions} from "../utils";
import {where} from "sequelize";
import {matchedData} from "express-validator";
import { commentRules } from "../utils/rules";

const commentRouter = express.Router({mergeParams: true});

/** TBD: Refactor routes the right way in specailly comments */

commentRouter.get("/comments", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditions = getPaginationConditions(req);
    const whereConditions = getQueryConditions(req, Comment);

    const result = await Comment.findAll({
      where: {
        ...whereConditions
      },
      ...conditions
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


commentRouter.post(
  "/comments",
  verifyToken,
  commentRules.forCreateComment,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = +req.params.userId || +req.currentUser!.userId;
      const email = req.currentUser!.email;
      const postId = req.params.postId || req.query.postId;

      const {description: body, name} = matchedData(req);

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

commentRouter.put("/comments/:commentId", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**TBD: Validation for all with matchedData */
    let updateComment;
    const commentId = req.params.commentId;
    const {description: body, name} = req.body;

    const result = await Comment.update({
      body,
      name
    }, {
      where: {
        id: commentId
      },
    })

    if (result[0] === 1) {
      updateComment = await Comment.findByPk(commentId)
    } else {
      updateComment = result
    }

    return res.status(200).json(updateComment);
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