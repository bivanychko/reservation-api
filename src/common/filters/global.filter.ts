import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let responseData: unknown;
    let statusCode: number;

    if (exception instanceof HttpException) {
      responseData = exception.getResponse();
      statusCode = exception.getStatus();
    } else {
      responseData = { message: "Internal Server error" };
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      //Ideally should be sentry as well
      console.error(exception);
    }

    const response: Response = host.switchToHttp().getResponse();

    return response.status(statusCode).json(responseData);
  }
}
