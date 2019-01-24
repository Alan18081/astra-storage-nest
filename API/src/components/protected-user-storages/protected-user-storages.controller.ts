import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {IProjectAccount, IStorageRecord} from '@astra/common';
import {ProtectedUserStoragesService} from './protected-user-storages.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {AuthGuard} from '@nestjs/passport';

@Controller('storages/protected/:path')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwtProjectAccount'))
export class ProtectedUserStoragesController {

    constructor(
       private readonly protectedUserStoragesService: ProtectedUserStoragesService,
    ) {}

    @Get('')
    async findStorageRecordsList(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord[]> {
        return this.protectedUserStoragesService.findMany(path, account.id);
    }

    @Get(':recordId')
    async getStorageDataRecord(
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.findOne(recordId, account.id);
    }

    @Post('')
    async createStorageRecord(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        const res = await this.protectedUserStoragesService.createOne(path, body, account.id);
        console.log(res);
        return res;
    }

    @Put(':recordId')
    async updateStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.updateOne(recordId, body, account.id);
    }

    @Delete(':recordId')
    async removeOne(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await this.protectedUserStoragesService.removeOne(recordId, account.id);
    }

}