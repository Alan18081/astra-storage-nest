import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServiceExceptionFilter } from '@astra/common';
import {ValidationPipe} from '@nestjs/common';
import {Transport} from '@nestjs/microservices';
import {join} from 'path';
import {ConfigService} from '@astra/common/services';


async function bootstrap() {
    console.log(join(__dirname, 'proto/users.proto'));
  const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.GRPC,
      options: {
          url: '0.0.0.0:5000',
          package: 'users',
          protoPath: join(__dirname, 'proto/users.proto'),
      },
  });
  const config = app.get(ConfigService);
  // app.connectMicroservice();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServiceExceptionFilter());
  // await app.startAllMicroservicesAsync();
  await app.listen(() => console.log('UsersServiceOld is running'));
}
bootstrap();
