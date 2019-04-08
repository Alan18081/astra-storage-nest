import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { RefreshTokensService } from '../refresh-tokens.service';
import {
    CreateRefreshTokenDto,
} from '@bit/alan18081.astra-storage.common.dist/dto';
import {
    mockHashService, mockRefreshToken, mockRefreshTokensRepository,
} from './mocks';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';
import {RefreshTokensRepository} from '../refresh-tokens.repository';
import {mockJwtService} from '../../user-auth/tests/mocks';
import {JwtService} from '@nestjs/jwt';
import {mockStorage, mockStoragesRepository} from '../../../../../ProjectsService/src/components/storages/tests/mocks';

describe('RefreshTokensService', () => {
  let refreshTokensService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          RefreshTokensService,
          { provide: getRepositoryToken(RefreshTokensRepository), useValue: mockRefreshTokensRepository },
          { provide: HashService, useValue: mockHashService },
          { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    refreshTokensService = module.get<RefreshTokensService>(RefreshTokensService);
  });

  describe('createOne', () => {
      const payload: CreateRefreshTokenDto = {
          userId: 2,
          accessToken: 'some access token',
      };

      const refreshToken = 'some refresh token';

     it('should call refreshTokensRepository.findOneByUserId', async () => {
        const spy = jest.spyOn(mockRefreshTokensRepository, 'findOneByUserId').mockImplementation(async () => mockRefreshToken);
        await refreshTokensService.createOne(payload);
        expect(spy).toBeCalledWith(payload.userId);
     });

     it('should return refresh token if it has been found', async () => {
        jest.spyOn(mockRefreshTokensRepository, 'findOneByUserId').mockImplementation(async () => mockRefreshToken);
        const spy = jest.spyOn(mockJwtService, 'sign');
        expect(await refreshTokensService.createOne(payload)).toEqual(mockRefreshToken);
        expect(spy).toBeCalledTimes(0);
     });

      it('should call jwtService.sign', async () => {
          jest.spyOn(mockRefreshTokensRepository, 'findOneByUserId').mockImplementation(async () => undefined);
          const spy = jest.spyOn(mockJwtService, 'sign').mockImplementation(() => refreshToken);
          await refreshTokensService.createOne(payload);
          expect(spy).toBeCalledWith({
              ...payload,
          });
      });

    it('should create new refresh token and return it', async () => {
       jest.spyOn(mockRefreshTokensRepository, 'save').mockImplementation(async () => mockRefreshToken);

       expect(await refreshTokensService.createOne(payload)).toEqual(mockRefreshToken);
    });
  });

    describe('findOneByToken', () => {
        const token = 'token';
        it('should call refreshTokensRepository.findOneByToken', async () => {
            const spy = jest.spyOn(mockRefreshTokensRepository, 'findOneByToken').mockImplementation(async () => mockStorage);
            await refreshTokensService.findOneByToken(token);
            expect(spy).toBeCalledWith(token);
        });

        it('should return refresh token', async () => {
            jest.spyOn(mockRefreshTokensRepository, 'findOneByToken').mockImplementation(async () => mockRefreshToken);
            expect(await refreshTokensService.findOneByToken(token)).toEqual(mockRefreshToken);
        });
    });

    describe('removeById', () => {
        const id = 20;
        it('should call refreshTokensRepository.removeById', async () => {
            const spy = jest.spyOn(mockRefreshTokensRepository, 'removeById').mockImplementation(async () => mockRefreshToken);
            await refreshTokensService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

});