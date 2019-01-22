import { InjectRepository } from '@nestjs/typeorm';
import * as uid from 'uid';
import {Project} from './project.entity';
import {ProjectsRepository} from './projects.repository';
import {CreateProjectDto, FindProjectByClientInfoDto, FindProjectDto, UpdateProjectDto} from '@astra/common/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {

    constructor(
      @InjectRepository(ProjectsRepository)
      private readonly projectsRepository: ProjectsRepository,
    ) {}

    async findManyByUser(userId: number): Promise<Project[]> {
        return this.projectsRepository.findManyByUser(userId);
    }

    async findById({ id, userId }: FindProjectDto): Promise<Project | undefined> {
        return this.projectsRepository.findById(id, userId);
    }

    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new Project({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        return await this.projectsRepository.save(project);
    }

    async incrementStoragesCount(id: number): Promise<void> {
        return this.incrementStoragesCount(id);
    }

    async decrementStoragesCount(id: number): Promise<void> {
        return this.decrementStoragesCount(id);
    }

    async findOneByClientInfo(dto: FindProjectByClientInfoDto): Promise<Project | undefined> {
        return this.projectsRepository.findOneByClientInfo(dto.clientId, dto.clientSecret);
    }

    async updateOne({ id, userId, ...data }: UpdateProjectDto): Promise<Project | undefined> {
        return this.projectsRepository.updateOne({ id, userId }, { ...data });
    }

    async removeOne(id: number, userId: number): Promise<void> {
        await this.projectsRepository.delete({ id, userId });
    }

    async isValidOwner(projectId: number, userId: number): Promise<boolean> {
        return !!(await this.projectsRepository.findOneByUserId(projectId, userId));
    }

}