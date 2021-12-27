import {Request, Response, NextFunction} from "express";
import {matchedData} from "express-validator";
import Post from "../models/Post";
import {NotFoundError} from "../utils/errors";

export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, description: body} = matchedData(req);

    /** TBD: unsafe. Make secure later */
    const userId = +req.params.userId || req.currentUser!.userId;

    const result = await Post.create({
      userId,
      title,
      body
    })

    return res.status(201).json(result);
  } catch(err) {
    next(err)
  }
}

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId || req.currentUser!.userId;

    const result = await Post.findAll({
      where: {
        userId
      }
    })

    return res.status(201).json(result);
  } catch(err) {
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
  } catch(err) {
    next(err)
  }
}

export const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    return res.status(201).json(result);
  } catch(err) {
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
  } catch(err) {
    next(err)
  }
}
