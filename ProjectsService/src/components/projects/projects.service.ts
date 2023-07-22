import { InjectRepository } from '@nestjs/typeorm';
import {uid} from 'uid';
import {Project} from './project.entity';
import {ProjectsRepository} from './projects.repository';
import {CreateProjectDto, FindProjectByClientInfoDto, UpdateProjectDto} from 'astra-common';
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

    async findById(id: number): Promise<Project | undefined> {
        return this.projectsRepository.findById(id);
    }

    async findOneByUserId(id: number, userId: number): Promise<Project | undefined> {
        return this.projectsRepository.findOneByUserId(id, userId);
    }

    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new Project({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        return this.projectsRepository.save(project);
    }

    // async incrementStoragesCount(id: number): Promise<void> {
    //     return this.projectsRepository.incrementStoragesCount(id);
    // }
    //
    // async decrementStoragesCount(id: number): Promise<void> {
    //     return this.decrementStoragesCount(id);
    // }

    async findOneByClientInfo(dto: FindProjectByClientInfoDto): Promise<Project | undefined> {
        return this.projectsRepository.findOneByClientInfo(dto.clientId, dto.clientSecret);
    }

    async updateOne({ id, ...data }: UpdateProjectDto): Promise<Project | undefined> {
        return this.projectsRepository.updateOneAndFind(id, { ...data });
    }

    async removeById(id: number): Promise<void> {
        await this.projectsRepository.removeById(id);
    }

    async isValidOwner(projectId: number, userId: number): Promise<boolean> {
        return !!(await this.projectsRepository.findOneByUserId(projectId, userId));
    }

}
