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

    async findOneById(id: string): Promise<StorageRecord> {
        return this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindStorageRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        if (query.page && query.limit) {
            const { page, limit, ...data } = query;
            return this.findWithPagination(data, { page, limit });
        }

        return this.find(query);
    }

    private async find(query: FindStorageRecordsListDto): Promise<StorageRecord[]> {
        return this.storageRecordsRepository.findMany(query);
    }

    private async findWithPagination(query: FindStorageRecordsListDto, pagination: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecord>> {
        return this.storageRecordsRepository.findManyWithPagination(query, pagination);
    }

    async updateOne({ data, id }: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
      return this.storageRecordsRepository.updateById(id, data);
    }

    async createOne(payload: Partial<StorageRecord>): Promise<StorageRecord> {
        const newRecord = new StorageRecord(payload);
        return this.storageRecordsRepository.save(newRecord);
    }

    async removeOne(recordId: string): Promise<void> {
        await this.storageRecordsRepository.removeById(recordId);
    }

}