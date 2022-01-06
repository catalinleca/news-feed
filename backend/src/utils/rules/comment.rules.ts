import {check} from "express-validator/check";

export const commentRules = {
  forCreateComment: [
    check("name").isString().notEmpty(),
    check("description").isString().notEmpty()
  ],
  forUpdateComment: [
    check("name").optional().isString(),
    check("description").optional().isString()
  ]
}