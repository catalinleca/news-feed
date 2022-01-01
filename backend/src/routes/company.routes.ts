import express, {NextFunction, Request, Response} from "express";
import Company from "../models/Company";

const companyRouter = express.Router();

companyRouter.get("/companies", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Company.findAll()

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})

export {companyRouter}