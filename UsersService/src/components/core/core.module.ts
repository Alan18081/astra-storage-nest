import {Module} from '@nestjs/common';
import {ConfigService, HashService} from '@astra/common/services';

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