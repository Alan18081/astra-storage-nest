import { Module } from '@nestjs/common';
import { SerializerService } from '@astra/common/services';
import {SocketDataEmitterService} from './socket-data-emitter.service';

@Module({
  providers: [SerializerService, SocketDataEmitterService],
  exports: [SerializerService, SocketDataEmitterService],
})
export class CoreModule {}