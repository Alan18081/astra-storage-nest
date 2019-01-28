import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createClientOptions } from '@astra/common/helpers';
import { Queues } from '@astra/common/enums';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.SOCKETS_SERVICE));
  // app.connectMicroservice(createClientOptions(Queues.SOCKETS_SERVICE));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(() => console.log('SocketsService is running'));
}
bootstrap();
