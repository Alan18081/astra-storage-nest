import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user-auth.entity';
import { AuthController } from '../auth.controller';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { JwtResponse } from '../interfaces/jwt-response';
import { NotFoundException } from '@nestjs/common';
import { Messages } from '../../../helpers/enums/messages.enum';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SetNewPasswordDto } from '../dto/set-new-password.dto';
import { UserHashesService } from '../../user-auth-hashes/user-auth-hashes.service';
import { RefreshTokensService } from '../../refresh-tokens/refresh-tokens.service';
import { RefreshToken } from '../../refresh-tokens/refresh-token.entity';
import { CoreModule } from '../../core/core.module';
import { HOST, JWT_EXPIRES, PORT } from '../../../config';
import { EmailTemplatesService } from '../../core/services/email-templates.service';
import { EmailSendingService } from '../../core/services/email-sending.service';
import { HashTypes } from '../../../helpers/enums/hash-types.enum';
import { TemplateTypes } from '../../../helpers/enums/template-types.enum';
import { WsException } from '@nestjs/websockets';
import { UserHash } from '../../user-auth-hashes/user-auth-hash.entity';

const mockUsersService = {
  async findOneByEmail() {}
};

const mockJwtService = {
  async sign() {},
  decode() {},
};

const mockUserHashesService = {
  async findOneByHash() {},
  async createOne() {},
};

const mockRefreshTokensService = {
  async findOneByToken() {},
  async findOneByUserId() {},
  async createOne() {},
  async deleteOne() {},
};

const mockedEmailTemplatesService = {
  getTemplate() {},
  createSubject() {},
};

