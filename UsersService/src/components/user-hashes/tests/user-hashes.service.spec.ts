import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { HashService } from '../../core/services/hash.service';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { UserHashesService } from '../user-hashes.service';
import { UserHash } from '../user-hash.entity';
import { HashTypes } from '../../../helpers/enums/hash-types.enum';

describe('UserHashesService', () => {
  let userHashesService, hashService;


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [UserHashesService, { provide: getRepositoryToken(UserHash), useValue: mockRepository }]
    }).compile();

    userHashesService = module.get<UserHashesService>(UserHashesService);
    hashService = module.get<HashService>(HashService);
  });

  describe('findOneByHash', () => {
    it('should return user', async () => {
      const result = new UserHash();
      result.userId = 5;
      result.hash = "hash";

      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await userHashesService.findOneByHash(result.hash)).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create new user hash and return it', async () => {
      const userId = 5;
      const result = {
        ...new UserHash(),
        userId,
        hash: hashService.generateHash(JSON.stringify({ userId, typ: HashTypes.EMAIL_VERIFICATION }))
      };


      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);

      expect(await userHashesService.createOne(userId, HashTypes.EMAIL_VERIFICATION)).toEqual(result);
    });
  });

});