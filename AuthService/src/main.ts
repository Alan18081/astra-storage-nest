import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues, ServiceExceptionFilter } from '@astra/common';
import { createClientOptions } from '@astra/common/helpers';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.AUTH_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServiceExceptionFilter());
  await app.listen(() => console.log('AuthSevice is running'));
}
bootstrap();
