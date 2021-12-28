import {matchedData} from "express-validator";
import { Request, Response, NextFunction } from 'express';
import {UserCreationAttributes} from "../models/User";
import UserService from "../services/user/user.service";
import sequelize from "../utils/db";
import {LoginUserDto} from "../services/user/dto";
import AuthService from "../services/auth";

/**
 * TBD: Change response. Auto login on signup
 */
export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = matchedData(req) as UserCreationAttributes

    const result = await sequelize.transaction(async (t) => {
      const userService = new UserService({transaction: t});
      return await userService.registerUser(payload)
    })

    return res.status(201).json(result);
  } catch(err) {
    next(err)
  }
}

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = matchedData(req) as LoginUserDto

    const userService = new UserService();
    const result = await userService.signInUser(payload);

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
}

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = matchedData(req)

    const authService = new AuthService()
    const result = await authService.refreshTokens(payload.refreshToken);

    return res.status(201).json(result);
  } catch(err) {
    next(err)
  }
}


/** TBD: logout */