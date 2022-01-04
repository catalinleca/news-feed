import {Request} from "express";
import Sequelize, {Model, ModelCtor} from "sequelize";
import Post from "../models/Post";
import {Logger} from "sequelize/dist/lib/utils/logger";

export const getPaginationConditions = (req: Request) => {
  const conditions: {
    [key: string]: any
  } = {}

  const defaultPage = 0
  const defaultLimit = 100

  const page = +(req.query._page || defaultPage)
  const limit = +(req.query._limit || defaultLimit)
  const offset = page ? (page-1) * limit : 0

  conditions.limit = limit;
  conditions.offset = offset;

  console.log("conditions: ", conditions)

  return conditions;
}

export const getQueryConditions = (req: Request, Model: any) => {
  const whereConditions: {
    [key: string]: any
  } = {}

  const modelAttributes = Model.getAttributes();

  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params);

  Object.keys(req.query).forEach( queryParam => {
    if (modelAttributes.hasOwnProperty(queryParam)) {
      whereConditions[queryParam] = req.query[queryParam]
    }
  });

  Object.keys(req.params).forEach( argParam => {
    if (modelAttributes.hasOwnProperty(argParam)) {
      whereConditions[argParam] = req.params[argParam]
    }
  })

  console.log("whereConditions: ", whereConditions)

  return whereConditions;
}