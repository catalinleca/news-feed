import {check} from 'express-validator/check'
import {addressRules} from "./address.rules";
import User from "../../models/User";

async function checkExisting (model: any, whereCondition: any, error: any) {
  const result = await model.findOne({
    where: whereCondition
  })

  if (result) {
    throw error
  }
}

export const userRules = {
  forSignup: [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail().withMessage("Invalid email format!")
      .custom(async (email) =>
        checkExisting(User, {email}, new Error("email in use"))
      ),
    check("username")
      .isString()
      .custom(async (username) =>
        checkExisting(User, {username}, new Error("username in use"))
      ),
    check("password")
      .isLength({min: 8})
      .withMessage("Invalid PasswordService"),
    check("confirmPassword")
      .custom((confirmPassword, {req}) => req.body.password === confirmPassword)
      .withMessage("Passwords are different!"),
    check("name")
      .isString(),
    check("phone")
      .isString(),
    check("companyId")
      .isString(),
    check("website")
      .optional()
      .isString(),
    ...addressRules.createAddress
  ],
  forSignin: [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail().withMessage("Invalid email format!")
      .notEmpty()
      .withMessage("Email must be provided!"),
    check("password")
      .notEmpty()
      .withMessage("Password must be provided!")
  ],
  forRefreshToken: [
    check("refreshToken")
      .isString()
  ]
}