import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {CreateStorageRecordDto, FindStorageRecordsListDto} from '@astra/common/dto';
import {RpcException} from '@nestjs/microservices';
import {Messages} from '@astra/common/enums';
import {
    mockStorageRecord, mockStorageRecords, mockStorageRecordsRepository,
} from './mocks';
import {StorageRecordsRepository} from '../storage-records.repository';
import {StorageRecordsService} from '../storage-records.service';

    describe('StorageRecordsService', () => {
      let storageRecordsService;

      beforeEach(async () => {
        const module = await Test.createTestingModule({
          providers: [
              StorageRecordsService,
              { provide: getRepositoryToken(StorageRecordsRepository), useValue: mockStorageRecordsRepository },
          ],
        }).compile();

        storageRecordsService = module.get<StorageRecordsService>(StorageRecordsService);
      });

      describe('findMany', () => {
          const payload: FindStorageRecordsListDto = {
              projectId: 5,
              path: 'alan',
          };

          it('should call storageRecordsRepository.findMany if page and limit are not provided', async () => {
              const spy = jest.spyOn(mockStorageRecordsRepository, 'findMany').mockImplementation(async () => []);
              await storageRecordsService.findMany(payload);
              expect(spy).toBeCalledWith(payload);
          });

          it('should call storageRecordsRepository.findManyWithPagination if page and limit are provided', async () => {
              const spy = jest.spyOn(mockStorageRecordsRepository, 'findManyWithPagination').mockImplementation(async () => []);
              await storageRecordsService.findMany({...payload, page: 2, limit: 10});
              expect(spy).toBeCalledWith(payload, { page: 2, limit: 10 });
          });

          it('should return array of storage records', async () => {
              jest.spyOn(mockStorageRecordsRepository, 'findMany').mockImplementation(async () => mockStorageRecords);
              expect(await storageRecordsService.findMany(payload.projectId)).toEqual(mockStorageRecords);
          });
      });

      describe('findById', () => {
        const id = 20;
        it('should call storageRecordsRepository.findById', async () => {
            const spy = jest.spyOn(mockStorageRecordsRepository, 'findById').mockImplementation(async () => mockStorageRecord);
            await storageRecordsService.findById(id);
            expect(spy).toBeCalledWith(id);
        });

        it('should return storage record', async () => {
            jest.spyOn(mockStorageRecordsRepository, 'findById').mockImplementation(async () => mockStorageRecord);
            expect(await storageRecordsService.findById(id)).toEqual(mockStorageRecord);
        });
      });

        describe('updateOne', () => {
            it('should call storageRecordsRepository.updateOneAndFind', async () => {
                const spy = jest.spyOn(mockStorageRecordsRepository, 'updateOneAndFind').mockImplementation(async () => mockStorageRecord);
                await storageRecordsService.updateOne(mockStorageRecord.id, { name: 'Markus' });
                expect(spy).toBeCalledWith(mockStorageRecord.id, { name: 'Markus' });
            });

            it('should return storage record', async () => {
                jest.spyOn(mockStorageRecordsRepository, 'updateOneAndFind').mockImplementation(async () => mockStorageRecord);
                expect(await storageRecordsService.updateOne(mockStorageRecord.id, { name: 'Alan' })).toEqual(mockStorageRecord);
            });
        });

    describe('removeById', () => {
        const id = 20;
        it('should call storageRecordsRepository.removeById', async () => {
            const spy = jest.spyOn(mockStorageRecordsRepository, 'removeById').mockImplementation(async () => {});
            await storageRecordsService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

  describe('createOne', () => {
      const payload: CreateStorageRecordDto = {
        projectId: mockStorageRecord.projectId,
        path: mockStorageRecord.path,
        storageId: mockStorageRecord.storageId,
        data: {
            name: 'Alex',
        },
      };

    it('should create new storage record and return it', async () => {
       jest.spyOn(mockStorageRecordsRepository, 'save').mockImplementation(async () => mockStorageRecord);
       expect(await storageRecordsService.createOne(payload)).toEqual(mockStorageRecord);
    });
  });

});