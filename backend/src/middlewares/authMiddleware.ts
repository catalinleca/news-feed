import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "../utils/errors/badRequestError";
import AuthService from "../services/auth";
import {IAccessTokenPayload} from "../services/auth/auth.service";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IAccessTokenPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader: string | null = req.headers["authorization"] as string

  if (!bearerHeader) {
    throw new BadRequestError("Unauthorized")
  }

  const accessToken = bearerHeader.split(" ")[1]

  const authService = new AuthService()
  const decode = authService.checkAccessToken(accessToken) as IAccessTokenPayload;

  req.currentUser = decode
  next();
}