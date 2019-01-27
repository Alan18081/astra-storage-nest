import { Test } from '@nestjs/testing';
import {GoogleStrategy} from '../../strategies/google.strategy';
import {UsersService} from '../../../users/users.service';
import {mockUser, mockUsersService} from '../mocks';

describe('GoogleStrategy', () => {
    let googleStrategy;

    beforeEach(async () => {
       const module = await Test.createTestingModule({
          providers: [
              GoogleStrategy,
              { provide: UsersService, useValue: mockUsersService },
          ],
       }).compile();

       googleStrategy = module.get<GoogleStrategy>(GoogleStrategy);
   });

   describe('validate', () => {
       const req = {};
       const accessToken = 'Some access token';
       const refreshToken = 'Some refresh token';
       const profile = {
           id: 'Some google id',
           name: {
               familyName: 'Turing',
               givenName: 'Alan',
           },
           emails: [{
               value: 'alan@gmail.com',
           }],
       };

      it('should call usersService.findOneByGoogleId', async () => {
        const spy = jest.spyOn(mockUsersService, 'findOneByGoogleId').mockImplementation(async () => mockUser);
        await googleStrategy.validate(req, accessToken, refreshToken, profile, () => {});
        expect(spy).toBeCalledWith(profile.id);
      });

      it('should call done if user is found by google id', async () => {
         jest.spyOn(mockUsersService, 'findOneByGoogleId').mockImplementation(async () => mockUser);
         const doneSpy = jest.fn(() => {});
         const createOneSpy = jest.spyOn(mockUsersService, 'createOneByGoogle');
         await googleStrategy.validate(req, accessToken, refreshToken, profile, doneSpy);
         expect(doneSpy).toBeCalledWith(null, mockUser);
         expect(createOneSpy).toBeCalledTimes(0);
      });

       it('should call usersService.createOneByGoogle if user is not found', async () => {
           jest.spyOn(mockUsersService, 'findOneByGoogleId').mockImplementation(async () => undefined);
           const spy = jest.spyOn(mockUsersService, 'createOneByGoogle');
           await googleStrategy.validate(req, accessToken, refreshToken, profile, () => {});
           expect(spy).toBeCalledWith({
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               email: profile.emails[0].value,
               googleId: profile.id,
           });
       });

       it('should call done with create user', async () => {
           jest.spyOn(mockUsersService, 'findOneByGoogleId').mockImplementation(async () => undefined);
           const doneSpy = jest.fn(() => {});
           jest.spyOn(mockUsersService, 'createOneByGoogle').mockImplementation(async () => mockUser);
           await googleStrategy.validate(req, accessToken, refreshToken, profile, doneSpy);
           expect(doneSpy).toBeCalledWith(null, mockUser);
       });
   });

});