import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IStorageRecord, IUser} from 'astra-common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {StorageRecordsService} from './storage-records.service';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('storages/:storageId/records')
@UseGuards(AuthGuard('jwt'))
@UseFilters(ApiExceptionFilter)
@ApiTags('Storage Records')
export class StorageRecordsController {

  constructor(
     private readonly storageRecordsService: StorageRecordsService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get storage records list as storage owner' })
  async findMany(@Param('storageId', new ParseIntPipe()) storageId: number): Promise<IStorageRecord[]> {
    return this.storageRecordsService.findMany(storageId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get storage record by id as storage owner' })
  async findOne(@Param('id') id: string): Promise<IStorageRecord | undefined> {
    return this.storageRecordsService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create storage record by id as admin' })
  async createOne(
    @Param('storageId', new ParseIntPipe()) storageId: number,
    @ReqUser() user: IUser,
    @Body() body: any,
  ): Promise<any> {
    return this.storageRecordsService.createOne(storageId, user.id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update storage by id as admin' })
  async updateOne(
      @Param('id') id: string,
      @Body() body: any,
  ): Promise<any> {
      return this.storageRecordsService.updateOne(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete storage by id as admin' })
  async removeOne(@Param('id') id: string): Promise<any> {
    await this.storageRecordsService.removeOne(id);
  }


}
