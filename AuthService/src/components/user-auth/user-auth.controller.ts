import {Controller} from '@nestjs/common';
import {UserAuthService} from './user-auth.service';
import {MessagePattern} from '@nestjs/microservices';
import {CommunicationCodes, LoginDto} from '@astra/common';
import { JwtResponse } from '@astra/common';

@Controller()
export class UserAuthController {

    constructor(
       private readonly usersAuthService: UserAuthService
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.LOGIN })
    async login(dto: LoginDto): Promise<JwtResponse> {
        return await this.usersAuthService.login(dto);
    }

}