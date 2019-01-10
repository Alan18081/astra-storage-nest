import {Controller, NotFoundException} from '@nestjs/common';
import {RefreshTokensService} from './refresh-tokens.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes, CreateRefreshTokenDto, Messages} from '@astra/common';
import {RefreshToken} from './refresh-token.entity';
import { UsersRepository } from '../users/users.repository';

@Controller()
export class RefreshTokensController {

    constructor(
       private readonly refreshTokensService: RefreshTokensService,
       private readonly usersRepository: UsersRepository,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.CREATE_REFRESH_TOKEN })
    async createOne(dto: CreateRefreshTokenDto): Promise<RefreshToken> {
        if (!(await this.usersRepository.findById(dto.userId))) {
            throw new NotFoundException(Messages.USER_NOT_FOUND);
        }

        return this.refreshTokensService.createOne(dto);
    }

}