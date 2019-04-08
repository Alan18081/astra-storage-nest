import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClientOptions } from '@bit/alan18081.astra-storage.common.dist/helpers';
import { Queues } from '@bit/alan18081.astra-storage.common.dist';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.PROJECTS_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(() => console.log('ProjectsService is running'));
}
bootstrap();
