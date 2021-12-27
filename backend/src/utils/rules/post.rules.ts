import {check} from "express-validator/check";

export const postRules = {
  forCreatePost: [
    check("title").isString().notEmpty(),
    check("description").isString().notEmpty()
  ],
  forUpdatePost: [
    check("title").optional().isString(),
    check("description").optional().isString()
  ]
}