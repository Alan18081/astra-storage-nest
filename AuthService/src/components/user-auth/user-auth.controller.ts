import {Controller} from '@nestjs/common';
import {UserAuthService} from './user-auth.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes} from '@astra/common';
import { JwtResponse } from '@astra/common';
import {ExchangeTokenDto, LoginDto} from '@astra/common/dto';

@Controller()
export class UserAuthController {

    constructor(
       private readonly usersAuthService: UserAuthService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.LOGIN })
    async login(dto: LoginDto): Promise<JwtResponse> {
        return this.usersAuthService.login(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.EXCHANGE_TOKEN })
    async exchangeToken(dto: ExchangeTokenDto): Promise<JwtResponse> {
        return this.usersAuthService.exchangeToken(dto.refreshToken);
    }
}