export class CustomError extends Error {
  static readonly NAME: string = "CustomError";
  readonly type: string = CustomError.NAME;

  constructor(message: string) {
    super(message);
  }

  static is(error: unknown): error is CustomError {
    return error instanceof CustomError;
  }
}
