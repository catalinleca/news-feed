import {NextFunction, Request, Response} from "express";
import {BaseCustomError} from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Controlled error: ", err);

  if (err instanceof BaseCustomError) {
    return res.status(err.statusCode).json({ errors: err.getErrors() });
  }

  res.status(400).json({
    errors: [{ message: 'Something went wrong' }],
  });
};
