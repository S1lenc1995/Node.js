import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './record/globalExceptionFilter';
import { ForbiddenExceptionFilter } from './record/forbiddenExceptionFilter'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
