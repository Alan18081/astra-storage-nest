import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queues } from '@astra/common';
import { RABBIT_MQ_URL } from '../../Common/src/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      queue: Queues.USERS_SERVICE,
      urls: [RABBIT_MQ_URL],
      queueOptions: { durable: false }
    }
  });
  await app.listen(() => {
    console.log('UsersService is running');
  });
}
bootstrap();
