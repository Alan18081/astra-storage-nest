import { Module } from '@nestjs/common';
import {UsersModule} from './components/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserHashesModule} from './components/user-hashes/user-hashes.module';
import {ConfigService} from "@bit/alan18081.astra-storage.common.dist/services";

@Module({
  imports: [
      TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              database: configService.get('DB_NAME'),
              username: configService.get('DB_USER'),
              password: configService.get('DB_PASSWORD'),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
          }),
          inject: [ConfigService],
      }),
      UsersModule,
      UserHashesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
