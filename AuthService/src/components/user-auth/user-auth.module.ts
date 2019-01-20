import {Module} from '@nestjs/common';
import {UserAuthController} from './user-auth.controller';
import {UserAuthService} from './user-auth.service';
import {JwtModule} from '@nestjs/jwt';
import {JWT_EXPIRES, JWT_SECRET} from '@astra/common';
import {CoreModule} from '../core/core.module';
import {RefreshTokensModule} from '../refresh-tokens/refresh-tokens.module';

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: JWT_SECRET,
            signOptions: {
                expiresIn: JWT_EXPIRES,
            },
        }),
        CoreModule,
        RefreshTokensModule,
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService],
})
export class UserAuthModule {}