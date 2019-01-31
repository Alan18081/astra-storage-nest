import {ClassSerializerInterceptor, Controller, UseInterceptors} from '@nestjs/common';
import {StorageRecordsService} from './storage-records.service';
import { cloneDeep } from 'lodash';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes} from '@astra/common/enums';
import {StorageRecord} from './storage-record.entity';
import {
    CreateStorageRecordDto,
    FindStorageRecordDto,
    FindStorageRecordsListDto, RemoveStorageRecordDto,
    UpdateStorageRecordDto,
} from '@astra/common/dto';
import { PaginatedResponse } from '@astra/common/interfaces';
import {RecordsInterceptor} from '../../helpers/interceptors/records.interceptor';
import {SocketDataEmitterService} from '../core/socket-data-emitter.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor, RecordsInterceptor)
export class SdkStorageRecordsController {

    constructor(
       private readonly storageRecordsService: StorageRecordsService,
       private readonly socketDataEmitterService: SocketDataEmitterService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.SDK_GET_STORAGE_RECORDS_LIST })
    async findMany(payload: FindStorageRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        return this.storageRecordsService.findMany(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_GET_STORAGE_RECORD })
    async findOne(payload: FindStorageRecordDto): Promise<StorageRecord | undefined> {
        return this.storageRecordsService.findById(payload.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_CREATE_STORAGE_RECORD })
    async createOne(payload: CreateStorageRecordDto): Promise<StorageRecord> {
        const storageRecord = await this.storageRecordsService.createOne(payload);
        this.socketDataEmitterService.emitCreatedEvent(cloneDeep(storageRecord));
        return storageRecord;
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_UPDATE_STORAGE_RECORD })
    async updateOne(payload: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
        const storageRecord = await this.storageRecordsService.updateOne(payload.id, payload.data);
        console.log(storageRecord);
        this.socketDataEmitterService.emitUpdatedEvent(cloneDeep(storageRecord));
        return storageRecord;
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_REMOVE_STORAGE_RECORD })
    async removeOne(payload: RemoveStorageRecordDto): Promise<void> {
        await this.storageRecordsService.removeById(payload.id);
        this.socketDataEmitterService.emitRemovedEvent(payload.id);
    }

}