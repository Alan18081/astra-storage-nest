export const mockUsersClient = {
    send() {
        return {
            toPromise() {},
        };
    },
};

export const mockJwtService = {
  sign() {},
  decode() {},
};

export const mockHashService = {
  compareHash() {},
};

export const mockRefreshTokensService = {
    createOne() {},
    findOneByToken() {}
};

export const mockUser = {
    id: 20,
    firstName: 'Alan',
    lastName: 'Morgan',
    email: 'gogunov00@gmail.com',
    password: 'hello',
};

export const mockJwtPayload = {
  id: 20,
  email: 'alan@gmail.com',
};
