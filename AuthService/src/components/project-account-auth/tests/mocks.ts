export const mockProjectsClient = {
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

export const mockProjectAccount = {
    id: 20,
    login: 'Alex',
    email: 'alan@gmail.com',
    password: 'some hash',
    projectId: 4,
};