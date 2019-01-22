import { AccountProfile } from './profile.interface';
import {apiRequest} from '../../helpers/api-request';

export class ProjectAccount {
  constructor(
    private readonly token: string,
  ) {}

  async getProfile(): Promise<AccountProfile> {
    try {
      const { data } = await apiRequest({
          url: '/projectAccounts/me',
          method: 'GET',
          params: {
            accountToken: this.token,
          },
      });

      return data;
    } catch (e) {
        console.log(e);
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
          console.log(e);
      }
  }

  getToken(): string {
      return this.token;
  }
}