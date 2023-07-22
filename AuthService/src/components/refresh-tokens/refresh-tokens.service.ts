import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import {RefreshTokensRepository} from './refresh-tokens.repository';
import {CreateRefreshTokenDto} from 'astra-common';

@Injectable()
export class RefreshTokensService {

  constructor(
    @InjectRepository(RefreshTokensRepository)
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createOne({ accessToken, userId }: CreateRefreshTokenDto): Promise<RefreshToken> {

      const foundRefreshToken = await this.refreshTokensRepository.findOneByUserId(userId);
      if (foundRefreshToken) {
         return foundRefreshToken;
      }

      const token = this.jwtService.sign({ accessToken, userId });

      const refreshToken = new RefreshToken();
      refreshToken.token = token;
      refreshToken.userId = userId;

      return this.refreshTokensRepository.save(refreshToken);
  }

  async findOneByToken(token: string): Promise<RefreshToken | undefined> {
      return this.refreshTokensRepository.findOneByToken(token);
  }

  async removeById(id: number): Promise<void> {
      await this.refreshTokensRepository.removeById(id);
  }

}
