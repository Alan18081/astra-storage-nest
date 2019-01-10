import {CommunicationCodes} from '@astra/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectsService} from './projects.service';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Project } from './project.entity';
import {
    CreateProjectDto,
    FindProjectByClientInfoDto,
    FindProjectDto,
    FindProjectsListByUserDto, RemoveProjectDto, UpdateProjectDto
} from '@astra/common/dto';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsController {

    constructor(
      private readonly projectsService: ProjectsService,
      @InjectRepository(ProjectsRepository)
      private readonly projectsRepository: ProjectsRepository,
     ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECTS_LIST })
    async findAll(): Promise<Project[]> {
        return [];
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECTS_LIST_BY_USER })
    async findManyByUser(dto: FindProjectsListByUserDto): Promise<Project[]> {
        return this.projectsRepository.findManyByUser(dto.userId);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT })
    async findOne(dto: FindProjectDto): Promise<Project | undefined> {
        return this.projectsRepository.findById(dto.id);
    }

    @MessagePattern(CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO)
    async findOneByClientInfo(dto: FindProjectByClientInfoDto): Promise<Project | undefined> {
        return this.projectsRepository.findOneByClientInfo(dto.clientId, dto.clientSecret);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_PROJECT })
    async createOne(dto: CreateProjectDto): Promise<Project> {
        return this.projectsService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_PROJECT })
    async updateOne(dto: UpdateProjectDto): Promise<Project | undefined> {
        return this.projectsRepository.updateOne(dto.id, dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT })
    async removeOne(dto: RemoveProjectDto): Promise<void> {
        await this.projectsRepository.removeById(dto.id);
    }



}