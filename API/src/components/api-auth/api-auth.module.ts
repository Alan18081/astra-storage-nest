import {AuthModule} from '../auth/auth.module';
import {ApiAuthController} from './api-auth.controller';
import {Module} from '@nestjs/common';
import {ApiAuthService} from './api-auth.service';

@Module({
    imports: [AuthModule],
    controllers: [ApiAuthController],
    providers: [
        ApiAuthService,
    ],
})
export class ApiAuthModule {}