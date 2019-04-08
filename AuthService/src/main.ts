import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues, ServiceExceptionFilter } from '@bit/alan18081.astra-storage.common.dist';
import { createClientOptions } from '@bit/alan18081.astra-storage.common.dist/helpers';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.AUTH_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServiceExceptionFilter());
  await app.listen(() => console.log('AuthSevice is running'));
}
bootstrap();
