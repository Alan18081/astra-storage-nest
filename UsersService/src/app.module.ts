import { Module } from '@nestjs/common';
import {UsersModule} from './components/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersServiceConfig } from '@astra/common';
import {RefreshTokensModule} from './components/refresh-tokens/refresh-tokens.module';
import {UserHashesService} from './components/user-hashes/user-hashes.service';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: UsersServiceConfig.DB_HOST,
          port: UsersServiceConfig.DB_PORT,
          database: UsersServiceConfig.DATABASE,
          username: UsersServiceConfig.DB_USER,
          password: UsersServiceConfig.DB_PASSWORD,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true
      }),
      UsersModule,
      RefreshTokensModule,
      UserHashesService,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
