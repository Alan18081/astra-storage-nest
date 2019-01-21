import {ProjectAccountsController} from './project-accounts.controller';
import {Module} from '@nestjs/common';
import {ProjectAccountsService} from './project-accounts.service';

@Module({
    controllers: [ProjectAccountsController],
    providers: [ProjectAccountsService],
    exports: [ProjectAccountsService],
})
export class ProjectAccountsModule {}