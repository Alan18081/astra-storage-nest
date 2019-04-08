import {Module} from '@nestjs/common';
import {HashService, ConfigService} from '@bit/alan18081.astra-storage.common.dist/services';

const providers = [
    HashService,
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
