import { Module } from '@nestjs/common';
import {UserAuthModule} from './components/user-auth/user-auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthServiceConfig } from '@astra/common/config';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: AuthServiceConfig.DB_HOST,
          port: AuthServiceConfig.DB_PORT,
          database: AuthServiceConfig.DATABASE,
          username: AuthServiceConfig.DB_USER,
          password: AuthServiceConfig.DB_PASSWORD,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      UserAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
