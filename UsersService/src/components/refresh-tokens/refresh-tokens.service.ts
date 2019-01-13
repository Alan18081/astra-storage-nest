import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import {RefreshTokensRepository} from './refresh-tokens.repository';
import {CreateRefreshTokenDto} from '@astra/common/dto';
import {UsersService} from '../users/users.service';
import {Messages} from '@astra/common';
import {RpcException} from '@nestjs/microservices';

@Injectable()
export class RefreshTokensService {

  constructor(
    @InjectRepository(RefreshTokensRepository)
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createOne({ accessToken, userId }: CreateRefreshTokenDto): Promise<RefreshToken> {
      if (!(await this.usersService.findById(userId))) {
          throw new RpcException(Messages.USER_NOT_FOUND);
      }

      const foundRefreshToken = await this.refreshTokensRepository.findOneByUserId(userId);
      if (foundRefreshToken) {
         return foundRefreshToken;
      }

      const token = this.jwtService.sign({ accessToken, userId });

      const refreshToken = new RefreshToken();
      refreshToken.token = token;
      refreshToken.userId = userId;

      return await this.refreshTokensRepository.save(refreshToken);
  }

}