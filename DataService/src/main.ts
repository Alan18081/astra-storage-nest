import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createClientOptions} from '@bit/alan18081.astra-storage.common.dist/helpers';
import {Queues} from '@bit/alan18081.astra-storage.common.dist';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.DATA_SERVICE));
  await app.listen(() => console.log('DataServing is running'));
}
bootstrap();
