import { Storage } from './storage';

export class PublicStorage extends Storage{

  protected constructor(
    path: string,
    private readonly projectToken: string,
  ) {
    super(path);
  }

  async findMany(query: object): Promise<object[]> {
    return super.findMany(query, { projectToken: this.projectToken });
  }

}