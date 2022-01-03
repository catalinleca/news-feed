import {BaseCustomError} from "./baseCustomError";

export class ForbiddenError extends BaseCustomError {
  statusCode = 403
  static message = "Forbidden"

  constructor(message?: string) {
    super(message || ForbiddenError.message);
  }

  getErrors(): { message: string; field?: string }[] {
    return [{ message: ForbiddenError.message}];
  }
}