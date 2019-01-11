import { Controller } from '@nestjs/common';
import { Messages, PaginatedResponse } from '@astra/common';
import {StorageRecordsService} from './storage-records.service';
import {CommunicationCodes} from '@astra/common';
import { MessagePattern } from '@nestjs/microservices';
import {
    CreateStorageRecordDto,
    FindStorageRecordDto,
    FindStorageRecordsListDto, RemoveStorageRecordDto,
    UpdateStorageRecordDto
} from '@astra/common/dto';
import { StorageRecord } from './interfaces/storage-record.model';

@Controller()
export class StorageRecordsController {

    constructor(
      private readonly storageRecordsService: StorageRecordsService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST })
    async findMany(payload: FindStorageRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        if(payload.page && payload.limit) {
            const { page, limit, ...data } = payload;
            return this.storageRecordsService.findManyWithPagination(data, { page, limit });
        }

        return this.storageRecordsService.findMany(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_RECORD })
    async findOne(payload: FindStorageRecordDto): Promise<StorageRecord | undefined> {
        return await this.storageRecordsService.findOneById(payload.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD })
    async createOne(payload: CreateStorageRecordDto): Promise<StorageRecord> {
        return await this.storageRecordsService.createOne(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_STORAGE_RECORD })
    async updateOne(payload: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
        return await this.storageRecordsService.updateOne(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORD })
    async removeOne(payload: RemoveStorageRecordDto): Promise<void> {
        await this.storageRecordsService.removeOne(payload.id);
    }

}
