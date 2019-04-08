import {Controller, UseFilters} from '@nestjs/common';
import {ServiceExceptionFilter} from '@bit/alan18081.astra-storage.common.dist/filters';
import {EmailSendingService} from './email-sending.service';
import {CommunicationCodes} from '@bit/alan18081.astra-storage.common.dist';
import {MessagePattern} from '@nestjs/microservices';
import {SendResetPasswordEmailDto} from '@bit/alan18081.astra-storage.common.dist/dto';

@Controller()
@UseFilters(ServiceExceptionFilter)
export class EmailSendingController {

    constructor(
       private readonly emailSendingService: EmailSendingService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.SEND_RESET_PASSWORD_EMAIL })
    async sendResetPasswordEmail(dto: SendResetPasswordEmailDto): Promise<void> {
        await this.emailSendingService.sendResetPasswordEmail(dto);
    }

}