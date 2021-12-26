import {check} from "express-validator/check";

export const addressRules = {
  createAddress: [
    check("address").not().isEmpty(),
    check("address.street").isString(),
    check("address.suite").isString(),
    check("address.city").isString(),
    check("address.zipcode").optional().isString(),
  ]
}