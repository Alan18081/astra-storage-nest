import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtResponse } from '../interfaces/jwt-response';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { HashService } from '../../core/services/hash.service';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Messages } from '../../../helpers/enums/messages.enum';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ExchangeTokenDto } from '../dto/exchangeToken.dto';
import { SetNewPasswordDto } from '../dto/set-new-password.dto';

describe('AuthController', () => {
  let authController, authService;
  const mockUsersService = {
    findOneByEmail() {}
  };

  const mockAuthService = {
    async signIn() {},
    async resetPassword() {},
    async exchangeToken() {},
    async setNewPassword() {},
  };

  const mockHashService = {
    async compareHash() {}
  };

  const mockUser = {
    ...new User(),
    firstName: 'Alan',
    lastName: 'Morgan',
    googleId: 12,
    email: 'test@gmail.com',
  };

  const mockUserWithPassword = {
    ...mockUser,
    password: 'Some password'
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(HashService)
      .useValue(mockHashService)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    const payload: LoginDto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    const jwtResponse: JwtResponse = {
      accessToken: 'Access token',
      refreshToken: 'Refresh token',
      expiresIn: 4500
    };

    beforeEach(() => {
      jest.spyOn(mockAuthService, 'signIn').mockImplementation(async () => jwtResponse);
    });

    it('should return token\'s info if credentials valid and user is found', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUserWithPassword);
      jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true);

      expect(await authController.login(payload)).toEqual(jwtResponse);
    });

    it('should call usersService.findOneByEmail', async () => {
      const spy = jest.spyOn(mockUsersService, 'findOneByEmail');
      spy.mockImplementation(() => mockUserWithPassword);

      await authController.login(payload);
      expect(spy).toBeCalled();
    });

    it('should call authService.signIn', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUserWithPassword);
      const spy = jest.spyOn(authService, 'signIn').mockImplementation(async () => true);

      await authController.login(payload);
      expect(spy).toBeCalled();

    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => undefined);

      try {
        await authController.login(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.USER_NOT_FOUND)));
      }
    });

    it('should throw an error if user doesn\'t have password', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUser);

      try {
        await authController.login(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new BadRequestException(Messages.USER_DOESNT_HAVE_PASSWORD)));
      }
    });

    it('should throw an error if user has provided invalid password', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUserWithPassword);
      jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => false);

      try {
        await authController.login(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new UnauthorizedException(Messages.INVALID_PASSWORD)));
      }
    });

  });

  describe('resetPassword', () => {

    const payload: ResetPasswordDto = {
      email: 'test@gmail.com',
    };

    it('should call usersService.findOneByEmail', async () => {
      const spy = jest.spyOn(mockUsersService, 'findOneByEmail');
      spy.mockImplementation(() => mockUsersService);

      await authController.resetPassword(payload);
      expect(spy).toBeCalled();

    });

    it('should call authService.resetPassword', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => mockUserWithPassword);
      const spy = jest.spyOn(authService, 'resetPassword').mockImplementation(async () => true);

      await authController.resetPassword(payload);
      expect(spy).toBeCalled();

    });

    it('should throw an error if user doesn\'t exist', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => undefined);

      try {
        await authController.resetPassword(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.USER_NOT_FOUND)));
      }

    });

  });

  describe('exchangeToken', () => {
    const payload: ExchangeTokenDto = {
      refreshToken: 'some token'
    };

    it('should call authService.exchangeToken', async () => {
      const spy = jest.spyOn(authService, 'exchangeToken').mockImplementation(async () => true);

      await authController.exchangeToken(payload);
      expect(spy).toBeCalled();
    });

  });

  describe('googleLoginCallback', () => {
    const user = {
      id: 5
    };
    const res = {
      redirect() {}
    };

    const spy = jest.spyOn(res, 'redirect');

    it('should redirect to success route if user has been found', () => {

      authController.googleLoginCallback(user, res);
      expect(spy).toBeCalledWith(`/auth/google/success?userId=${user.id}`);
    });

    it('should redirect to fail route if user has not been found', () => {

      authController.googleLoginCallback(null, res);
      expect(spy).toBeCalledWith('/auth/google/fail');
    });

  });

  describe('setNewPassword', () => {
    const payload: SetNewPasswordDto = {
      hash: 'Some hash',
      password: '123456'
    };

    it('should call authService.setNewPassword', async () => {
      const spy = jest.spyOn(authService, 'setNewPassword').mockImplementation(async () => true);

      await authController.setNewPassword(payload);
      expect(spy).toBeCalled();
    });

  });



});