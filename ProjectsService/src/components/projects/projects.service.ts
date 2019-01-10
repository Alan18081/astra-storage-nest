import { InjectRepository } from '@nestjs/typeorm';
import * as uid from 'uid';
import {Project} from './project.entity';
import {ProjectsRepository} from './projects.repository';
import { CreateProjectDto } from '@astra/common/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {

    constructor(
      @InjectRepository(ProjectsRepository)
      private readonly projectsRepository: ProjectsRepository,
    ) {}


    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new Project({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        return await this.projectsRepository.save(project);
    }

    async incrementStoragesCount(id: number): Promise<void> {
        const query = this.projectsRepository.queryBuilder()
            .where({ id })
            .increment('storagesCount', 1);
        await this.projectsRepository.getOneQueryResult(query);
    }

    async decrementStoragesCount(id: number): Promise<void> {
        const query = this.projectsRepository.queryBuilder()
            .where({ id })
            .decrement('storagesCount', 1);
        await this.projectsRepository.getOneQueryResult(query);
    }

    async updateOne(body: UpdateProjectDto): Promise<Project | undefined> {
        return await this.projectsRepository.update({ id: body.id }, { ...body });
    }

    async removeOne(id: number): Promise<void> {
        await this.projectsRepository.delete({ id });
    }

}