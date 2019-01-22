import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectAccount} from './project-account.entity';
import { Messages, PaginatedResponse } from '@astra/common';
import { HashService } from '@astra/common/services';
import {
    CreateProjectAccountDto,
    FindProjectAccountByEmailDto,
    FindProjectAccountDto,
    FindProjectAccountsListDto,
} from '@astra/common/dto';
import { RpcException } from '@nestjs/microservices';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ProjectAccountsService {

    constructor(
      @InjectRepository(ProjectAccountsRepository)
      private readonly projectAccountsRepository: ProjectAccountsRepository,
      private readonly hashService: HashService,
      private readonly projectsService: ProjectsService,
    ) {}

    async findMany({ page, limit, userId, ...query }: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        if (!(await this.isValidProjectOwner(query.projectId, userId))) {
            throw new RpcException(Messages.INVALID_PERMISSIONS);
        }

        if (page && limit) {
            return await this.projectAccountsRepository.findManyWithPagination(query, { page, limit });
        }

        return await this.projectAccountsRepository.findMany(query);
    }

    async findById({ id, projectId, userId}: FindProjectAccountDto): Promise<ProjectAccount | undefined> {
        if (!(await this.isValidProjectOwner(projectId, userId))) {
            throw new RpcException(Messages.INVALID_PERMISSIONS);
        }

        return this.projectAccountsRepository.findOneById(id, projectId);
    }

    async findOneByEmail({ email, projectId }: FindProjectAccountByEmailDto): Promise<ProjectAccount | undefined> {
        return this.projectAccountsRepository.findOneByEmail(email, projectId);
    }

    async createOne(payload: CreateProjectAccountDto): Promise<ProjectAccount> {
        const projectAccount = await this.projectAccountsRepository.findOneByEmail(payload.email, payload.projectId);

        if (projectAccount) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }
        const newAccount = new ProjectAccount(payload);
        newAccount.password = await this.hashService.generateHash(payload.password);

        return await this.projectAccountsRepository.save(newAccount);
    }

    async removeOne(id: number, projectId: number, userId: number): Promise<void> {
        if (!(await this.isValidProjectOwner(projectId, userId))) {
            throw new RpcException(Messages.INVALID_PERMISSIONS);
        }

        await this.projectAccountsRepository.removeOne(id);
    }

    private async isValidProjectOwner(projectId: number, userId: number): Promise<boolean> {
        const project = await this.projectsService.findById({ id: projectId, userId });
        return !!project;
    }
}