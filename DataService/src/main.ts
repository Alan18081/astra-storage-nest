import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createClientOptions} from '@astra/common/helpers';
import {Queues} from '@astra/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.DATA_SERVICE));
  await app.listen(() => console.log('DataServing is running'));
}
bootstrap();
