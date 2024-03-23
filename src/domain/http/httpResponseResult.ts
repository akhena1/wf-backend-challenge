import { HttpStatusCode } from '../enums/httpStatusCode';

export class HttpResponseResult {
  constructor(
    message: string,
    statusCode: HttpStatusCode,
    responseData?: object,
  ) {
    this.responseData = responseData;
    this.message = message;
    this.statusCode = statusCode;
  }

  message: string;
  statusCode: HttpStatusCode;
  responseData?: object;
}
