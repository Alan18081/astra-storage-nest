import {CommunicationCodes} from '@astra/common';
import {ProjectsService} from './projects.service';
import {Controller, UseFilters} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Project } from './project.entity';
import {
    CreateProjectDto,
    FindProjectByClientInfoDto,
    FindProjectDto,
    FindProjectsListByUserDto, RemoveProjectDto, UpdateProjectDto
} from '@astra/common/dto';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';

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
    async findOne(dto: FindProjectDto): Promise<Project | undefined> {
        return this.projectsService.findById(dto);
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
    async updateOne(dto: UpdateProjectDto): Promise<Project | undefined> {
        return this.projectsService.updateOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT })
    async removeOne({ id, userId }: RemoveProjectDto): Promise<void> {
        await this.projectsService.removeOne(id, userId);
    }



}