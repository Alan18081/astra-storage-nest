import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { IProject, IProjectAccount, IUser } from '@astra/common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {ProjectAccountsService} from './project-accounts.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import { Project } from '../../helpers/decorators/project.decorator';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {ApiOperation} from '@nestjs/swagger';

@Controller('projectAccounts')
@UseFilters(ApiExceptionFilter)
export class ProjectAccountsController {

    constructor(
       private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Find many project accounts' })
    async findMany(
        @ReqUser() user: IUser,
        @Query('projectId') projectId: string,
    ): Promise<IProjectAccount[]> {
        return this.projectAccountsService.findMany(+projectId, user.id);
    }

    @Get('me/profile')
    @UseGuards(AuthGuard('jwtProjectAccount'))
    @ApiOperation({ title: 'Get profile by account token' })
    async findOneByToken(
        @ProjectAccount() projectAccount: IProjectAccount,
    ): Promise<IProjectAccount | undefined> {
        return this.projectAccountsService.findOneForSdk(projectAccount.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Find project account' })
    async findOne(
        @ReqUser() user: IUser,
        @Param('id') accountId: number,
        @Query('projectId') projectId: string,
    ): Promise<IProjectAccount | undefined> {
        return this.projectAccountsService.findOne(+projectId, +accountId, user.id);
    }

    @Post('')
    @UseGuards(AuthGuard('jwtProject'))
    @ApiOperation({ title: 'Create project account' })
    async createOne(
      @Project() project: IProject,
      @Body() dto: any,
    ): Promise<void> {
        await this.projectAccountsService.createOne(project.id, project.userId, dto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Remove project account' })
    async removeOne(
        @ReqUser() user: IUser,
        @Param('id') id: number,
        @Query('projectId') projectId: string,
    ): Promise<void> {
        await this.projectAccountsService.removeOne(+projectId, +id, user.id);
    }

    @Delete('token')
    @UseGuards(AuthGuard('jwtProjectToken'))
    @ApiOperation({ title: 'Remove project account from sdk via account token' })
    async removeOneByToken(
        @ProjectAccount() projectAccount: IProjectAccount,
    ): Promise<void> {
        await this.projectAccountsService.removeOneByToken(projectAccount.id);
    }

}