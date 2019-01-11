import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageRecordModel } from './interfaces/storage-record.model';
import { FilterQuery } from 'mongodb';
import { IStorageRecord } from '@astra/common';

@Injectable()
export class StorageRecordsRepository {

    constructor(
      @InjectModel('StorageRecord')
      private readonly storageRecordsModel: Model<StorageRecordModel>,
    ) {}

    async findMany(query: FilterQuery<IStorageRecord>): Promise<StorageRecordModel[]> {
      return this.storageRecordsModel.find(query);
    }

    async createOne(data: Partial<IStorageRecord>): Promise<StorageRecordModel> {

    }
}