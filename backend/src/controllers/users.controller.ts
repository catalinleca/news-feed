import {NextFunction, Request, Response} from "express";
import User from "../models/User";

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await User.findAll()

    return res.status(201).json(result);
  } catch(err) {
    next(err)
  }
}

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;

    const result = await User.findOne({
      where: {
        id: userId
      }
    })

    return res.status(201).json(result);
  } catch(err) {
    next(err)
  }
}