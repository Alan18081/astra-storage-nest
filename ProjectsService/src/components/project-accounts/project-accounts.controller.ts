import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationCodes, Messages, PaginatedResponse } from '@astra/common';
import {
    CreateProjectAccountDto,
    FindProjectAccountsListDto,
    FindProjectAccountByEmailDto,
    FindProjectAccountDto, RemoveProjectAccountDto,
} from '@astra/common/dto';
import { ProjectAccount } from './project-account.entity';
import { ProjectAccountsService } from './project-accounts.service';

@Controller()
export class ProjectAccountsController {

    constructor(
      private readonly projectAccountsService: ProjectAccountsService,
    ) {}


    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST })
    async findMany(query: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        return this.projectAccountsService.findMany(query);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT })
    async findOne(query: FindProjectAccountDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findById(query.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL })
    async findOneByEmail(query: FindProjectAccountByEmailDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findOneByEmail(query.email);
    }


    @MessagePattern({ cmd: CommunicationCodes.CREATE_PROJECT_ACCOUNT })
    async createOne(dto: CreateProjectAccountDto): Promise<ProjectAccount> {
        return this.projectAccountsService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT_ACCOUNT })
    async removeOne(dto: RemoveProjectAccountDto): Promise<void> {
        await this.projectAccountService.removeOne(dto.accountId);
    }

}