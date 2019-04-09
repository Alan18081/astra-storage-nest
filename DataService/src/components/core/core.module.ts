import {Global, Module} from '@nestjs/common';
import {ConfigService, SerializerService} from '@astra/common/services';
import {SocketDataEmitterService} from './socket-data-emitter.service';

const providers = [
    SerializerService,
    SocketDataEmitterService,
    {
        provide: ConfigService,
        useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
    }
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule {}