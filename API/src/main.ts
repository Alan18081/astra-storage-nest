import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import {ConfigService} from "@astra/common/services";
import {Transport} from '@nestjs/microservices';
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);

  app.enableCors();

  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
          url: '0.0.0.0:5000',
          package: 'api',
          protoPath: join(__dirname, 'proto/api.proto'),
          // loader: {
          //     keepCase: true,
          //     longs: Number,
          //     defaults: false,
          //     arrays: true,
          //     objects: true,
          //     // includeDirs: [protoDir],
          // },
      },
  });

  console.log('Hello');

  const options = new DocumentBuilder()
    .setTitle('Astra-store')
    .setDescription('Platform for selling and buying products online')
    .setVersion('0.1.0')
    .addTag('Sales')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
    await app.startAllMicroservicesAsync();
  await app.listen(+config.get('PORT'));
}
bootstrap();
