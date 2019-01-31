import {StorageRecord} from '../storage-record.entity';

export const mockStorageRecord = {
    id: '507f1f77bcf86cd799439011',
    storageId: 12,
    path: 'alan',
    projectId: 20,
    password: 'hello',
    accountId: 3,
    data: {
        name: 'Alex',
    },
};

export const mockStorageRecords = [
  new StorageRecord({}),
  new StorageRecord({}),
];

export const mockStorageRecordsRepository = {
    find() {},
    findById() {},
    save() {},
    updateOneAndFind() {},
    updateOne() {},
    removeById() {},
    findMany() {},
    findManyWithPagination() {},
    removeByStorage() {},
};

export const mockHashService = {
  generateHash() {},
  compareHash() {},
};

export const mockEmailsClient = {
  send() {
      return { toPromise() {} }
  }
};
