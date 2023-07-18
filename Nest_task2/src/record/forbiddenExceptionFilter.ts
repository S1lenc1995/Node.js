import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalExceptionFilter } from './globalExceptionFilter';

@Catch(HttpException)
export class ForbiddenExceptionFilter extends GlobalExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log('++++++++++++++++++++++++')

    if (status === HttpStatus.FORBIDDEN) {
      response.status(status).json({
        statusCode: status,
        message: 'API_KEY is invalid',
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      });
    } else {
      super.catch(exception, host);
    }
  }
}