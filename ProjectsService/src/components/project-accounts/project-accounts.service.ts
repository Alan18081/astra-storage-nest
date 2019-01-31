import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectAccount} from './project-account.entity';
import { Messages, PaginatedResponse } from '@astra/common';
import { HashService } from '@astra/common/services';
import {
    CreateProjectAccountDto,
    FindProjectAccountByEmailDto,
    FindProjectAccountsListDto,
} from '@astra/common/dto';
import { RpcException } from '@nestjs/microservices';
import {ProjectsService} from '../projects/projects.service';

@Injectable()
export class ProjectAccountsService {

    constructor(
      @InjectRepository(ProjectAccountsRepository)
      private readonly projectAccountsRepository: ProjectAccountsRepository,
      private readonly hashService: HashService,
    ) {}

    async findMany({ page, limit, userId, projectId }: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        if (page && limit) {
            return await this.projectAccountsRepository.findManyWithPagination({ projectId }, { page, limit });
        }

        return await this.projectAccountsRepository.findMany({ projectId });
    }

    async findById(id: number): Promise<ProjectAccount | undefined> {
        const res = await this.projectAccountsRepository.findById(id);
        console.log('Project account', res);
        return res;
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

    async removeById(id: number): Promise<void> {
        await this.projectAccountsRepository.removeById(id);
    }
}