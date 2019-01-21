import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IStorage, IUser} from '@astra/common';
import {StoragesService} from './storages.service';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';

@Controller('storages')
@UseGuards(AuthGuard('jwt'))
@UseFilters(ApiExceptionFilter)
export class StoragesController {

    constructor(
       private readonly storagesService: StoragesService,
    ) {}

    @Get('')
    async findManyByProject(@Query() query: any,  @ReqUser() user: IUser): Promise<IStorage[]> {
        return this.storagesService.findManyByProject({
            projectId: +query.projectId,
            page: +query.page,
            limit: +query.limit,
            userId: user.id
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @ReqUser() user: IUser, @Query() query: any): Promise<IStorage | undefined> {
        return this.storagesService.findOne(+id, user.id, query.includeData);
    }

    @Post('')
    async createOne(@ReqUser() user: IUser, @Body() body: any): Promise<IStorage> {
        return this.storagesService.createOne(user.id, body);
    }

    @Put(':id')
    async updateOne(@Param('id') id: number, @ReqUser() user: IUser, @Body() body: any): Promise<IStorage | undefined> {
        return this.storagesService.updateOne(+id, user.id, body);
    }

    @Delete(':id')
    async removeOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<void> {
        await this.storagesService.removeOne(+id, user.id);
    }

}