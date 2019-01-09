import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import { Repository } from 'typeorm';
import { CreateRefreshTokenInterface } from './interfaces/create-refresh-token.interface';

@Injectable()
export class RefreshTokensService {

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUserId(userId: number): Promise<RefreshToken | undefined> {
    return await this.refreshTokensRepository.findOne({ userId });
  }

  async findOneByToken(token: string): Promise<RefreshToken | undefined> {
    return await this.refreshTokensRepository.findOne({ token }, { relations: ['user'] });
  }

  async createOne(payload: CreateRefreshTokenInterface): Promise<RefreshToken> {
    const { accessToken, userId } = payload;
    const token = this.jwtService.sign({ accessToken, userId });

    const refreshToken = new RefreshToken();
    refreshToken.token = token;
    refreshToken.userId = userId;

    return await this.refreshTokensRepository.save(refreshToken);
  }

  async deleteOne(id: number): Promise<void> {
    await this.refreshTokensRepository.delete({ id });
  }

}