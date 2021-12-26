import express from "express";
import {signUpController} from "../controllers";
import {userRules} from "../utils/rules";
import {refreshTokenController, signInController} from "../controllers/auth.controller";
import {validateRequest} from "../middlewares/validateRequest";

const router = express.Router();

router.post("/auth/signup", userRules.forSignup, validateRequest, signUpController)

router.post("/auth/signin", userRules.forSignin, validateRequest, signInController)

router.post("/auth/refreshToken", userRules.forRefreshToken, validateRequest, refreshTokenController)

export { router as authRouter };