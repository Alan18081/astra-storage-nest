import {Controller, UseFilters} from '@nestjs/common';
import {CommunicationCodes, ServiceExceptionFilter} from '@astra/common';
import {UserHashesService} from './user-hashes.service';
import {MessagePattern} from '@nestjs/microservices';
import {VerifyUserHashDto} from '@astra/common/dto';

@Controller()
export class UserHashesController {

    constructor(
       private readonly userHashesService: UserHashesService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.VERIFY_RESET_PASSWORD_HASH })
    async verifyResetPasswordHash(dto: VerifyUserHashDto): Promise<boolean> {
        return this.userHashesService.verifyResetPasswordHash(dto.hash);
    }

}