import { Test } from '@nestjs/testing';
import {EmailSendingService} from '../email-sending.service';
import {EmailTemplatesService} from '../email-templates.service';
import {mockEmailTemplatesService, mockSgEmail} from './mocks';
import {SendResetPasswordEmailDto} from '@astra/common/dto';
import {EmailsServiceConfig} from '@astra/common';
import {Email} from '../email';

describe('StorageRecordsService', () => {
  let emailSendingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailSendingService,
        { provide: EmailTemplatesService, useValue: mockEmailTemplatesService },
      ],
    }).compile();

    emailSendingService = module.get<EmailSendingService>(EmailSendingService);
    emailSendingService.sgEmail = mockSgEmail;
  });

  describe('', () => {
     const payload: SendResetPasswordEmailDto = {
       firstName: 'Alex',
       lastName: 'Morgan',
       email: 'alan@gmail.com',
       hash: 'new hash',
     };

     const html = '<h1>Some html template</h1>';
     const subject = '<h2>Title</h2>';

     it('should call emailTemplatesService.renderResetPasswordTemplate', async () => {
        const spy = jest.spyOn(mockEmailTemplatesService, 'renderResetPasswordTemplate').mockImplementation(async () => html);
        await emailSendingService.sendResetPasswordEmail(payload);
        expect(spy).toBeCalledWith({
            firstName: payload.firstName,
            lastName: payload.lastName,
            link: `${EmailsServiceConfig.APP_URL}/resetPassword/hash/${payload.hash}`,
        });
     });

     it('should call sgEmail.send', async () => {
        jest.spyOn(mockEmailTemplatesService, 'renderResetPasswordTemplate').mockImplementation( () => html);
        jest.spyOn(mockEmailTemplatesService, 'createSubject').mockImplementation(  () => subject);
        const spy = jest.spyOn(mockSgEmail, 'send').mockImplementation(async () => {});
        await emailSendingService.sendResetPasswordEmail(payload);
        expect(spy).toBeCalledWith(new Email(
            EmailsServiceConfig.APP_EMAIL,
            payload.email,
            subject,
            html,
        ));
     });
  });
});