import {Global, Module} from "@nestjs/common";
import {ConfigService} from "@astra/common/services";

const providers = [
    {
        provide: ConfigService,
        useValue: new ConfigService(`${process.env.NODE_ENV}.env`)
    }
];

@Global()
@Module({
    imports: [],
    providers: [...providers],
    exports: [...providers],
    controllers: []
})
export class CoreModule {}