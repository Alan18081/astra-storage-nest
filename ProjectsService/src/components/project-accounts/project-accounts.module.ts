import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjectAccountsController} from './project-accounts.controller';
import {ProjectAccountsService} from './project-accounts.service';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectsModule} from '../projects/projects.module';
import { ProjectAccount } from './project-account.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([ProjectAccount, ProjectAccountsRepository]),
      ProjectsModule,
    ],
    controllers: [ProjectAccountsController],
    providers: [ProjectAccountsService, ProjectAccountsRepository],
})
export class ProjectAccountsModule {}