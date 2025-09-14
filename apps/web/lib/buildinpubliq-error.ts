export class BuildinpubliqError extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.message = message;

    Error.captureStackTrace(this);
  }
}