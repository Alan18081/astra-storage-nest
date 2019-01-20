import { Module } from '@nestjs/common';
import { EmailSendingController } from './email.sending.controller';
import {EmailSendingService} from './email-sending.service';
import {EmailTemplatesService} from './email-templates.service';

@Module({
    controllers: [EmailSendingController],
    providers: [
        EmailSendingService,
        EmailTemplatesService,
    ],
})
export class EmailSendingModule {}