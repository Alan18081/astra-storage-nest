import { Module } from '@nestjs/common';
import { StorageRecordsGateway } from './storage-records.gateway';
import { StorageRecordsController } from './storage-records.controller';

@Module({
  controllers: [StorageRecordsController],
  providers: [StorageRecordsGateway],
})
export class StorageRecordsModule {}