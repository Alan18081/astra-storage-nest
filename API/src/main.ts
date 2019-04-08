import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import {ConfigService} from "@bit/alan18081.astra-storage.common.dist/services";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);

  app.enableCors();

  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  const options = new DocumentBuilder()
    .setTitle('Astra-store')
    .setDescription('Platform for selling and buying products online')
    .setVersion('0.1.0')
    .addTag('Sales')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(+config.get('PORT'));
}
bootstrap();
