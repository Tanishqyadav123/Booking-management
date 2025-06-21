export class ErrorHandler extends Error {
  private statusCode;
  public constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
