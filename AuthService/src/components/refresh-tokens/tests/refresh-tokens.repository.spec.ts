import { Test } from '@nestjs/testing';
import { CoreModule } from '../../core/core.module';
import {mockRefreshToken} from './mocks';
import {RefreshTokensRepository} from '../refresh-tokens.repository';
import {JwtService} from '@nestjs/jwt';
import {mockJwtService} from '../../user-auth/tests/mocks';

describe('RefreshTokensRepository', () => {
  let refreshTokensRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          RefreshTokensRepository,
          { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    refreshTokensRepository = module.get<RefreshTokensRepository>(RefreshTokensRepository);
  });

  describe('findOneByToken', () => {
    const token = 'some token';
    it('should call refreshTokensRepository.findOne', async () => {
        const spy = jest.spyOn(refreshTokensRepository, 'findOne').mockImplementation(async () => mockRefreshToken);
        await refreshTokensRepository.findOneByToken(token);
        expect(spy).toBeCalledWith({ token });
    });

    it('should return refresh token', async () => {
        jest.spyOn(refreshTokensRepository, 'findOne').mockImplementation(async () => mockRefreshToken);
        expect(await refreshTokensRepository.findOneByToken(token)).toEqual(mockRefreshToken);
    });
  });

  describe('findOneByUserId', () => {
     const id = 12;
     it('should call refreshTokensRepository.findOne', async () => {
        const spy = jest.spyOn(refreshTokensRepository, 'findOne').mockImplementation(async () => mockRefreshToken);
        await refreshTokensRepository.findOneByUserId(id);
        expect(spy).toBeCalledWith({ userId: id });
     });

     it('should return refresh token', async () => {
        jest.spyOn(refreshTokensRepository, 'findOne').mockImplementation(async () => mockRefreshToken);
        expect(await refreshTokensRepository.findOneByUserId(id)).toEqual(mockRefreshToken);
     });
  });

    describe('removeById', () => {
        const id = 20;
        it('should call refreshTokensRepository.delete', async () => {
            const spy = jest.spyOn(refreshTokensRepository, 'delete').mockImplementation(async () => {});
            await refreshTokensRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
    });

});