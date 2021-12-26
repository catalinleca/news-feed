import express from "express";
import {signUpController} from "../controllers";
import {userRules} from "../utils/rules";
import {refreshTokenController, signInController} from "../controllers";
import {validateRequest} from "../middlewares";

const authRouter = express.Router();

authRouter.post("/signup", userRules.forSignup, validateRequest, signUpController)

authRouter.post("/signin", userRules.forSignin, validateRequest, signInController)

authRouter.post("/refreshToken", userRules.forRefreshToken, validateRequest, refreshTokenController)

export {authRouter};