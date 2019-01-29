import { Controller } from '@nestjs/common';
import { CommunicationCodes, Queues } from '@astra/common/enums';
import { PaginatedResponse } from '@astra/common/interfaces';
import { StorageRecordsService } from './storage-records.service';
import { ClientProxy, MessagePattern, Client } from '@nestjs/microservices';
import {
    CreateStorageRecordDto,
    FindStorageRecordDto,
    FindStorageRecordsListDto,
    RemoveStorageRecordDto,
    UpdateStorageRecordDto,
} from '@astra/common/dto';
import { StorageRecord } from './storage-record.entity';
import { createClientOptions } from '@astra/common/helpers';
import { SerializerService } from '@astra/common/services';

@Controller()
export class StorageRecordsController {

    @Client(createClientOptions(Queues.SOCKETS_SERVICE))
    private readonly socketsClient: ClientProxy;

    constructor(
      private readonly storageRecordsService: StorageRecordsService,
      private readonly serializerService: SerializerService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST })
    async findMany(payload: FindStorageRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
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

}
