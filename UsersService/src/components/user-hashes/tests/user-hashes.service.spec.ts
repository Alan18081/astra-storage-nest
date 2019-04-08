import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserHashesService } from '../user-hashes.service';
import { UserHash } from '../user-hash.entity';
import {UserHashesRepository} from '../user-hashes.repository';
import {mockHash, mockUserHashesRepository} from './mocks';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';
import { HashTypes } from '@bit/alan18081.astra-storage.common.dist/enums';
import {mockHashService} from '../../users/tests/mocks';

describe('UserHashesService', () => {
  let userHashesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          UserHashesService,
          { provide: getRepositoryToken(UserHashesRepository), useValue: mockUserHashesRepository },
          { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    userHashesService = module.get<UserHashesService>(UserHashesService);
  });

  describe('findOneByHash', () => {
    it('should call userHashesRepository.findOneByHash', async () => {
      const providedHash = 'fdfdgdfgf';
      const spy = jest.spyOn(mockUserHashesRepository, 'findOneByHash').mockImplementation(async () => mockHash);
      await userHashesService.findOneByHash(providedHash);
      expect(spy).toBeCalledWith(providedHash);
    });

    it('should return user-hash', async () => {
      jest.spyOn(mockUserHashesRepository, 'findOneByHash').mockImplementation(async () => mockHash);

      expect(await userHashesService.findOneByHash(mockHash.hash)).toEqual(mockHash);
    });
  });

  describe('createOne', () => {
    const result = new UserHash({
      userId: 5,
      hash: 'my hash',
    });

    it('should call hashService.generateHash', async () => {
        const spy = jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => result.hash);
        await userHashesService.createOne(result.userId, HashTypes.RESET_PASSWORD);
        expect(spy).toBeCalledWith(JSON.stringify({ userId: result.userId, type: HashTypes.RESET_PASSWORD }));
    });

    it('should create new user hash and return it', async () => {
      jest.spyOn(mockUserHashesRepository, 'save').mockImplementation(async () => result);

      expect(await userHashesService.createOne(result.userId, HashTypes.EMAIL_VERIFICATION)).toEqual(result);
    });
  });

    describe('verifyResetPasswordHash', () => {
        it('should call userHashesRepository.findOneByHash', async () => {
            const providedHash = 'fdfdgdfgf';
            const spy = jest.spyOn(mockUserHashesRepository, 'findOneByHash').mockImplementation(async () => mockHash);
            await userHashesService.verifyResetPasswordHash(providedHash);
            expect(spy).toBeCalledWith(providedHash);
        });

        it('should return true if user-hash is found', async () => {
            jest.spyOn(mockUserHashesRepository, 'findOneByHash').mockImplementation(async () => mockHash);

            expect(await userHashesService.verifyResetPasswordHash(mockHash.hash)).toEqual(true);
        });
    });

    describe('verifyResetPasswordHash', () => {
        it('should call userHashesRepository.removeById', async () => {
            const id = 20;
            const spy = jest.spyOn(mockUserHashesRepository, 'removeById').mockImplementation(async () => mockHash);
            await userHashesService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

});