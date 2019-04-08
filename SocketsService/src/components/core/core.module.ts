import { Module } from '@nestjs/common';
import { ClientsStoreService } from './clients-store.service';
import {ConfigService} from "@bit/alan18081.astra-storage.common.dist/services";

const providers = [
  ClientsStoreService,
  {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
  }
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule {}