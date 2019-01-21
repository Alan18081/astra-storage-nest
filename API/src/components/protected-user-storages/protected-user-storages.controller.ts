import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {IProjectAccount, IStorageRecord} from '@astra/common';
import {ProtectedUserStoragesService} from './protected-user-storages.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {AuthGuard} from '@nestjs/passport';

@Controller('storages/protected/:storageId')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwtProjectAccount'))
export class ProtectedUserStoragesController {

    constructor(
       private readonly protectedUserStoragesService: ProtectedUserStoragesService,
    ) {}

    @Get('')
    async findStorageRecordsList(
        @Param('storageId') storageId: number,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord[]> {
        return this.protectedUserStoragesService.findMany(storageId, account.id);
    }

    @Get(':recordId')
    async getStorageDataRecord(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.findOne(storageId, recordId, account.id);
    }

    @Post('')
    async createStorageRecordData(
        @Param('storageId') storageId: number,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        return this.protectedUserStoragesService.createOne(storageId, body, account.id);
    }

    @Put(':recordId')
    async updateStorageRecordData(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.updateOne(storageId, recordId, body, account.id);
    }

    @Delete(':recordId')
    async removeOne(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await this.protectedUserStoragesService.removeOne(storageId, recordId, account.id);
    }

}