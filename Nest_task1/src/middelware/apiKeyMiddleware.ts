import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    config();
    const apiKey = req.headers['api_key'];
    console.log()
    if (apiKey !== process.env.API_KEY) {
      res.status(HttpStatus.FORBIDDEN).send('Invalid API key');
      return;
    }
    next();
  }
}