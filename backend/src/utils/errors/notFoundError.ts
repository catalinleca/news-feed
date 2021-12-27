import {BaseCustomError} from "./baseCustomError";

export class NotFoundError extends BaseCustomError {
  statusCode = 404
  static message = "Resource not found"

  constructor() {
    super(NotFoundError.message);
  }

  getErrors(): { message: string; field?: string }[] {
    return [{ message: NotFoundError.message}];
  }
}