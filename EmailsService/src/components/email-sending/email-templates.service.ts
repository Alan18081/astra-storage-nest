import {Injectable} from '@nestjs/common';
import {compileFile, compileTemplate} from 'pug';
import {join} from 'path';
import { EmailsServiceConfig } from '@bit/alan18081.astra-storage.common.dist/config';

@Injectable()
export class EmailTemplatesService {

    renderResetPasswordTemplate(data: object): string {
        return this.renderTemplate('reset-password')(data);
    }

    renderEmailVerificationTemplate(data: object): string {
        return this.renderTemplate('email-verification')(data);
    }

    private renderTemplate(filename: string): compileTemplate {
        return compileFile(join(`./src/${EmailsServiceConfig.EMAIL_TEMPLATES_FOLDER}`, `${filename}.pug`));
    }

    createSubject(title: string): string {
        return `${EmailsServiceConfig.APP_NAME} ${title}`;
    }

}