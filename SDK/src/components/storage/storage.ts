import { PaginatedResponse } from '@astra/common/interfaces';

export class Storage {

  constructor(
    private readonly projectToken: string,
    private readonly path: string,
  ) {}

  async findMany(query: object): Promise<object[]> {
    return [];
  }

  async findManyWithPagination(query: object, page: number, limit: number): Promise<PaginatedResponse<object>> {
    return null;
  }

  async findById(id: string): Promise<object | undefined> {
    return null;
  }

  async createOne(data: object): Promise<object> {
    return null;
  }

  async updateById(id: string, data: object): Promise<object | undefined> {
    return null;
  }

  async removeById(id: string): Promise<void> {
    return null;
  }

}