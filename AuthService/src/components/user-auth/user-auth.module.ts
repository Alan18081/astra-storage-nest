import {Module} from '@nestjs/common';
import {UserAuthController} from './user-auth.controller';
import {UserAuthService} from './user-auth.service';
import {CoreModule} from '../core/core.module';
import {RefreshTokensModule} from '../refresh-tokens/refresh-tokens.module';
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";

@Module({
    imports: [
        CustomJwtModule,
        CoreModule,
        RefreshTokensModule,
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService],
})
export class UserAuthModule {}