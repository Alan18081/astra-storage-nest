import { Module } from '@nestjs/common';
import {UserAuthModule} from './components/user-auth/user-auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ProjectAuthModule } from './components/project-auth/project-auth.module';
import { ProjectAccountAuthModule } from './components/project-account-auth/project-account-auth.module';
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
    UserAuthModule,
    ProjectAuthModule,
    ProjectAccountAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
