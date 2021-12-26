import {BaseCustomError} from "./baseCustomError";

export class InvalidCredentialsError extends BaseCustomError {
  statusCode = 403
  static message = "Wrong username or password"

  constructor() {
    super(InvalidCredentialsError.message);
  }

  getErrors(): { message: string; field?: string }[] {
    return [{ message: InvalidCredentialsError.message}];
  }
}