import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageRecord } from './interfaces/storage-record.model';
import { FilterQuery } from 'mongodb';
import { IStorageRecord, PaginatedResponse } from '@astra/common';
import { PaginationDto } from '@astra/common/dto';

@Injectable()
export class StorageRecordsRepository {

    constructor(
      @InjectModel('StorageRecord')
      private readonly storageRecordsModel: Model<StorageRecord>,
    ) {}

    async findMany(query: FilterQuery<IStorageRecord>): Promise<StorageRecord[]> {
      return this.storageRecordsModel.find(query);
    }

    async findManyWithPagination(query: FilterQuery<IStorageRecord>, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecord>> {
      const [data, count] = await Promise.all([
        this.storageRecordsModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit),
        this.storageRecordsModel.count(query),
      ]);

      return {
        data,
        itemsPerPage: limit,
        page,
        totalCount: count,
      };
    }

    async findById(id: string): Promise<StorageRecord | undefined> {
      return this.storageRecordsModel.findById(id);
    }

    async createOne(data: Partial<IStorageRecord>): Promise<StorageRecord> {
      const newRecord = new this.storageRecordsModel({
        ...data,
      });
      return await newRecord.save();
    }

    async updateById(id: string, data: Partial<IStorageRecord>): Promise<StorageRecord | undefined> {
      return this.storageRecordsModel.findOneAndUpdate({ _id: id }, { data }, { new: true });
    }

    async removeById(id: string): Promise<void> {
      await this.storageRecordsModel.deleteOne(id);
    }
}