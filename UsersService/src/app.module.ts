import { Module } from '@nestjs/common';
import {UsersModule} from './components/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersServiceConfig } from '@bit/alan18081.astra-storage.common.dist';
import {UserHashesModule} from './components/user-hashes/user-hashes.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          url: 'postgresql://postgres:qwerty1@postgres/as_users_service',
          // host: UsersServiceConfig.DB_HOST,
          // port: UsersServiceConfig.DB_PORT,
          // database: UsersServiceConfig.DATABASE,
          // username: UsersServiceConfig.DB_USER,
          // password: UsersServiceConfig.DB_PASSWORD,
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      UsersModule,
      UserHashesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
