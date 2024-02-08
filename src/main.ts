import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExceptionHandler } from './logger/exception-handler';
import { LoggerService } from './logger/logger.service';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('public'));
  app.useGlobalFilters(new ExceptionHandler(app.get(LoggerService)));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
