import { Module } from '@nestjs/common';
import { StorageRecordsController } from './storage-records.controller';
import { AuthModule } from '../auth/auth.module';
import {StorageRecordsService} from './storage-records.service';

@Module({
  imports: [AuthModule],
  controllers: [StorageRecordsController],
  providers: [StorageRecordsService],
})
export class StorageRecordsModule {}
