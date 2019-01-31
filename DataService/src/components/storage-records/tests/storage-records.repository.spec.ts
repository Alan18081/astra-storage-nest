import { Test } from '@nestjs/testing';
import {mockStorageRecord, mockStorageRecords} from './mocks';
import {StorageRecordsRepository} from '../storage-records.repository';
import {ObjectId} from 'mongodb';
import {PaginatedResponse} from '@astra/common';
import {StorageRecord} from '../storage-record.entity';
import {PaginationDto} from '@astra/common/dto';

describe('UsersRepository', () => {
  let storageRecordsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          StorageRecordsRepository,
      ],
    }).compile();

    storageRecordsRepository = module.get<StorageRecordsRepository>(StorageRecordsRepository);
  });

    describe('findMany', () => {
        const payload = {
          path: 'mark',
        };
        it('should call storageRecordsRepository.find', async () => {
            const spy = jest.spyOn(storageRecordsRepository, 'find').mockImplementation(async () => mockStorageRecords);
            await storageRecordsRepository.findMany(payload);
            expect(spy).toBeCalledWith(payload);
        });

        it('should return array of storage records', async () => {
            jest.spyOn(storageRecordsRepository, 'find').mockImplementation(async () => mockStorageRecord);
            expect(await storageRecordsRepository.findMany(payload)).toEqual(mockStorageRecord);
        });
    });

    describe('findManyWithPagination', () => {
      const query = {
        path: 'alan',
      };

      const pagination: Required<PaginationDto> = {
        page: 1,
        limit: 2,
      };

      const paginatedResult: PaginatedResponse<StorageRecord> = {
        itemsPerPage: pagination.limit,
        totalCount: 5,
        page: pagination.page,
        data: mockStorageRecords,
      };

      it('should call storageRecordsRepository.findAndCount', async () => {
        const spy = jest.spyOn(storageRecordsRepository, 'findAndCount').mockImplementation(async () => [mockStorageRecords, paginatedResult.totalCount]);
        await storageRecordsRepository.findManyWithPagination(query, pagination);
        expect(spy).toBeCalledWith({
            where: query,
            skip: (pagination.page - 1) * pagination.limit,
            take: pagination.limit,
        });
      });

      it('should return valid PaginationResponse', async () => {
          jest.spyOn(storageRecordsRepository, 'findAndCount').mockImplementation(async () => [mockStorageRecords, paginatedResult.totalCount]);
          expect(await storageRecordsRepository.findManyWithPagination(query, pagination)).toEqual(paginatedResult);
      });

    });

  describe('findById', () => {
    const id = 20;
    it('should call storageRecordsRepository.findOne', async () => {
        const spy = jest.spyOn(storageRecordsRepository, 'findOne').mockImplementation(async () => mockStorageRecords);
        await storageRecordsRepository.findById(id);
        expect(spy).toBeCalledWith(id);
    });

    it('should return user', async () => {
        jest.spyOn(storageRecordsRepository, 'findOne').mockImplementation(async () => mockStorageRecords);
        expect(await storageRecordsRepository.findById(id)).toEqual(mockStorageRecords);
    });
  });

    describe('updateOneAndFind', () => {
        const payload =  {
            firstName: 'Markus',
        };

        beforeEach(() => {
            jest.spyOn(storageRecordsRepository, 'updateOne').mockImplementation(async () => {});
            jest.spyOn(storageRecordsRepository, 'findById').mockImplementation(async () => mockStorageRecord);
        });
        it('should call storageRecordsRepository.updateOne', async () => {
            const spy = jest.spyOn(storageRecordsRepository, 'updateOne').mockImplementation(async () => {});
            await storageRecordsRepository.updateOneAndFind(mockStorageRecord.id, payload);
            expect(spy).toBeCalledWith({ _id: new ObjectId(mockStorageRecord.id) }, { $set: { data: payload }});
        });

        it('should call storageRecordsRepository.findById', async () => {
          const spy = jest.spyOn(storageRecordsRepository, 'findById').mockImplementation(async () => mockStorageRecord);
          await storageRecordsRepository.updateOneAndFind(mockStorageRecord.id, payload);
          expect(spy).toBeCalledWith(mockStorageRecord.id);
        });

        it('should return value of result', async () => {
            expect(await storageRecordsRepository.updateOneAndFind(mockStorageRecord.id, payload)).toEqual(mockStorageRecord);
        });
    });

    describe('removeById', () => {
        const id = '507f1f77bcf86cd799439011';
        it('should call storageRecordsRepository.deleteOne', async () => {
            const spy = jest.spyOn(storageRecordsRepository, 'deleteOne').mockImplementation(async () => {});
            await storageRecordsRepository.removeById(id);
            expect(spy).toBeCalledWith({ _id: new ObjectId(id) });
        });
    });

  describe('removeByStorage', () => {
    const storageId = 12;
    it('should call storageRecordsRepository.deleteMany', async () => {
      const spy = jest.spyOn(storageRecordsRepository, 'deleteMany').mockImplementation(async () => {});
      await storageRecordsRepository.removeByStorage(storageId);
      expect(spy).toBeCalledWith({ storageId });
    });
  });

});