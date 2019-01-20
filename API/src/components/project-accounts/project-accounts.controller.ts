import {Controller, Delete, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IProjectAccount, IUser} from '@astra/common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {FindProjectAccountsListDto} from '@astra/common/dto';
import {ProjectAccountsService} from './project-accounts.service';

@Controller('projects/:projectId/accounts')
export class ProjectAccountsController {

    constructor(
       private readonly projectAccountsService: ProjectAccountsService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async findMany(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Query() query: FindProjectAccountsListDto
    ): Promise<IProjectAccount[]> {
        return this.projectAccountsService.findMany(projectId, user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<IProjectAccount | undefined> {
        return this.projectAccountsService.findOne(projectId, accountId, user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async removeOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<void> {
        await this.projectAccountsService.removeOne(projectId, accountId, user.id);
    }

}