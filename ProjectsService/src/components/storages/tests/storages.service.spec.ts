import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    mockProjectsService,
    mockStorage, mockStorages,
    mockStoragesRepository,
} from './mocks';
import {
    FindStorageDto,
    UpdateStorageDto,
    CreateStorageDto,
} from '@astra/common/dto';
import {StoragesService} from '../storages.service';
import {StoragesRepository} from '../storages.repository';
import {ProjectsService} from '../../projects/projects.service';
import {RpcException} from '@nestjs/microservices';
import {Messages} from '@astra/common/enums';
import {mockProject} from '../../projects/tests/mocks';

describe('StoragesService', () => {
  let storagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          StoragesService,
          { provide: getRepositoryToken(StoragesRepository), useValue: mockStoragesRepository },
          { provide: ProjectsService, useValue: mockProjectsService },
      ],
    }).compile();

    storagesService = module.get<StoragesService>(StoragesService);
  });

  describe('findManyByProject', () => {
    const payload = {
      userId: 5,
      projectId: 7,
    };

    beforeEach(() => {
       jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => mockProject);
    });

      it('should call projectsService.findOneByUserId', async () => {
          const spy = jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => ({}));
          await storagesService.findManyByProject(payload);
          expect(spy).toBeCalledWith(payload.projectId, payload.userId);
      });

      it('should throw an exception if project is not found', async () => {
          jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => undefined);
          try {
              await storagesService.findManyByProject(payload);
              expect(false);
          } catch (e) {
              expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.INVALID_PERMISSIONS)));
          }
      });

    it('should call storagesRepository.findManyByProjectId if page and limit are not provided', async () => {
        jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => ({}));
        const spy = jest.spyOn(mockStoragesRepository, 'findManyByProjectId').mockImplementation(async () => []);
        await storagesService.findManyByProject(payload);
        expect(spy).toBeCalledWith(payload.projectId);
    });

      it('should call storagesRepository.findManyWithPagination if page and limit are provided', async () => {
          jest.spyOn(mockProjectsService, 'findById').mockImplementation(async () => ({}));
          const spy = jest.spyOn(mockStoragesRepository, 'findManyWithPagination').mockImplementation(async () => []);
          await storagesService.findManyByProject({...payload, page: 2, limit: 10});
          expect(spy).toBeCalledWith({ projectId: payload.projectId }, { page: 2, limit: 10 });
      });

      it('should return array of storages', async () => {
          jest.spyOn(mockProjectsService, 'findById').mockImplementation(async () => ({}));
          jest.spyOn(mockStoragesRepository, 'findManyByProjectId').mockImplementation(async () => mockStorages);
          expect(await storagesService.findManyByProject(payload.projectId)).toEqual(mockStorages);
      });
  });

  describe('findById', () => {
    const payload: FindStorageDto = {
        id: 20,
    };
    it('should call storagesRepository.findById', async () => {
        const spy = jest.spyOn(mockStoragesRepository, 'findById').mockImplementation(async () => mockStorage);
        await storagesService.findById(payload.id);
        expect(spy).toBeCalledWith(payload.id);
    });

    it('should return storage', async () => {
        jest.spyOn(mockStoragesRepository, 'findById').mockImplementation(async () => mockStorage);
        expect(await storagesService.findById(payload.id)).toEqual(mockStorage);
    });
  });

    describe('updateOne', () => {
        const payload: UpdateStorageDto = {
            id: 20,
            name: 'Alex',
        };
        const { id, ...data } = payload;
        it('should call storagesRepository.updateOne', async () => {
            const spy = jest.spyOn(mockStoragesRepository, 'updateOneAndFind').mockImplementation(async () => mockStorage);
            await storagesService.updateOne(id, { ...data });
            expect(spy).toBeCalledWith(id, { ...data });
        });

        it('should return updated project', async () => {
            jest.spyOn(mockStoragesRepository, 'updateOneAndFind').mockImplementation(async () => mockStorage);
            expect(await storagesService.updateOne(payload)).toEqual(mockStorage);
        });
    });

    describe('removeById', () => {
        const id = 30;
        it('should call storagesRepository.removeById', async () => {
            const spy = jest.spyOn(mockStoragesRepository, 'removeById').mockImplementation(async () => {});
            await storagesService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

  describe('createOne', () => {
    const payload: CreateStorageDto = {
       userId: 20,
       name: mockStorage.name,
       description: mockStorage.description,
       projectId: mockStorage.projectId,
       path: mockStorage.path,
    };

      it('should call storagesRepository.findOneByPath', async () => {
          const spy = jest.spyOn(mockStoragesRepository, 'findOneByPath').mockImplementation(async () => {});
          await storagesService.createOne(payload);
          expect(spy).toBeCalledWith(payload.path);
      });

      it('should throw an error in storage with provided path already exists', async () => {
          jest.spyOn(mockStoragesRepository, 'findOneByPath').mockImplementation(async () => mockStorage);
          try {
              await storagesService.createOne(payload);
              expect(false);
          } catch (e) {
              expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.STORAGE_PATH_ERROR)));
          }
      });

    it('should create new storage and return it', async () => {
       jest.spyOn(mockProjectsService, 'findById').mockImplementation(async () => ({}));
       jest.spyOn(mockStoragesRepository, 'findOneByPath').mockImplementation(async () => undefined);
       jest.spyOn(mockStoragesRepository, 'createOne').mockImplementation(async () => mockStorage);
       expect(await storagesService.createOne(payload)).toEqual(mockStorage);
    });
  });

  describe('updateOne', () => {
     const id = 30;
     it('should call storagesRepository.updateOne', async () => {
         const spy = jest.spyOn(mockStoragesRepository, 'updateOneAndFind').mockImplementation(async () => {});
         await storagesService.updateOne(id, { name: 'New storage name' });
         expect(spy).toBeCalledWith(id, { name: 'New storage name' });
     });
      it('should return storage', async () => {
          const spy = jest.spyOn(mockStoragesRepository, 'updateOneAndFind').mockImplementation(async () => mockStorage);
          expect(await storagesService.updateOne(id, { name: 'New storage name' })).toEqual(mockStorage);
      });

  });

});