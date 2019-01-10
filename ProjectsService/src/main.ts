import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClientOptions } from '@astra/common/helpers';
import { Queues } from '@astra/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.PROJECTS_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(() => console.log('ProjectsService is running'));
}
bootstrap();
