import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Project} from '../../helpers/decorators/project.decorator';
import {IProject, IStorageRecord} from '@astra/common';
import {PublicUserStoragesService} from './public-user-storages.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {ApiUseTags} from '@nestjs/swagger';

@Controller('storages/public/:path')
@UseGuards(AuthGuard('jwtProject'))
@UseFilters(ApiExceptionFilter)
@ApiUseTags('Public User Storages')
export class PublicUserStoragesController {

    constructor(
       private readonly publicUserStoragesService: PublicUserStoragesService,
    ) {}

    @Get('')
    async findStorageRecordsList(
        @Param('storageId') storageId: number,
    ) {
        return this.publicUserStoragesService.findMany(storageId);
    }

    @Get(':recordId')
    async getStorageDataRecord(
        @Param('recordId') recordId: string,
    ): Promise<IStorageRecord | undefined> {
        return this.publicUserStoragesService.findOne(recordId);
    }

    @Post('')
    async createStorageRecord(
        @Param('path') path: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        return this.publicUserStoragesService.createOne(path, project.id, body);
    }

    @Put(':recordId')
    async updateStorageRecord(
        @Param('recordId') recordId: string,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.publicUserStoragesService.updateOne(recordId, body);
    }

    @Delete(':recordId')
    async removeOne(
        @Param('recordId') recordId: string,
    ): Promise<void> {
        await this.publicUserStoragesService.removeOne(recordId);
    }

}