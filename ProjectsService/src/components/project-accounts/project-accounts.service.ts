import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectAccount} from './project-account.entity';
import { Messages, PaginatedResponse } from '@astra/common';
import { HashService } from '@astra/common/services';
import { CreateProjectAccountDto, FindProjectAccountsListDto } from '@astra/common/dto';
import { ProjectsRepository } from '../projects/projects.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProjectAccountsService {

    constructor(
      @InjectRepository(ProjectAccountsRepository)
      private readonly projectAccountsRepository: ProjectAccountsRepository,
      @InjectRepository(ProjectsRepository)
      private readonly projectsRepository: ProjectsRepository,
      private readonly hashService: HashService,
    ) {}

    async findMany({ page, limit, userId, ...query }: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        if (!(await this.isValidProjectOwner(query.projectId, query.userId))) {
            throw new RpcException(Messages.INVALID_PERMISSIONS);
        }

        if (page && limit) {
            return await this.projectAccountsRepository.findManyWithPagination(query, { page, limit });
        }

        return await this.projectAccountsRepository.findMany(query);
    }
    async createOne(payload: CreateProjectAccountDto): Promise<ProjectAccount> {
        const projectAccount = await this.projectAccountsRepository.findOneByEmail(payload.email);

        if (projectAccount) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }
        const newAccount = new ProjectAccount(payload);
        newAccount.password = await this.hashService.generateHash(payload.password);

        return await this.projectsRepository.save(newAccount);
    }

    private async isValidProjectOwner(projectId: number, userId: number): Promise<boolean> {
        const project = await this.projectsRepository.findOneByUserId(projectId, userId);
        return !!project;
    }
}