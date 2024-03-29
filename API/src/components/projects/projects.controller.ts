import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IProject, IUser} from 'astra-common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {CreateProjectDto, UpdateProjectDto} from 'astra-common';
import {ProjectsService} from './projects.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
@UseFilters(ApiExceptionFilter)
@ApiTags('Projects')
export class ProjectsController {

    constructor(
       private readonly projectsService: ProjectsService,
    ) {}

    @Get('')
    @ApiOperation({ summary: 'Find list of projects by user' })
    async findManyByUser(@ReqUser() user: IUser): Promise<IProject[]> {
        return this.projectsService.findManyByUser(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find project by id' })
    async findOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<IProject> {
        return this.projectsService.findOne(+id, user.id);
    }

    @Post('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Create new project' })
    async createOne(@ReqUser() user: IUser, @Body() dto: CreateProjectDto): Promise<IProject> {
        return this.projectsService.createOne(user.id, dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update project by id' })
    async updateOne(@Param('id') id: number, @ReqUser() user: IUser, @Body() dto: UpdateProjectDto): Promise<IProject | undefined> {
        return this.projectsService.updateOne(+id, user.id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete project by id' })
    async removeOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<void> {
        await this.projectsService.removeOne(+id, user.id);
    }

}
