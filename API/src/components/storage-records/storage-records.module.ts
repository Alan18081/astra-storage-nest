import { Module } from '@nestjs/common';
import { StorageRecordsController } from './storage-records.controller';
import { AuthModule } from '../auth/auth.module';
import {StorageRecordsService} from './storage-records.service';
import {StoragesModule} from '../storages/storages.module';

@Module({
  imports: [AuthModule, StoragesModule],
  controllers: [StorageRecordsController],
  providers: [StorageRecordsService],
})
export class StorageRecordsModule {}
