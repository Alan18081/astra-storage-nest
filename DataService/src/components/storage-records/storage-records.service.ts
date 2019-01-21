import { StorageRecordsRepository } from './storage-records.repository';
import {PaginatedResponse} from '../../../../Common/dist/interfaces';
import { Injectable } from '@nestjs/common';
import { StorageRecord } from './interfaces/storage-record.model';
import { FindStorageRecordsListDto, PaginationDto, UpdateStorageRecordDto } from '@astra/common/dto';

@Injectable()
export class StorageRecordsService {
    constructor(
      private readonly storageRecordsRepository: StorageRecordsRepository,
    ) {}

    async findOneById(id: string): Promise<StorageRecord> {
        return this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindStorageRecordsListDto): Promise<StorageRecord[]> {
        return this.storageRecordsRepository.findMany(query);
    }

    async findManyWithPagination(query: FindStorageRecordsListDto, pagination: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecord>> {
        return this.storageRecordsRepository.findManyWithPagination(query, pagination);
    }

    async updateOne({ data, id }: UpdateStorageRecordDto): Promise<StorageRecord | undefined> {
      return this.storageRecordsRepository.updateById(id, data);
    }

    async createOne(payload: Partial<StorageRecord>): Promise<StorageRecord> {
        return this.storageRecordsRepository.createOne(payload);
    }

    async removeOne(recordId: string): Promise<void> {
        await this.storageRecordsRepository.removeById(recordId);
    }

}