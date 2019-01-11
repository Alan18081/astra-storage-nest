import { StorageRecordsRepository } from './storage-records.repository';
import {PaginatedResponse} from '../../../../Common/dist/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageRecordsService {

    @inject(StorageRecordsRepository)
    private readonly storageRecordsRepository: StorageRecordsRepository;

    async findOneById(id: string): Promise<StorageRecordSchema> {
        return await this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindRecordsListDto): Promise<StorageRecordSchema[]> {
        return await this.storageRecordsRepository.find(query);
    }

    async findManyWithPagination(query: FindRecordsListDto, pagination: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecordSchema>> {
        return await this.storageRecordsRepository.findManyWithPagination(query, pagination);
    }

    async updateOne({ data, id }: UpdateRecordDto): Promise<StorageRecordSchema | undefined> {
      return await this.storageRecordsRepository.updateById(id, { $set: { data } });
    }

    async createOne(payload: Partial<StorageRecordSchema>): Promise<StorageRecordSchema> {
        const newStorageRecord = new StorageRecordSchema({...payload});

        return await this.storageRecordsRepository.save(newStorageRecord);
    }

    async removeOne(recordId: string): Promise<void> {
        await this.storageRecordsRepository.deleteById(recordId);
    }

}