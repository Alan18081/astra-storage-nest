import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {ProjectsRepository} from './projects.repository';
import { Project } from './project.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Project, ProjectsRepository]),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}