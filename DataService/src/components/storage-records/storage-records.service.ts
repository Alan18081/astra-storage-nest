import { StorageRecordsRepository } from './storage-records.repository';
import {PaginatedResponse} from '../../../../Common/dist/interfaces';
import { Injectable } from '@nestjs/common';
import { StorageRecord } from './storage-record.entity';
import { FindStorageRecordsListDto, PaginationDto, UpdateStorageRecordDto } from '@astra/common/dto';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class StorageRecordsService {
    constructor(
      @InjectRepository(StorageRecordsRepository)
      private readonly storageRecordsRepository: StorageRecordsRepository,
    ) {}

    async findById(id: string): Promise<StorageRecord> {
        return this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindStorageRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        if (query.page && query.limit) {
            const { page, limit, ...data } = query;
            return this.storageRecordsRepository.findManyWithPagination(data, { page, limit });
        }

        return this.storageRecordsRepository.findMany(query);
    }

    async updateOne(id: string, data: any): Promise<StorageRecord | undefined> {
      return this.storageRecordsRepository.updateOneAndFind(id, data);
    }

    async createOne(payload: Partial<StorageRecord>): Promise<StorageRecord> {
        const newRecord = new StorageRecord(payload);
        return this.storageRecordsRepository.save(newRecord);
    }

    async removeById(recordId: string): Promise<void> {
        await this.storageRecordsRepository.removeById(recordId);
    }

}