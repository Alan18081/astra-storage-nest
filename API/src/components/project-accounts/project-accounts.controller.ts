import { Controller, Delete, Get, Param, Query, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IProjectAccount, IUser} from '@astra/common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {FindProjectAccountsListDto} from '@astra/common/dto';
import {ProjectAccountsService} from './project-accounts.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';

@Controller('projects/:projectId/accounts')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwt'))
export class ProjectAccountsController {

    constructor(
       private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @Get('')
    async findMany(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Query() query: FindProjectAccountsListDto,
    ): Promise<IProjectAccount[]> {
        return this.projectAccountsService.findMany(projectId, user.id);
    }

    @Get(':id')
    async findOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<IProjectAccount | undefined> {
        return this.projectAccountsService.findOne(projectId, accountId, user.id);
    }

    @Delete(':id')
    async removeOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<void> {
        await this.projectAccountsService.removeOne(projectId, accountId, user.id);
    }

}