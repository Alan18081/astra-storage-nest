import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import { Repository } from 'typeorm';
import { CreateRefreshTokenInterface } from './interfaces/create-refresh-token.interface';
import {RefreshTokensRepository} from './refresh-tokens.repository';
import {CreateRefreshTokenDto} from '@astra/common';

@Injectable()
export class RefreshTokensService {

  constructor(
    @InjectRepository(RefreshTokensRepository)
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUserId(userId: number): Promise<RefreshToken | undefined> {
    return await this.refreshTokensRepository.findOneByUserId(userId);
  }

  async findOneByToken(token: string): Promise<RefreshToken | undefined> {
    return await this.refreshTokensRepository.findOneByToken(token);
  }

  async createOne(dto: CreateRefreshTokenDto): Promise<RefreshToken> {
    const { accessToken, userId } = dto;



    const token = this.jwtService.sign({ accessToken, userId });

    const refreshToken = new RefreshToken();
    refreshToken.token = token;
    refreshToken.userId = userId;

    return await this.refreshTokensRepository.save(refreshToken);
  }

  async deleteOne(id: number): Promise<void> {
    await this.refreshTokensRepository.deleteOne(id);
  }

}