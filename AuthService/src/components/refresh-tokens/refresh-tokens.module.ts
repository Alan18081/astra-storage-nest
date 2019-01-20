import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshToken } from './refresh-token.entity';
import { JWT_EXPIRES, JWT_SECRET } from '@astra/common';
import {RefreshTokensRepository} from './refresh-tokens.repository';
import {RefreshTokensController} from './refresh-tokens.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, RefreshTokensRepository]),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  controllers: [RefreshTokensController],
  exports: [RefreshTokensService],
  providers: [RefreshTokensService]
})
export class RefreshTokensModule {}