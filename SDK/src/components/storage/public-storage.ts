import { Storage } from './storage';
import { StorageType } from '../../helpers/storage-types.enum';
import { PaginatedResponse } from '@astra/common/interfaces/paginated-response.interface';

export class PublicStorage extends Storage{

  constructor(
    path: string,
    private readonly projectToken: string,
  ) {
    super(path);
  }

  async findMany(query: object): Promise<object[]> {
    return super.findMany(query, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

  async findManyWithPagination(query: object, page: number, limit: number): Promise<PaginatedResponse<object>> {
    return super.findManyWithPagination(query, page, limit, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

  async findById(id: string): Promise<object | undefined> {
    return super.findById(id, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

  async createOne(payload: object): Promise<object> {
    return super.createOne(payload, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

  async updateById(id: string, payload: object): Promise<object | undefined> {
    return super.updateById(id, payload, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

  async removeById(id: string): Promise<void> {
    return super.removeById(id, StorageType.PUBLIC, { projectToken: this.projectToken });
  }

}