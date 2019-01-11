import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageRecordsService } from './storage-records.service';
import { StorageRecordsRepository } from './storage-records.repository';
import { StorageRecordsController } from './storage-records.controller';
import { StorageRecordSchema } from './storage-record.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'StorageRecord', schema: StorageRecordSchema }]),
    ],
    providers: [StorageRecordsService, StorageRecordsRepository],
    controllers: [StorageRecordsController],
})
export class StorageRecordsModule {}