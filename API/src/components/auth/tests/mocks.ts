export const mockUsersService = {
  findOneByGoogleId() {},
  createOneByGoogle() {},
  findOneByEmail() {},
};

export const mockProjectsService = {
    findOneByClientInfo() {},
};

export const mockUser = {
    id: 20,
    firstName: 'Alan',
    lastName: 'Morgan',
    email: 'gogunov00@gmail.com',
    password: 'hello',
};

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

export const mockProjectAccountsService = {
    findOneByEmail() {},
};

export const mockProjectAccount = {
    id: 20,
    login: 'Alex',
    email: 'alan@gmail.com',
    password: 'some hash',
    projectId: 4,
    ownerId: 10,
};
