import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createClientOptions, Queues } from 'astra-common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.SOCKETS_SERVICE, process.env.RABBIT_URL));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
