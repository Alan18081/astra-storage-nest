import {Controller, NotFoundException} from '@nestjs/common';
import {RefreshTokensService} from './refresh-tokens.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes, CreateRefreshTokenDto, Messages} from '@astra/common';
import {RefreshToken} from './refresh-token.entity';
import {UsersService} from '../users/users.service';

@Controller()
export class RefreshTokensController {

    constructor(
       private readonly refreshTokensService: RefreshTokensService,
       private readonly usersService: UsersService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.CREATE_REFRESH_TOKEN })
    async createOne(dto: CreateRefreshTokenDto): Promise<RefreshToken> {
        const user = await this.usersService.findOneById(dto.userId);

        if(!user) {
            throw new NotFoundException(Messages.USER_NOT_FOUND);
        }

        return await this.refreshTokensService.createOne(dto);
    }

}