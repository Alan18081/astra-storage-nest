import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Project} from '../../helpers/decorators/project.decorator';
import {IProject, IStorageRecord} from '@astra/common';
import {PublicUserStoragesService} from './public-user-storages.service';

@Controller('storages/public/:storageId')
@UseGuards(JwtProjectGuard)
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
        @Param('storageId') storageId: number,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        return this.publicUserStoragesService.createOne(project.id, storageId, body);
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