import { Storage } from '../storage.entity';
import {StorageType} from '@bit/alan18081.astra-storage.common.dist';

export const mockStorage = {
    id: 20,
    name: 'My project',
    description: 'Description of my project',
    createdAt: new Date(),
    updatedAt: new Date(),
    typeId: StorageType.PROTECTED,
    path: 'alan',
    projectId: 6,
};

export const mockStorages = [new Storage({}), new Storage({})];

export const mockStoragesRepository = {
    findById() {},
    save() {},
    updateOneAndFind() {},
    updateOne() {},
    removeById() {},
    findManyByProject() {},
    findManyByProjectId() {},
    findManyWithPagination() {},
    findOneByPath() {},
    createOne() {},
};

export const mockProjectsService = {
    findById() {},
    findOneByUserId() {},
};
