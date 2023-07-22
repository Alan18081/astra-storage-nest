import {Global, Module} from '@nestjs/common';
import {ConfigService} from "astra-common";

const providers = [
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
