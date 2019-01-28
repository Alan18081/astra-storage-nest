import {ClassSerializerInterceptor, Controller, UseInterceptors} from '@nestjs/common';
import {StorageRecordsService} from './storage-records.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes, PaginatedResponse} from '@astra/common';
import {StorageRecord} from './storage-record.entity';
import {
    CreateStorageRecordDto,
    FindStorageRecordDto,
    FindStorageRecordsListDto, RemoveStorageRecordDto,
    UpdateStorageRecordDto,
} from '@astra/common/dto';
import {RecordsInterceptor} from '../../helpers/interceptors/records.interceptor';

@Controller()
@UseInterceptors(ClassSerializerInterceptor, RecordsInterceptor)
export class SdkStorageRecordsController {

    constructor(
       private readonly storageRecordsService: StorageRecordsService,
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
        return this.storageRecordsService.createOne(payload);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_UPDATE_STORAGE_RECORD })
    async updateOne(payload: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
        return this.storageRecordsService.updateOne(payload.id, payload.data);
    }

    @MessagePattern({ cmd: CommunicationCodes.SDK_REMOVE_STORAGE_RECORD })
    async removeOne(payload: RemoveStorageRecordDto): Promise<void> {
        await this.storageRecordsService.removeById(payload.id);
    }

}