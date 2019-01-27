import { Test } from '@nestjs/testing';
import {UserHashesRepository} from '../user-hashes.repository';
import {mockHash} from './mocks';

describe('UserHashesRepository', () => {
  let userHashesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          UserHashesRepository,
      ],
    }).compile();

    userHashesRepository = module.get<UserHashesRepository>(UserHashesRepository);
  });

  describe('findOneByHash', () => {
     it('should call userHashesRepository.findOne', async () => {
        const spy = jest.spyOn(userHashesRepository, 'findOne').mockImplementation(async () => mockHash);
        await userHashesRepository.findOneByHash(mockHash.hash);
        expect(spy).toBeCalledWith({ hash: mockHash.hash });
     });

     it('should return found user-hash', async () => {
        jest.spyOn(userHashesRepository, 'findOne').mockImplementation(async () => mockHash);
        expect(await userHashesRepository.findOneByHash(mockHash.hash)).toEqual(mockHash);
     });
  });

    describe('removeById', () => {
        const id = 20;
        it('should call userHashesRepository.delete', async () => {
            const spy = jest.spyOn(userHashesRepository, 'delete').mockImplementation(async () => {});
            await userHashesRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
    });

});