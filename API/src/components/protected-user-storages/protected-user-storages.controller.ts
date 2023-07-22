import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {IProjectAccount, IStorageRecord} from 'astra-common';
import {ProtectedUserStoragesService} from './protected-user-storages.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('storages/protected/:path')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwtProjectAccount'))
@ApiTags('Protected User Storages')
export class ProtectedUserStoragesController {

    constructor(
       private readonly protectedUserStoragesService: ProtectedUserStoragesService,
    ) {}

    @Get('')
    @ApiOperation({ summary: 'Find list of storage records' })
    async findStorageRecordsList(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord[]> {
        return this.protectedUserStoragesService.findMany(path, account.id);
    }

    @Get(':recordId')
    @ApiOperation({ summary: 'Find storage record by id' })
    async getStorageDataRecord(
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.findOne(recordId, account.id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create new storage record' })
    async createStorageRecord(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        const res = await this.protectedUserStoragesService.createOne(path, body, account.id);
        return res;
    }

    @Put(':recordId')
    @ApiOperation({ summary: 'Update storage record by id' })
    async updateStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.updateOne(recordId, body, account.id);
    }

    @Delete(':recordId')
    @ApiOperation({ summary: 'Delete storage record by id' })
    async removeOne(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await this.protectedUserStoragesService.removeOne(recordId, account.id);
    }

}
