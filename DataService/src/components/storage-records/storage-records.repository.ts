import { PaginatedResponse } from 'astra-common';
import { PaginationDto } from 'astra-common';
import {EntityRepository, MongoRepository} from 'typeorm';
import { StorageRecord } from './storage-record.entity';
import {ObjectId} from 'mongodb';

@EntityRepository(StorageRecord)
export class StorageRecordsRepository extends MongoRepository<StorageRecord> {

    async findMany(query: Partial<StorageRecord>): Promise<StorageRecord[]> {
      return this.find(query);
    }

    async findManyWithPagination(query: Partial<StorageRecord>, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecord>> {
      const [data, count] = await this.findAndCount({
          where: query,
          skip: (page - 1) * limit,
          take: limit,
      });

      return {
        data,
        itemsPerPage: limit,
        page,
        totalCount: count,
      };
    }

    async findById(id: string): Promise<StorageRecord | undefined> {
      return this.findOne({ where: { id } });
    }

    async updateOneAndFind(id: string, data: Partial<StorageRecord>): Promise<StorageRecord | undefined> {
      await this.updateOne({ _id: new ObjectId(id) }, { $set: { data }});
      return this.findById(id);
    }

    async removeById(id: string): Promise<void> {
      await this.deleteOne({ _id: new ObjectId(id) });
    }

    async removeByStorage(storageId: number): Promise<void> {
      await this.deleteMany({ storageId });
    }
}
