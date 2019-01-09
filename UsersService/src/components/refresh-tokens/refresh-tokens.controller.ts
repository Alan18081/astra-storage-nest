import {Controller} from '@nestjs/common';
import {RefreshTokensService} from './refresh-tokens.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes} from '@astra/common';
import {RefreshToken} from './refresh-token.entity';

@Controller()
export class RefreshTokensController {

    constructor(
       private readonly refreshTokensService: RefreshTokensService
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.CREATE_REFRESH_TOKEN })
    async createOne(): Promise<RefreshToken> {

    }

}