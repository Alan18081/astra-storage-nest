import { injectable, inject } from 'inversify';
import * as uid from 'uid';
import { SubscribeMessage, Messages, BadRequest, PaginatedResponse, Validate } from '@astra/common';
import {StorageRecordsService} from './storage-records.service';
import {CommunicationCodes} from '@astra/common';
import {StorageRecordSchema} from './storage-record';
import { FindRecordsListDto } from '../../../../Common/src/dto/dto/find-records-list.dto';
import { AddRecordDto } from '../../../../Common/src/dto/dto/add-record.dto';
import { RemoveRecordDto } from '../../../../Common/src/dto/dto/remove-record.dto';
import { FindRecordDto } from '../../../../Common/src/dto/dto/find-record.dto';
import {UpdateRecordDto} from '../../../../Common/src/dto/dto/update-record.dto';

@injectable()
export class StorageRecordsController {

    @inject(StorageRecordsService)
    private readonly storageRecordsService: StorageRecordsService;

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORDS_LIST)
    @Validate(FindRecordsListDto)
    async findMany(payload: FindRecordsListDto): Promise<StorageRecordSchema[] | PaginatedResponse<StorageRecordSchema>> {
        if(payload.page && payload.limit) {
            const { page, limit, ...data } = payload;
            return this.storageRecordsService.findManyWithPagination(data, { page, limit });
        }

        return this.storageRecordsService.findMany(payload);
    }

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORD)
    @Validate(FindRecordDto)
    async findOne(payload: FindRecordDto): Promise<StorageRecordSchema | undefined> {
        return await this.storageRecordsService.findOneById(payload.id);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_STORAGE_RECORD)
    @Validate(AddRecordDto)
    async createOne(payload: AddRecordDto): Promise<StorageRecordSchema> {
        return await this.storageRecordsService.createOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE_RECORD)
    @Validate(UpdateRecordDto)
    async updateOne(payload: UpdateRecordDto): Promise<StorageRecordSchema | undefined> {
        return await this.storageRecordsService.updateOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_RECORD)
    @Validate(RemoveRecordDto)
    async removeOne(payload: RemoveRecordDto): Promise<void> {
        await this.storageRecordsService.removeOne(payload.id);
    }

}
