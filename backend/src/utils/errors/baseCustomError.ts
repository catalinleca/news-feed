export abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  abstract getErrors(): { message: string, field?: string}[];
}