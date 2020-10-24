export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(messsage: string, statusCode = 400) {
    this.message = messsage;
    this.statusCode = statusCode;
  }
}
