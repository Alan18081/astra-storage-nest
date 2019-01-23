import { Storage } from './storage';
import { StorageType } from '../../helpers/storage-types.enum';
import { PaginatedResponse } from '@astra/common/interfaces/paginated-response.interface';

export class ProtectedStorage extends Storage {

  constructor(
    private readonly accountToken: string,
    path: string,
  ) {
    super(path);
  }

  async findMany(query: object): Promise<object[]> {
    return super.findMany(query, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

  async findManyWithPagination(query: object, page: number, limit: number): Promise<PaginatedResponse<object>> {
    return super.findManyWithPagination(query, page, limit, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

  async findById(id: string): Promise<object | undefined> {
    return super.findById(id, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

  async createOne(payload: object, type: StorageType, params: object = {}): Promise<object> {
    return super.createOne(payload, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

  async updateById(id: string, payload: object): Promise<object | undefined> {
    return super.updateById(id, payload, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

  async removeById(id: string): Promise<void> {
    return super.removeById(id, StorageType.PROTECTED, { accountToken: this.accountToken });
  }

}