import { Module } from '@nestjs/common';
import {UserAuthModule} from './components/user-auth/user-auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthServiceConfig } from '@astra/common/config';
import { ProjectAuthModule } from './components/project-auth/project-auth.module';

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
      ProjectAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
