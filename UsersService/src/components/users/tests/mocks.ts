export const mockUser = {
    id: 20,
    firstName: 'Alan',
    lastName: 'Morgan',
    email: 'gogunov00@gmail.com',
    password: 'hello',
};

export const mockUserWithoutPassword = {
    id: 20,
    firstName: 'Alan',
    lastName: 'Morgan',
    email: 'gogunov00@gmail.com',
};

export const mockUserHash = {
    id: 11,
    hash: 'fgdgfghgn',
    userId: 5
}

export const mockUserHashesService = {
    createOne() {},
    findOneByHash() {},
    removeById() {},
};

export const mockUsersRepository = {
    find() {},
    findById() {},
    findOneByEmail() {},
    save() {},
    updateOneAndFind() {},
    updateOne() {},
    findOneByGoogleId() {},
    removeById() {},
};

export const mockHashService = {
  generateHash() {},
  compareHash() {},
};

export const mockEmailsClient = {
  send() {
      return { toPromise() {} };
  },
};
