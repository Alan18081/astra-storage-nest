import { PaginatedResponse } from '@astra/common/interfaces';

export abstract class Storage {

  protected constructor(
    private readonly path: string,
  ) {}

  async findMany(query: object, params: object = {}): Promise<object[]> {
    return ;
  }

  async findManyWithPagination(query: object, page: number, limit: number, params: object = {}): Promise<PaginatedResponse<object>> {
    return null;
  }

  async findById(id: string, params: object = {}): Promise<object | undefined> {
    return null;
  }

  async createOne(data: object): Promise<object> {
    return null;
  }

  async updateById(id: string, data: object, params: object = {}): Promise<object | undefined> {
    return null;
  }

  async removeById(id: string, params: object = {}): Promise<void> {
    return null;
  }

}