const mockedEmailSendingService = {
  sendSystemEmail() {}
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

const mockRefreshToken = {
  ...new RefreshToken(),
  token: 'Some token',
  userId: 6,
  id: 2,
};

const mockUserHash = {
  ...new UserHash(),
  hash: 'My hash',
  userId: 5
};


describe('AuthService', () => {
  let authService;
  

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [],
      providers: [AuthService]
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UserHashesService)
      .useValue(mockUserHashesService)
      .overrideProvider(RefreshTokensService)
      .useValue(mockRefreshTokensService)
      .overrideProvider(EmailTemplatesService)
      .useValue(mockedEmailTemplatesService)
      .overrideProvider(EmailSendingService)
      .useValue(mockedEmailSendingService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('singIn', () => {

    const jwtResponse: JwtResponse = {
      accessToken: 'Access token',
      refreshToken: mockRefreshToken.token,
      expiresIn: JWT_EXPIRES
    };

    it('should call jwtService.sign', async () => {
      const spy = jest.spyOn(mockJwtService, 'sign');
      spy.mockImplementation(() => jwtResponse.accessToken);

      jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(async () => mockRefreshToken);

      
      await authService.signIn(mockUserWithPassword);
      expect(spy).toBeCalled();
    });

    it('should return token\'s info if token exists', async () => {
      jest.spyOn(mockJwtService, 'sign').mockImplementation(() => jwtResponse.accessToken);
      jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(async () => mockRefreshToken);

      expect(await authService.signIn(mockUserWithPassword)).toEqual(jwtResponse);
    });

    it('should create new refresh token and return token\'s info if token is not found', async () => {
      jest.spyOn(mockJwtService, 'sign').mockImplementation(() => jwtResponse.accessToken);
      jest.spyOn(mockRefreshTokensService, 'findOneByUserId').mockImplementation(async () => undefined);

      const spy = jest.spyOn(mockRefreshTokensService, 'createOne');
      spy.mockImplementation(async () => mockRefreshToken);

      expect(await authService.signIn(mockUserWithPassword)).toEqual(jwtResponse);
      expect(spy).toBeCalled();
    });
  });

  describe('verifyEmail', () => {

    it('should call userHashes.createOne with right arguments', async () => {
      const spy = jest.spyOn(mockUserHashesService, 'createOne');
      spy.mockImplementation(() => mockUserWithPassword);

      await authService.verifyEmail(mockUserWithPassword);
      expect(spy).toBeCalledWith(mockUserWithPassword.id, HashTypes.EMAIL_VERIFICATION);
    });

    it('should call emailTemplatesService.getTemplate with right arguments', async () => {
      const template = 'template';

      jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(() => mockUserHash);

      const spy = jest.spyOn(mockedEmailTemplatesService, 'getTemplate');
      spy.mockImplementation(() => template);

      await authService.verifyEmail(mockUserWithPassword);
      expect(spy).toBeCalledWith(
        TemplateTypes.EMAIL_VERIFICATION,
        {
          firstName: mockUserWithPassword.firstName,
          lastName: mockUserWithPassword.lastName,
          url: `http://${HOST}:${PORT}/auth/verifyEmail/hash/${mockUserHash.hash}`
        }
      );
    });

    it('should call emailSendingService.sendSystemEmail with right arguments', async () => {
      const template = 'template';
      const subject = 'Subject';

      jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(() => true);
      jest.spyOn(mockedEmailTemplatesService, 'getTemplate').mockImplementation(() => template);
      jest.spyOn(mockedEmailTemplatesService, 'createSubject').mockImplementation(() => subject);

      const spy = jest.spyOn(mockedEmailSendingService, 'sendSystemEmail').mockImplementation(async () => {});

      await authService.verifyEmail(mockUserWithPassword);
      expect(spy).toBeCalledWith(
        mockUserWithPassword.email,
        subject,
        template
      );
    });

    it('should throw an error if user-auth doesn\'t exist', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => undefined);

      try {
        await authService.verifyEmail(mockUserWithPassword);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.USER_NOT_FOUND)));
      }

    });

  });

  describe('resetPassword', () => {

    it('should call userHashes.createOne with right arguments', async () => {
      const spy = jest.spyOn(mockUserHashesService, 'createOne');
      spy.mockImplementation(() => mockUserWithPassword);

      await authService.resetPassword(mockUserWithPassword);
      expect(spy).toBeCalledWith(mockUserWithPassword.id, HashTypes.RESET_PASSWORD);
    });

    it('should call emailTemplatesService.getTemplate with right arguments', async () => {
      const template = 'template';

      jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(() => mockUserHash);

      const spy = jest.spyOn(mockedEmailTemplatesService, 'getTemplate');
      spy.mockImplementation(() => template);

      await authService.resetPassword(mockUserWithPassword);
      expect(spy).toBeCalledWith(
        TemplateTypes.RESET_PASSWORD,
        {
          firstName: mockUserWithPassword.firstName,
          lastName: mockUserWithPassword.lastName,
          url: `http://${HOST}:${PORT}/auth/resetPassword/hash/${mockUserHash.hash}`
        }
      );
    });

    it('should call emailSendingService.sendSystemEmail with right arguments', async () => {
      const template = 'template';
      const subject = 'Subject';

      jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(() => mockUserHash);
      jest.spyOn(mockedEmailTemplatesService, 'getTemplate').mockImplementation(() => template);
      jest.spyOn(mockedEmailTemplatesService, 'createSubject').mockImplementation(() => subject);

      const spy = jest.spyOn(mockedEmailSendingService, 'sendSystemEmail').mockImplementation(async () => {});

      await authService.resetPassword(mockUserWithPassword);
      expect(spy).toBeCalledWith(
        mockUserWithPassword.email,
        subject,
        template
      );
    });

    it('should throw an error if user-auth doesn\'t exist', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockImplementation(() => undefined);

      try {
        await authService.resetPassword(mockUserWithPassword);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.USER_NOT_FOUND)));
      }

    });

  });

  describe('exchangeToken', () => {
    const refreshToken = 'some token';

    it('should call authService.singIn and refreshTokensService.deleteOne if token is found', async () => {
      jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(async () => mockRefreshToken);

      const signInSpy = jest.spyOn(authService, 'signIn');
      signInSpy.mockImplementation(async () => true);

      const deleteOneSpy = jest.spyOn(mockRefreshTokensService, 'deleteOne');
      deleteOneSpy.mockImplementation(async () => {});

      expect(await authService.exchangeToken(refreshToken)).toBe(true);
      expect(signInSpy).toBeCalled();
      expect(deleteOneSpy).toBeCalled();
    });

    it('should throw an error if token is not found', async () => {
      jest.spyOn(mockRefreshTokensService, 'findOneByToken').mockImplementation(() => undefined);

      try {
        await authService.exchangeToken(refreshToken);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.REFRESH_TOKEN_NOT_FOUND)));
      }

    });

  });

  describe('setNewPassword', () => {
    const payload: SetNewPasswordDto = {
      hash: 'Some hash',
      password: '123456'
    };

    it('should throw an error if hash is not found', async () => {
      jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(async () => undefined);

      try {
        await authService.setNewPassword(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.RESET_PASSWORD_HASH_NOT_FOUND)));
      }
    });

  });

  describe('decodeToken', () => {

    const token = 'Some token';

    it('should return decoded token', async () => {
      const tokenData = {};

      jest.spyOn(mockJwtService, 'decode').mockImplementation(() => tokenData);

      expect(await authService.decodeToken(token)).toBe(tokenData);

    });

    it('should throw an error if token data is empty', async () => {
      jest.spyOn(mockJwtService, 'decode').mockImplementation(() => undefined);

      try {
        await authService.decodeToken(token);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new WsException(Messages.INVALID_TOKEN)));
      }

    });

  });

});