import {Module} from '@nestjs/common';
import {HashService} from '@astra/common/services';

@Module({
    providers: [HashService],
    exports: [HashService],
})
export class CoreModule {}
