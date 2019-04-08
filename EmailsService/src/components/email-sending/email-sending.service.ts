import {Injectable} from '@nestjs/common';
import * as sgEmail from '@sendgrid/mail';
import {SendResetPasswordEmailDto} from '../../../../Common/src/dto/emails';
import {Email} from './email';
import {EmailTemplatesService} from './email-templates.service';
import {ConfigService} from "@astra/common/services";

@Injectable()
export class EmailSendingService {

    private readonly sgEmail = sgEmail;

    constructor(
        private readonly emailTemplatesService: EmailTemplatesService,
        private readonly configService: ConfigService,
    ) {
        this.sgEmail.setApiKey(configService.get('SENDGRID_API_KEY'));
    }

    async sendResetPasswordEmail({ firstName, lastName, email, hash }: SendResetPasswordEmailDto): Promise<void> {
        const html = this.emailTemplatesService.renderResetPasswordTemplate({
            firstName,
            lastName,
            link: `${this.configService.get('APP_URL')}/resetPassword/hash/${hash}`,
        });
        await this.sgEmail.send(
            new Email(
                this.configService.get('APP_EMAIL'),
                email,
                this.emailTemplatesService.createSubject('Reset password email'),
                html,
            ));
    }



}