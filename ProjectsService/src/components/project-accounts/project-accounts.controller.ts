import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommunicationCodes, PaginatedResponse } from '@astra/common';
import { FindAccountsListDto } from '@astra/common/dto';
import { ProjectAccount } from './project-account.entity';

@Controller()
export class ProjectAccountsController {

    @MessagePattern({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST })
    async findMany(query: FindAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        if(!(await this.isValidProjectOwner(query.projectId, query.userId))) {
            throw new Forbidden({ error: Messages.INVALID_PERMISSIONS });
        }

        if(query.page && query.limit) {
            return await this.projectAccountsService.findManyWithPagination(query, { page: query.page, limit: query.limit });
        }

        return await this.projectAccountsService.findMany(query);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_ACCOUNT)
    async findOne(query: FindAccountDto): Promise<ProjectAccountEntity | undefined> {
        return await this.projectAccountsService.findById(query.id);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL)
    async findOneByEmail(query: FindAccountByEmailDto): Promise<ProjectAccountEntity | undefined> {
        return await this.projectAccountsService.findOneByEmail(query.email);
    }


    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT_ACCOUNT)
    async createOne(payload: CreateAccountDto): Promise<ProjectAccountEntity> {
        const project = await this.projectAccountsService.findOneByEmail(payload.email);

        if(project) {
            throw new BadRequest({ error: Messages.USER_ALREADY_EXISTS });
        }

        return await this.projectAccountsService.createOne(payload);
    }

    private async isValidProjectOwner(projectId: number, userId: number): Promise<boolean> {
        const project = await this.projectsService.findOneByUser(projectId, userId);
        return !!project;
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_PROJECT_ACCOUNT)
    async removeOne(query: RemoveAccountDto): Promise<void> {
        await this.projectAccountsService.removeOne(query.accountId);
    }

}