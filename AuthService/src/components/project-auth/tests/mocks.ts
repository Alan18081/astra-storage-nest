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