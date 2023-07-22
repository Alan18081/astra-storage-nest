import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createClientOptions} from 'astra-common';
import {Queues} from 'astra-common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.DATA_SERVICE, process.env.RABBIT_URL));
  await app.listen();
}
bootstrap();
