import {
    BadRequestException,
    Body,
    Controller,
    Delete, ForbiddenException,
    Get,
    NotFoundException,
    Param, ParseIntPipe,
    Post,
    Put,
    Query,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { IProject, IStorage, IUser, StorageType } from '@astra/common';
import {StoragesService} from './storages.service';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import { Project } from '../../helpers/decorators/project.decorator';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';

@Controller('storages')
@UseFilters(ApiExceptionFilter)
@ApiUseTags('Storages')
export class StoragesController {

    constructor(
       private readonly storagesService: StoragesService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Find list of storages by user' })
    async findManyByProject(@Query() query: any,  @ReqUser() user: IUser): Promise<IStorage[]> {
        return this.storagesService.findManyByProject({
            projectId: +query.projectId,
            page: +query.page,
            limit: +query.limit,
            userId: user.id,
        });
    }

    @Get('path/:path/exists/:typeId')
    @UseGuards(AuthGuard('jwtProject'))
    @ApiOperation({ title: 'Check if storage with provided path and type exists' })
    async checkIfStorageExists(
      @Param('path') path: string,
      @Param('typeId', new ParseIntPipe()) typeId: StorageType,
      @Project() project: IProject,
    ): Promise<void> {
        return this.storagesService.checkIfStorageExists(path, typeId, project.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Check if storage with provided path and type exists' })
    async findOne(@Param('id') id: number, @ReqUser() user: IUser, @Query() query: any): Promise<IStorage | undefined> {
        return this.storagesService.findOne(+id, user.id, query.includeData);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Create new storage' })
    async createOne(@ReqUser() user: IUser, @Body() body: any): Promise<IStorage> {
        return this.storagesService.createOne(user.id, body);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Update storage by id' })
    async updateOne(@Param('id') id: number, @ReqUser() user: IUser, @Body() body: any): Promise<IStorage | undefined> {
        return this.storagesService.updateOne(+id, user.id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Delete storage by id' })
    async removeOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<void> {
        await this.storagesService.removeOne(+id, user.id);
    }

}
