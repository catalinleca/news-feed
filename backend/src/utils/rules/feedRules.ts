import {check} from "express-validator/check";

export const feedRules = {
  forCreatePost: [
    check("title").isString().notEmpty(),
    check("description").isString().notEmpty()
  ]
}