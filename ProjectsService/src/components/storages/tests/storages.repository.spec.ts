import { Test } from '@nestjs/testing';
import { CoreModule } from '../../core/core.module';
import {mockStorage} from './mocks';
import {StoragesRepository} from '../storages.repository';

describe('StoragesRepository', () => {
  let storagesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          StoragesRepository,
      ],
    }).compile();

    storagesRepository = module.get<StoragesRepository>(StoragesRepository);
  });

  describe('findMany', () => {

  });

  describe('findById', () => {
    const id = 20;
    it('should call storagesRepository.findOne', async () => {
        const spy = jest.spyOn(storagesRepository, 'findOne').mockImplementation(async () => mockStorage);
        await storagesRepository.findById(id);
        expect(spy).toBeCalledWith({ id });
    });

    it('should return user', async () => {
        jest.spyOn(storagesRepository, 'findOne').mockImplementation(async () => mockStorage);
        expect(await storagesRepository.findById(id)).toEqual(mockStorage);
    });
  });

  describe('updateOneAndFind', () => {
        it('should call storagesRepository.update', async () => {
            const spy = jest.spyOn(storagesRepository, 'update').mockImplementation(async () => {});
            jest.spyOn(storagesRepository, 'findOne').mockImplementation(async () => mockStorage);
            await storagesRepository.updateOneAndFind(mockStorage.id, { name: 'Markus' });
            expect(spy).toBeCalledWith({ id: mockStorage.id }, { name: 'Markus' });
        });

        it('should call storagesRepository.findById', async () => {
            jest.spyOn(storagesRepository, 'update').mockImplementation(async () => {});
            const spy = jest.spyOn(storagesRepository, 'findById').mockImplementation(async () => mockStorage);
            await storagesRepository.updateOneAndFind(mockStorage.id, { firstName: 'Markus' });
            expect(spy).toBeCalledWith(mockStorage.id);
        });

        it('should return storage', async () => {
            jest.spyOn(storagesRepository, 'update').mockImplementation(async () => {});
            jest.spyOn(storagesRepository, 'findById').mockImplementation(async () => mockStorage);
            expect(await storagesRepository.updateOneAndFind({ id: mockStorage.id, userId: mockStorage.userId }, { firstName: 'Alan' })).toEqual(mockStorage);
        });
  });

  describe('removeById', () => {
        const id = 20;
        it('should call storagesRepository.delete', async () => {
            const spy = jest.spyOn(storagesRepository, 'delete').mockImplementation(async () => mockStorage);
            await storagesRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
  });

  // describe('createOne', () => {
  //    it('should call storagesRepository.save', async () => {
  //      const spy = jest.spyOn(storagesRepository, 'save').mockImplementation(async () => mockStorage);
  //      await storagesRepository.createOne(mockStorage, mockProject.id, mockProjectsRepository);
  //      expect(spy).toBeCalledWith(mockStorage);
  //    });
  //
  //    it('should call storagesRepository.incrementStoragesCount', async () => {
  //      jest.spyOn(storagesRepository, 'save').mockImplementation(async () => mockStorage);
  //      const spy = jest.spyOn(mockProjectsRepository, 'incrementStorageCount').mockImplementation(async () => {});
  //      await storagesRepository.createOne(mockStorage, mockProject.id, storagesRepository, mockProjectsRepository);
  //      expect(spy).toBeCalledWith(mockProject.id);
  //    });
  //
  //    it('should return saved storage', async () => {
  //        jest.spyOn(storagesRepository, 'save').mockImplementation(async () => mockStorage);
  //        jest.spyOn(mockProjectsRepository, 'incrementStoragesCount').mockImplementation(async () => {});
  //        expect(await storagesRepository.createOne(mockStorage, mockProject.id, storagesRepository, mockProjectsRepository))
  //            .toEqual(mockStorage);
  //    });
  // });

});