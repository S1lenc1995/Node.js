import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { config } from 'dotenv'
import { ForbiddenExceptionFilter } from './forbiddenExceptionFilter';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    config();
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['api_key'];
    if(apiKey !== process.env.API_KEY){
        throw new HttpException('API_KEY is invalid', HttpStatus.FORBIDDEN);
    } else{
        return true
    }
  }
}
