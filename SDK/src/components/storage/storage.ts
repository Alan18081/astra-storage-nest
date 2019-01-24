import { PaginatedResponse } from '@astra/common/interfaces/paginated-response.interface';
import { apiRequest } from '../../helpers/api-request';
import { StorageType } from '../../helpers/storage-types.enum';

export abstract class Storage {

  protected constructor(
    private readonly path: string,
  ) {}

  async findMany(query: object, type: StorageType, params: object = {}): Promise<object[]> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}`,
        method: 'GET',
        params,
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }

  }

  async findManyWithPagination(query: object, page: number, limit: number, type: StorageType,  params: object = {}): Promise<PaginatedResponse<object>> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}`,
        method: 'GET',
        params: {
          ...params,
          page,
          limit,
        },
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async findById(id: string, type: StorageType, params: object = {}): Promise<object | undefined> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}/${id}`,
        method: 'GET',
        params,
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async createOne(payload: object, type: StorageType, params: object = {}): Promise<object> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}`,
        method: 'POST',
        params,
        data: payload,
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async updateById(id: string, payload: object, type: StorageType, params: object = {}): Promise<object | undefined> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}/${id}`,
        method: 'PUT',
        params,
        data: payload,
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async removeById(id: string, type: StorageType, params: object = {}): Promise<void> {
    try {
      const { data } = await apiRequest({
        url: `/storages/${type}/${this.path}/${id}`,
        method: 'DELETE',
        params,
      });

      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

}