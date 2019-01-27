import {Project} from '../project.entity';

export const mockProject = {
    id: 20,
    name: 'My project',
    description: 'Description of my project',
    clientId: 'some random str',
    clientSecret: 'some random str',
    storagesCount: 0,
    userId: 5,
    createdAt: new Date(),
};

export const mockProjects = [new Project({}), new Project({})];

export const mockProjectsRepository = {
    findById() {},
    findOneByUserId() {},
    save() {},
    updateOneAndFind() {},
    updateOne() {},
    removeById() {},
    findOneByClientInfo() {},
    findManyByUser() {},
    incrementStorageCount() {},
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
