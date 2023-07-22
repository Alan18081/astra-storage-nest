import {ClassSerializerInterceptor, Controller, UseFilters, UseGuards, UseInterceptors} from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
import { CommunicationCodes, PaginatedResponse } from 'astra-common';
import {
    CreateProjectAccountDto,
    FindProjectAccountsListDto,
    FindProjectAccountByEmailDto,
    FindProjectAccountDto, RemoveProjectAccountDto, FindProjectAccountSdkDto,
} from 'astra-common';
import { ProjectAccount } from './project-account.entity';
import { ProjectAccountsService } from './project-accounts.service';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';
import {ValidProjectOwnerGuard} from '../../helpers/guards/valid-project-owner.guard';

@Controller()
@UseFilters(ExceptionFilter)
export class ProjectAccountsController {

    constructor(
      private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST })
    @UseGuards(ValidProjectOwnerGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async findMany(query: FindProjectAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        return this.projectAccountsService.findMany(query);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT })
    @UseGuards(ValidProjectOwnerGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(dto: FindProjectAccountDto): Promise<ProjectAccount | undefined> {
        return this.projectAccountsService.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_GET_PROJECT_ACCOUNT })
    @UseInterceptors(ClassSerializerInterceptor)
    async findOneForSdk(dto: FindProjectAccountSdkDto): Promise<ProjectAccount | undefined> {
        return this.projectAccountsService.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL })
    async findOneByEmail(dto: FindProjectAccountByEmailDto): Promise<ProjectAccount | undefined> {
        return this.projectAccountsService.findOneByEmail(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_PROJECT_ACCOUNT })
    async createOne(dto: CreateProjectAccountDto): Promise<ProjectAccount> {
        return this.projectAccountsService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_PROJECT_ACCOUNT })
    @UseGuards(ValidProjectOwnerGuard)
    async removeOne({ id }: RemoveProjectAccountDto): Promise<void> {
        await this.projectAccountsService.removeById(id);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_REMOVE_PROJECT_ACCOUNT })
    async removeOneSdk({ id }: RemoveProjectAccountDto): Promise<void> {
        await this.projectAccountsService.removeById(id);
    }

}
