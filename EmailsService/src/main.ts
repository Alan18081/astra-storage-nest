import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues } from '@astra/common';
import { createClientOptions } from '@astra/common/helpers';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, createClientOptions(Queues.EMAILS_SERVICE));
  await app.listen(() => console.log('EmailsService is running'));
}
bootstrap();
