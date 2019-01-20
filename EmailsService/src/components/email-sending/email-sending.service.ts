import {Injectable} from '@nestjs/common';
import * as sgEmail from '@sendgrid/mail';
import {EmailsServiceConfig} from '@astra/common';
import {SendResetPasswordEmailDto} from '../../../../Common/src/dto/emails';
import {Email} from './email';
import {EmailTemplatesService} from './email-templates.service';

@Injectable()
export class EmailSendingService {

    constructor(
        private readonly emailTemplatesService: EmailTemplatesService,
    ) {
        sgEmail.setApiKey(EmailsServiceConfig.SENDGRID_API_KEY);
    }

    async sendResetPasswordEmail({ firstName, lastName, email, hash }: SendResetPasswordEmailDto): Promise<void> {
        const html = this.emailTemplatesService.renderResetPasswordTemplate({
            firstName,
            lastName,
            link: `${EmailsServiceConfig.APP_URL}/resetPassword/hash/${hash}`,
        });
        await sgEmail.send(
            new Email(
                EmailsServiceConfig.APP_EMAIL,
                email,
                this.emailTemplatesService.createSubject('Reset password email'),
                html,
            ));
    }



}