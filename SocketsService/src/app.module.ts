import { Module } from '@nestjs/common';
import { StorageRecordsModule } from './components/storage-records/storage-records.module';
import { AppGateway } from './app.gateway';
import { CoreModule } from './components/core/core.module';

@Module({
  imports: [
    CoreModule,
    StorageRecordsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
