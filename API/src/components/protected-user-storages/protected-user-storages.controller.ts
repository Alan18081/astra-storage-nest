import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {JwtProjectAccountGuard} from '../../helpers/guards/jwt-project-account.guard';
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ProjectAccount} from '../../helpers/decorators/project-account.decorator';
import {IProjectAccount, IStorageRecord} from '@astra/common';
import {ProtectedUserStoragesService} from './protected-user-storages.service';

@Controller('storages/protected/:storageId')
export class ProtectedUserStoragesController {

    constructor(
       private readonly protectedUserStoragesService: ProtectedUserStoragesService,
    ) {}

    @Get('')
    @UseGuards(JwtProjectAccountGuard)
    async findStorageRecordsList(
        @Param('storageId') storageId: number,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord[]> {
        return this.protectedUserStoragesService.findMany(storageId, account.id);
    }

    @Get(':recordId')
    @UseGuards(JwtProjectAccountGuard)
    async getStorageDataRecord(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.findOne(storageId, recordId, account.id);
    }

    @Post('')
    @UseGuards(JwtProjectAccountGuard)
    async createStorageRecordData(
        @Param('storageId') storageId: number,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        return this.protectedUserStoragesService.createOne(storageId, body, account.id);
    }

    @Put(':recordId')
    @UseGuards(JwtProjectAccountGuard)
    async updateStorageRecordData(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        return this.protectedUserStoragesService.updateOne(storageId, recordId, body, account.id);
    }

    @Delete(':recordId')
    @UseGuards(JwtProjectGuard)
    async removeOne(
        @Param('storageId') storageId: number,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await this.protectedUserStoragesService.removeOne(storageId, recordId, account.id);
    }

}