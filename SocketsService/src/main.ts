import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createClientOptions } from '@bit/alan18081.astra-storage.common.dist/helpers';
import { Queues } from '@bit/alan18081.astra-storage.common.dist/enums';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.SOCKETS_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(() => console.log('SocketsService is running'));
}
bootstrap();
