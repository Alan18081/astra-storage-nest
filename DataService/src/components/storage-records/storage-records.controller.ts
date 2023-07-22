import { Controller } from '@nestjs/common';
import { CommunicationCodes, Queues } from 'astra-common';
import { PaginatedResponse } from 'astra-common';
import { StorageRecordsService } from './storage-records.service';
import { ClientProxy, MessagePattern, Client } from '@nestjs/microservices';
import {
  CreateStorageRecordDto,
  FindStorageRecordDto,
  FindStorageRecordsListForOwnerDto,
  RemoveStorageRecordDto,
  UpdateStorageRecordDto,
  RemoveStorageRecordsListByStorageDto,
} from 'astra-common';
import { StorageRecord } from './storage-record.entity';
import { createClientOptions } from 'astra-common';
import { SerializerService } from 'astra-common';

@Controller()
export class StorageRecordsController {

    @Client(createClientOptions(Queues.SOCKETS_SERVICE, process.env.RABBIT_URL))
    private readonly socketsClient: ClientProxy;

    constructor(
      private readonly storageRecordsService: StorageRecordsService,
      private readonly serializerService: SerializerService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST })
    async findMany(payload: FindStorageRecordsListForOwnerDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        return this.storageRecordsService.findMany(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_RECORD })
    async findOne(payload: FindStorageRecordDto): Promise<StorageRecord | undefined> {
        return this.storageRecordsService.findById(payload.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD })
    async createOne(payload: CreateStorageRecordDto): Promise<StorageRecord> {
        const storageRecord = await this.storageRecordsService.createOne(payload);
        const preparedRecord = this.serializerService.exclude(storageRecord);
        this.socketsClient
          .send({ cmd: CommunicationCodes.SOCKET_CREATED_STORAGE_RECORD }, { path: storageRecord.path, record: preparedRecord });
        return storageRecord;
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_STORAGE_RECORD })
    async updateOne(payload: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
        const storageRecord = await this.storageRecordsService.updateOne(payload.id, payload.data);
        const preparedRecord = this.serializerService.exclude(storageRecord);
        this.socketsClient
          .send({ cmd: CommunicationCodes.SOCKET_CREATED_STORAGE_RECORD }, { path: storageRecord.path, record: preparedRecord });
        return storageRecord;

    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORD })
    async removeOne(payload: RemoveStorageRecordDto): Promise<void> {
        await this.storageRecordsService.removeById(payload.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORDS_LIST_BY_STORAGE })
    async removeByStorage(payload: RemoveStorageRecordsListByStorageDto): Promise<void> {
        await this.storageRecordsService.removeByStorage(payload.storageId);
    }

}
