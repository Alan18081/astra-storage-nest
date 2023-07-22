import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';
import { ProjectAccountsModule } from './components/project-accounts/project-accounts.module';
import {ConfigService} from "astra-common";
import {CoreModule} from "./components/core/core.module";

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        inject: [ConfigService],
    }),
    ProjectsModule,
    StoragesModule,
    ProjectAccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
