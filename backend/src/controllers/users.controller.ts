import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {getPaginationConditions, getQueryConditions} from "../utils";

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditions = getPaginationConditions(req);
    const whereConditions = getQueryConditions(req, User);

    const result = await User.findAll({
      where: {
        ...whereConditions
      },
      ...conditions
    })

    return res.status(200).json(result);
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

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
}