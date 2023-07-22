import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues } from 'astra-common';
import { createClientOptions } from 'astra-common';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.EMAILS_SERVICE, process.env.RABBIT_URL));
  await app.listen();
}
bootstrap();
