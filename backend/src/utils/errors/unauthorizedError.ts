import {BaseCustomError} from "./baseCustomError";

export class UnauthorizedError extends BaseCustomError {
  statusCode = 401
  static message = "Unauthorized"

  constructor(message?: string) {
    super(message || UnauthorizedError.message);
  }

  getErrors(): { message: string; field?: string }[] {
    return [{ message: UnauthorizedError.message}];
  }
}