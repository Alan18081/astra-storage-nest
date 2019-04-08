import {CommunicationCodes} from '@bit/alan18081.astra-storage.common.dist';
import {ProjectsService} from './projects.service';
import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Project } from './project.entity';
import {
    CreateProjectDto,
    FindProjectByClientInfoDto,
    FindProjectDto,
    FindProjectsListByUserDto, RemoveProjectDto, UpdateProjectDto
} from '@bit/alan18081.astra-storage.common.dist/dto';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';
import { ValidOwnerGuard } from '../../helpers/guards/valid-owner.guard';

@Controller()
@UseFilters(ExceptionFilter)

export class ProjectsController {

    constructor(
      private readonly projectsService: ProjectsService,
     ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECTS_LIST })
    async findAll(): Promise<Project[]> {
        return [];
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECTS_LIST_BY_USER })
    async findManyByUser(dto: FindProjectsListByUserDto): Promise<Project[]> {
        return this.projectsService.findManyByUser(dto.userId);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT })
    @UseGuards(ValidOwnerGuard)
    async findOne(dto: FindProjectDto): Promise<Project | undefined> {
        return this.projectsService.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO })
    async findOneByClientInfo(dto: FindProjectByClientInfoDto): Promise<Project | undefined> {
        return this.projectsService.findOneByClientInfo(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_PROJECT })
    async createOne(dto: CreateProjectDto): Promise<Project> {
        return this.projectsService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_PROJECT })
    @UseGuards(ValidOwnerGuard)
    async updateOne(dto: UpdateProjectDto): Promise<Project | undefined> {
        return this.projectsService.updateOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT })
    @UseGuards(ValidOwnerGuard)
    async removeOne({ id }: RemoveProjectDto): Promise<void> {
        await this.projectsService.removeById(id);
    }



}