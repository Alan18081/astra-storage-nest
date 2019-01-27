import {ProjectAccount} from '../project-account.entity';

export const mockProjectAccount = {
    id: 20,
    login: 'Alex',
    email: 'alan@gmail.com',
    password: 'some hash',
    projectId: 4,
    ownerId: 10,
};

export const mockProjectAccounts = [new ProjectAccount({}), new ProjectAccount({})];

export const mockProjectAccountsRepository = {
    findMany() {},
    findById() {},
    findOneByEmail() {},
    save() {},
    updateOneAndFind() {},
    updateOne() {},
    removeById() {},
    findManyWithPagination() {},
};

export const mockHashService = {
  generateHash() {},
  compareHash() {},
};
