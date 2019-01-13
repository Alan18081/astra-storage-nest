import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {IStorage, IStorageRecord, IUser} from '@astra/common';
import {ReqUser} from '../../helpers/decorators/user.decorator';
import {StorageRecordsService} from './storage-records.service';

@Controller('storages/:storageId/records')
@UseGuards(AuthGuard('jwt'))
export class StorageRecordsController {

  constructor(
     private readonly storageRecordsService: StorageRecordsService,
  ) {}

  @Get('')
  async findMany(@Param('storageId') storageId: number): Promise<IStorageRecord[]> {
    return this.storageRecordsService.findMany(storageId);
  }

  @Post('')
  async createOne(
    @Param('storageId') storageId: number,
    @ReqUser() user: IUser,
    @Body() body: any,
  ): Promise<any> {
    return this.storageRecordsService.createOne(storageId, user.id, body);
  }

  @Put(':id')
  async updateOne(
      @Param('id') id: string,
      @Body() body: any,
  ): Promise<any> {
      return this.storageRecordsService.updateOne(id, body);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string): Promise<any> {
    await this.storageRecordsService.removeOne(id);
  }


}