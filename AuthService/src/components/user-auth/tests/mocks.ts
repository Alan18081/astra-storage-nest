export const mockUsersClient = {
    send() {
        return {
            toPromise() {},
        };
    },
};

export const mockJwtService = {
  sign() {}
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