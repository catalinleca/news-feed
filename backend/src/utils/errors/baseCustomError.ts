export abstract class BaseCustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  abstract getErrors(): { message: string, field?: string}[];
}