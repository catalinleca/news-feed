import { ValidationError } from "express-validator";
import { BaseCustomError } from "./baseCustomError"

export class RequestValidationError extends BaseCustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
  }

  getErrors() {
    return this.errors.map( err => {
      return {
        message: err.msg,
        field: err. param
      }
    })
  }
}