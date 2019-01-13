import {AuthModule} from '../auth/auth.module';
import {ProjectAccountsController} from './project-accounts.controller';
import {Module} from '@nestjs/common';
import {ProjectAccountsService} from './project-accounts.service';

@Module({
    imports: [AuthModule],
    controllers: [ProjectAccountsController],
    providers: [ProjectAccountsService]
})
export class ProjectAccountsModule {}