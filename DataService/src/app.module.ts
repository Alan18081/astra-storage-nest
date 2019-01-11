import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageRecordsModule } from './components/storage-records/storage-records.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/as_data_service'),
    StorageRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
