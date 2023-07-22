import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClientOptions } from 'astra-common';
import { Queues } from 'astra-common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.PROJECTS_SERVICE, process.env.RABBIT_URL));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
