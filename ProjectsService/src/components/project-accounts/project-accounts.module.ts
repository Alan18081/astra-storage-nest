import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjectAccountsController} from './project-accounts.controller';
import {ProjectAccountsService} from './project-accounts.service';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectsModule} from '../projects/projects.module';
import { ProjectAccount } from './project-account.entity';
import { CoreModule } from '../core/core.module';
import {APP_GUARD} from '@nestjs/core';
import {ValidProjectOwnerGuard} from '../../helpers/guards/valid-project-owner.guard';

@Module({
    imports: [
      TypeOrmModule.forFeature([ProjectAccount, ProjectAccountsRepository]),
      ProjectsModule,
      CoreModule,
    ],
    controllers: [ProjectAccountsController],
    providers: [
        ProjectAccountsService,
        {
            provide: APP_GUARD,
            useClass: ValidProjectOwnerGuard,
        },
    ],
})
export class ProjectAccountsModule {}