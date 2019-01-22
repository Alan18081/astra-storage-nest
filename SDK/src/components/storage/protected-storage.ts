import { Storage } from './storage';

export class ProtectedStorage extends Storage {

  constructor(
    private readonly accountToken: string,
    path: string,
  ) {
    super(path);
  }

  async findMany(query: object): Promise<object[]> {
    return super.findMany(query, { accountToken: this.accountToken });
  }

}