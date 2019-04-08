import {Controller} from '@nestjs/common';
import {UserAuthService} from './user-auth.service';
import {MessagePattern} from '@nestjs/microservices';
import { CommunicationCodes } from '@bit/alan18081.astra-storage.common.dist/enums';
import { JwtUserResponse } from '@bit/alan18081.astra-storage.common.dist/interfaces';
import {ExchangeTokenDto, LoginByGoogleDto, LoginDto} from '@bit/alan18081.astra-storage.common.dist/dto';

@Controller()
export class UserAuthController {

    constructor(
       private readonly usersAuthService: UserAuthService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.LOGIN })
    async login(dto: LoginDto): Promise<JwtUserResponse> {
        return this.usersAuthService.login(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.LOGIN_BY_GOOGLE })
    async loginByGoogle(dto: LoginByGoogleDto): Promise<JwtUserResponse> {
        return this.usersAuthService.loginByGoogle(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.EXCHANGE_TOKEN })
    async exchangeToken(dto: ExchangeTokenDto): Promise<JwtUserResponse> {
        return this.usersAuthService.exchangeToken(dto.refreshToken);
    }

}