import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const res = host.switchToHttp();
    const response = res.getResponse();

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messages: [exception.message],
    });
  }
}
