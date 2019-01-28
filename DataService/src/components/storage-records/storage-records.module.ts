import { Module } from '@nestjs/common';
import { StorageRecordsService } from './storage-records.service';
import { StorageRecordsRepository } from './storage-records.repository';
import { StorageRecordsController } from './storage-records.controller';
import {SdkStorageRecordsController} from './sdk-storage-records.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {StorageRecord} from './storage-record.entity';
import { CoreModule } from '../core/core.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([StorageRecord, StorageRecordsRepository]),
      CoreModule,
    ],
    providers: [StorageRecordsService],
    controllers: [StorageRecordsController, SdkStorageRecordsController],
})
export class StorageRecordsModule {}