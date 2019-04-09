import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshToken } from './refresh-token.entity';
import {RefreshTokensRepository} from './refresh-tokens.repository';
import {RefreshTokensController} from './refresh-tokens.controller';
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, RefreshTokensRepository]),
    CustomJwtModule,
  ],
  controllers: [RefreshTokensController],
  exports: [RefreshTokensService],
  providers: [RefreshTokensService]
})
export class RefreshTokensModule {}