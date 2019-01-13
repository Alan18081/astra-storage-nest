import {Module} from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {JWT_EXPIRES, JWT_SECRET} from '@astra/common';
// import {GoogleStrategy} from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
        secretOrPrivateKey: JWT_SECRET,
        signOptions: {
            expiresIn: JWT_EXPIRES,
        },
    }),
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [
      AuthService,
      JwtStrategy,
  ],
})
export class AuthModule {}