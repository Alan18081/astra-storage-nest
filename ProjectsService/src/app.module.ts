import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsServiceConfig } from '@astra/common';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: ProjectsServiceConfig.DATABASE,
      username: ProjectsServiceConfig.DB_USER,
      password: ProjectsServiceConfig.DB_PASSWORD,
      host: ProjectsServiceConfig.DB_HOST,
      port: ProjectsServiceConfig.DB_PORT,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProjectsModule,
    StoragesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
