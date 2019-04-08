import { Module } from '@nestjs/common';
import {ConfigService, SerializerService} from '@bit/alan18081.astra-storage.common.dist/services';
import {SocketDataEmitterService} from './socket-data-emitter.service';

const providers = [
    SerializerService,
    SocketDataEmitterService,
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