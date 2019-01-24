import { AccountProfile } from './profile.interface';
import {apiRequest} from '../../helpers/api-request';
import { inspect } from 'util';

export class ProjectAccount {
  constructor(
    private readonly token: string,
  ) {}

  async getProfile(): Promise<AccountProfile> {
    try {
      const { data } = await apiRequest({
          url: '/projectAccounts/me/profile',
          method: 'GET',
          params: {
            accountToken: this.token,
          },
      });
      return data;
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async remove(): Promise<void> {
      try {
          await apiRequest({
             url: `/projectAccounts/token`,
             method: 'DELETE',
             params: {
                 accountToken: this.token,
             },
          });
      } catch (e) {
        throw new Error(e.response.data.message.message);
      }
  }

  getToken(): string {
      return this.token;
  }
}