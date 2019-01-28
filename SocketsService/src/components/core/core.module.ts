import { Module } from '@nestjs/common';
import { ClientsStoreService } from './clients-store.service';

@Module({
  providers: [ClientsStoreService],
  exports: [ClientsStoreService],
})
export class CoreModule {}