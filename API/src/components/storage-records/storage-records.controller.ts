import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IStorageRecord, IUser} from '@astra/common';
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
  @ApiOperation({ title: 'Get storage record by id as admin' })
  async findMany(@Param('storageId') storageId: number): Promise<IStorageRecord[]> {
    return this.storageRecordsService.findMany(storageId);
  }

  @Post('')
  @ApiOperation({ title: 'Create storage record by id as admin' })
  async createOne(
    @Param('storageId') storageId: number,
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