import {matchedData, validationResult} from "express-validator";
import {UserCreationAttributes} from "../models/User";
import UserService from "../services/user/user.service";
import sequelize from "../utils/db";

export const signUpController = async (req: any, res: any) => {
  const payload = matchedData(req) as UserCreationAttributes

  const result = await sequelize.transaction(async (t) => {
    const userService = new UserService({transaction: t});
    return await userService.registerUser(payload)
  })

  return res.json(result);
}

export const signInController = async (req: any, res: any) => {

}

export const refreshTokenController = async (req: any, res: any) => {

}