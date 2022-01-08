import {Request, Response, NextFunction} from "express";
import {matchedData} from "express-validator";
import Post from "../models/Post";
import {NotFoundError} from "../utils/errors";
import {getPaginationConditions, getQueryConditions} from "../utils";
import Comment from "../models/Comment";

export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, description: body} = matchedData(req);

    const userId = +req.params.userId || req.currentUser!.userId;

    const result = await Post.create({
      userId,
      title,
      body
    })

    return res.status(201).json(result);
  } catch (err) {
    next(err)
  }
}

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditions = getPaginationConditions(req);
    const whereConditions = getQueryConditions(req, Post);

    const result = await Post.findAll({
      where: {
        ...whereConditions
      },
      ...conditions,
      order: [
        ["createdAt", "DESC"]
      ]
    })

    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

export const getPostByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId || req.currentUser!.userId;
    const postId = req.params.postId;

    const result = await Post.findOne({
      where: {
        id: postId,
        userId
      }
    })

    if (!result) {
      throw new NotFoundError();
    }

    return res.status(201).json(result);
  } catch (err) {
    next(err)
  }
}

export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let updatedPost;

    const {title, description: body} = matchedData(req);

    const userId = +req.params.userId || req.currentUser!.userId;
    const postId = req.params.postId;

    const result = await Post.update({
      userId,
      title,
      body
    }, {
      where: {
        id: postId
      }
    })

    if (result[0] === 1) {
      updatedPost = await Post.findByPk(postId)
    } else {
      updatedPost = result
    }

    return res.status(201).json(updatedPost);
  } catch (err) {
    next(err)
  }
}

export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.postId;

    const result = await Post.destroy({
      where: {
        id: postId
      }
    })

    return res.status(201).json(result);
  } catch (err) {
    next(err)
  }
}
