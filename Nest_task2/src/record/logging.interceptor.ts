import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, query, params, body } = request;
    const requestId = uuid.v4();
    const logMessage = `Request ID: ${requestId} | Method: ${method} | URL: ${url} | Query: ${JSON.stringify(
      query,
    )} | Params: ${JSON.stringify(params)} | Body: ${JSON.stringify(body)}`;

    const logDirectory = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    fs.appendFileSync(path.join(logDirectory, `${getCurrentDate()}.log`), logMessage + '\n');

    return next.handle().pipe(
      tap((response) => {
        console.log(response, '111111111111111111111111111')
        const { status } = response;
        const {data} = response
        console.log(data, '22222222222222222222222')
        const responseBody = JSON.stringify(data);

        fs.appendFileSync(
          path.join(logDirectory, `${getCurrentDate()}.log`),
          `Response ID: ${requestId} | Status: ${status} | Response Body: ${responseBody}` + '\n',
        );
      }),
      catchError((error) => {
        if (error instanceof HttpException) {
          const status = error.getStatus();
          const responseBody = JSON.stringify(error.getResponse());

          fs.appendFileSync(
            path.join(logDirectory, `${getCurrentDate()}.log`),
            `Response ID: ${requestId} | Status: ${status} | Response Body: ${responseBody}` + '\n',
          );
        }

        return throwError(error);
      }),
    );
  }
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
}