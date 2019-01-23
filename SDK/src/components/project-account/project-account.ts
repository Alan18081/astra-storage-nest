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
      console.log(inspect(e.response.data, false, null, true));
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
          inspect(JSON.stringify(e.response.data));
      }
  }

  getToken(): string {
      return this.token;
  }
}