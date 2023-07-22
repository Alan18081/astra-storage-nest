import { Test } from '@nestjs/testing';
import {mockProjectAccount, mockProjectAccountsService} from '../mocks';
import {UnauthorizedException} from '@nestjs/common';
import {Messages} from 'astra-common';
import {JwtProjectAccountStrategy} from '../../strategies/jwt-project-account.strategy';
import {ProjectAccountsService} from '../../../project-accounts/project-accounts.service';

describe('JwtProjectAccountStrategy', () => {
    let jwtProjectAccountStrategy;

    beforeEach(async () => {
       const module = await Test.createTestingModule({
          providers: [
              JwtProjectAccountStrategy,
              { provide: ProjectAccountsService, useValue: mockProjectAccountsService    },
          ],
       }).compile();

       jwtProjectAccountStrategy = module.get<JwtProjectAccountStrategy>(JwtProjectAccountStrategy);
   });

   describe('validate', () => {
       let req;
       const payload = {
           id: mockProjectAccount.id,
           email: mockProjectAccount.email,
           projectId: mockProjectAccount.projectId,
           ownerId: mockProjectAccount.ownerId,
       };

       beforeEach(() => {
          req = {
              projectAccount: undefined,
          };
       });

      it('should call projectsService.findOneByClientInfo', async () => {
        const spy = jest.spyOn(mockProjectAccountsService, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
        await jwtProjectAccountStrategy.validate(req, payload);
        expect(spy).toBeCalledWith(payload.projectId, payload.email, payload.ownerId);
      });

      it('should throw an exception if project account is not found', async () => {
        jest.spyOn(mockProjectAccountsService, 'findOneByEmail').mockImplementation(async () => undefined);
        try {
          await jwtProjectAccountStrategy.validate(req, payload);
          expect(false);
        } catch (e) {
          expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.INVALID_TOKEN)));
        }
      });

       it('should set project property on request', async () => {
           jest.spyOn(mockProjectAccountsService, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
           await jwtProjectAccountStrategy.validate(req, payload);
           expect(req.projectAccount).toEqual(mockProjectAccount);
       });

       it('should return found project', async () => {
           jest.spyOn(mockProjectAccountsService, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
           expect(await jwtProjectAccountStrategy.validate(req, payload)).toEqual(mockProjectAccount);
       });

   });

});
