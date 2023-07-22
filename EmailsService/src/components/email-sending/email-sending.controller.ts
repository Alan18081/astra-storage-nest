import {Controller, UseFilters} from '@nestjs/common';
import {ServiceExceptionFilter} from 'astra-common';
import {EmailSendingService} from './email-sending.service';
import {CommunicationCodes} from 'astra-common';
import {MessagePattern} from '@nestjs/microservices';
import {SendResetPasswordEmailDto} from 'astra-common';

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
