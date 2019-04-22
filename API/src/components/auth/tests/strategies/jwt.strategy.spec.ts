import { Test } from '@nestjs/testing';
import {mockUser, mockUsersService} from '../mocks';
import {UsersServiceOld} from '../../../users/users.service.old';
import {JwtStrategy} from '../../strategies/jwt.strategy';
import {UnauthorizedException} from '@nestjs/common';
import {Messages} from '@astra/common';

describe('JwtStrategy', () => {
    let jwtStrategy;

    beforeEach(async () => {
       const module = await Test.createTestingModule({
          providers: [
              JwtStrategy,
              { provide: UsersServiceOld, useValue: mockUsersService },
          ],
       }).compile();

       jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
   });

   describe('validate', () => {
       const payload = {
           id: 12,
           email: 'alan@gmail.com',
       }

      it('should call authService.validateUser', async () => {
        const spy = jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(async () => mockUser);
        await jwtStrategy.validate(payload);
        expect(spy).toBeCalledWith(payload.email);
      });

      it('should throw an exception if user is not found', async () => {
        jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(async () => undefined);
        try {
          await jwtStrategy.validate(payload);
          expect(false);
        } catch (e) {
          expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.INVALID_TOKEN)));
        }
      });

       it('should return found user', async () => {
           const spy = jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(async () => mockUser);
           expect(await jwtStrategy.validate(payload)).toEqual(mockUser);
       });

   });

});