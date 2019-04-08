import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IStorageRecord, IUser} from '@bit/alan18081.astra-storage.common.dist';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {StorageRecordsService} from './storage-records.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';

@Controller('storages/:storageId/records')
@UseGuards(AuthGuard('jwt'))
@UseFilters(ApiExceptionFilter)
@ApiUseTags('Storage Records')
export class StorageRecordsController {

  constructor(
     private readonly storageRecordsService: StorageRecordsService,
  ) {}

  @Get('')
  @ApiOperation({ title: 'Get storage records list as storage owner' })
  async findMany(@Param('storageId', new ParseIntPipe()) storageId: number): Promise<IStorageRecord[]> {
    return this.storageRecordsService.findMany(storageId);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get storage record by id as storage owner' })
  async findOne(@Param('id') id: string): Promise<IStorageRecord | undefined> {
    return this.storageRecordsService.findOne(id);
  }

  @Post('')
  @ApiOperation({ title: 'Create storage record by id as admin' })
  async createOne(
    @Param('storageId', new ParseIntPipe()) storageId: number,
    @ReqUser() user: IUser,
    @Body() body: any,
  ): Promise<any> {
    return this.storageRecordsService.createOne(storageId, user.id, body);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update storage by id as admin' })
  async updateOne(
      @Param('id') id: string,
      @Body() body: any,
  ): Promise<any> {
      return this.storageRecordsService.updateOne(id, body);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete storage by id as admin' })
  async removeOne(@Param('id') id: string): Promise<any> {
    await this.storageRecordsService.removeOne(id);
  }


}