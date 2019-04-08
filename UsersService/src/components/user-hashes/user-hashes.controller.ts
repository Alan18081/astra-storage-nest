import {Controller, UseFilters} from '@nestjs/common';
import {CommunicationCodes} from '@bit/alan18081.astra-storage.common.dist';
import {UserHashesService} from './user-hashes.service';
import {MessagePattern} from '@nestjs/microservices';
import {VerifyUserHashDto} from '@bit/alan18081.astra-storage.common.dist/dto';

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