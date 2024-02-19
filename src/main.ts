import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AllExceptionsFilter } from './all-exception.filter';


async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, "../src/uploads"))
  await app.listen(PORT);
  Logger.log(`Running API in MODE: ${process.env.NODE_ENV} on Port: ${PORT}`)
}
bootstrap();
