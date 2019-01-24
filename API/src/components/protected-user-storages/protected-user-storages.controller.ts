import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {IProjectAccount, IStorageRecord} from '@astra/common';
import {ProtectedUserStoragesService} from './protected-user-storages.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';

@Controller('storages/protected/:path')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwtProjectAccount'))
@ApiUseTags('Protected User Storages')
export class ProtectedUserStoragesController {

    constructor(
       private readonly protectedUserStoragesService: ProtectedUserStoragesService,
    ) {}

    @Get('')
    @ApiOperation({ title: 'Find list of storage records' })
    async findStorageRecordsList(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord[]> {
        return this.protectedUserStoragesService.findMany(path, account.id);
    }

    @Get(':recordId')
    @ApiOperation({ title: 'Find storage record by id' })
    async getStorageDataRecord(
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.findOne(recordId, account.id);
    }

    @Post('')
    @ApiOperation({ title: 'Create new storage record' })
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
    @ApiOperation({ title: 'Update storage record by id' })
    async updateStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.updateOne(recordId, body, account.id);
    }

    @Delete(':recordId')
    @ApiOperation({ title: 'Delete storage record by id' })
    async removeOne(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await this.protectedUserStoragesService.removeOne(recordId, account.id);
    }

}