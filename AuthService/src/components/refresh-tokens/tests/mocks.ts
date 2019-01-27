export const mockRefreshToken = {
    id: 20,
    token: 'Some token',
    userId: 34,
};

export const mockHashService = {
  generateHash() {},
  compareHash() {},
};

export const mockRefreshTokensRepository = {
  save() {},
  findOneByUserId() {},
  removeById() {},
  findOneByToken() {},
};
