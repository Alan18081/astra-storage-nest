import { PaginatedResponse } from '@astra/common/interfaces';
import { PaginationDto } from '@astra/common/dto';
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
      return this.findOne(id);
    }

    async updateOneAndFind(id: string, data: Partial<StorageRecord>): Promise<StorageRecord | undefined> {
      const result = await this.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { data }});
      return result.value;
    }

    async removeById(id: string): Promise<void> {
      await this.deleteOne({ _id: new ObjectId(id) });
    }
}