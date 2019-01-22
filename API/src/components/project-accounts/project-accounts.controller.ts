import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { IProject, IProjectAccount, IUser } from '@astra/common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {ProjectAccountsService} from './project-accounts.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import { Project } from '../../helpers/decorators/project.decorator';

@Controller('projectAccounts')
@UseFilters(ApiExceptionFilter)
export class ProjectAccountsController {

    constructor(
       private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async findMany(
        @ReqUser() user: IUser,
        @Query('projectId') projectId: string,
    ): Promise<IProjectAccount[]> {
        return this.projectAccountsService.findMany(+projectId, user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(
        @ReqUser() user: IUser,
        @Param('id') accountId: number,
        @Query('projectId') projectId: string,
    ): Promise<IProjectAccount | undefined> {
        return this.projectAccountsService.findOne(+projectId, +accountId, user.id);
    }

    @Post('')
    @UseGuards(AuthGuard('jwtProject'))
    async createOne(
      @Project() project: IProject,
      @Body() dto: any,
    ): Promise<void> {
        await this.projectAccountsService.createOne(project.id, dto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async removeOne(
        @ReqUser() user: IUser,
        @Param('id') id: number,
        @Query('projectId') projectId: string,
    ): Promise<void> {
        await this.projectAccountsService.removeOne(+projectId, +id, user.id);
    }

}