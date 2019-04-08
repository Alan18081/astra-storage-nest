import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues } from '@bit/alan18081.astra-storage.common.dist';
import { createClientOptions } from '@bit/alan18081.astra-storage.common.dist/helpers';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.EMAILS_SERVICE));
  await app.listen(() => console.log('EmailsService is running'));
}
bootstrap();
