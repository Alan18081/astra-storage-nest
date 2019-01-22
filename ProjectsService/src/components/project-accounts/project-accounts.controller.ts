import {Controller, UseFilters} from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
import { CommunicationCodes, PaginatedResponse } from '@astra/common';
import {
    CreateProjectAccountDto,
    FindProjectAccountsListDto,
    FindProjectAccountByEmailDto,
    FindProjectAccountDto, RemoveProjectAccountDto,
} from '@astra/common/dto';
import { ProjectAccount } from './project-account.entity';
import { ProjectAccountsService } from './project-accounts.service';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';

@Controller()
@UseFilters(ExceptionFilter)
export class ProjectAccountsController {

    constructor(
      private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST })
    async findMany(query: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        return this.projectAccountsService.findMany(query);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT })
    async findOne(dto: FindProjectAccountDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findById(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL })
    async findOneByEmail(dto: FindProjectAccountByEmailDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findOneByEmail(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_PROJECT_ACCOUNT })
    async createOne(dto: CreateProjectAccountDto): Promise<ProjectAccount> {
        return this.projectAccountsService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT_ACCOUNT })
    async removeOne({ id, projectId, userId }: RemoveProjectAccountDto): Promise<void> {
        await this.projectAccountsService.removeOne(id, projectId, userId);
    }

}