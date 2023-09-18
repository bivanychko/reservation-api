import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    //Sentry logger
    const res = host.switchToHttp();
    const response = res.getResponse();
    response.status(500).json(exception.response);
  }
}
