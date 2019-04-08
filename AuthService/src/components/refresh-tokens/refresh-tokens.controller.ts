import {Controller} from '@nestjs/common';
import {RefreshTokensService} from './refresh-tokens.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes} from '@bit/alan18081.astra-storage.common.dist';
import {RefreshToken} from './refresh-token.entity';
import {CreateRefreshTokenDto} from '@bit/alan18081.astra-storage.common.dist/dto';

@Controller()
export class RefreshTokensController {

    constructor(
       private readonly refreshTokensService: RefreshTokensService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.CREATE_REFRESH_TOKEN })
    async createOne(dto: CreateRefreshTokenDto): Promise<RefreshToken> {
        return this.refreshTokensService.createOne(dto);
    }

}