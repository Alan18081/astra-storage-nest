import {Module} from '@nestjs/common';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';

@Module({
    providers: [HashService],
    exports: [HashService],
})
export class CoreModule {}