import {BaseCustomError} from "./baseCustomError";

export class BadRequestError extends BaseCustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  getErrors() {
    return [{ message: this.message }];
  }
}
