import express, {NextFunction, Request, Response} from "express";
import Company from "../models/Company";
import {getPaginationConditions, getQueryConditions} from "../utils";

const companyRouter = express.Router();

companyRouter.get("/companies", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditions = getPaginationConditions(req);
    const whereConditions = getQueryConditions(req, Company);

    const result = await Company.findAll({
      where: {
        ...whereConditions
      },
      ...conditions
    })

    return res.status(200).json(result);
  } catch(err) {
    next(err)
  }
})

export {companyRouter}