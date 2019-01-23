import { ProjectAccount } from '../project-account/project-account';
import { apiRequest } from '../../helpers/api-request';
import {PublicStorage} from '../storage/public-storage';
import {ProtectedStorage} from '../storage/protected-storage';

export class Project {

  constructor(
    private readonly token: string,
  ) {}

  async register(login: string, email: string, password: string): Promise<void> {
    try {
      await apiRequest({
        url: '/projectAccounts',
        method: 'POST',
        data: {
          login,
          email,
          password,
        },
        params: {
          projectToken: this.token,
        },
      });
    } catch (e) {
      console.info(JSON.stringify(e.response.data));
      throw new Error(e.response.data);
    }
  }

  async login(email: string, password: string): Promise<ProjectAccount> {
    try {
      const { data } = await apiRequest({
         url: '/auth/login/projectAccount',
         method: 'POST',
          data: {
           email,
           password,
          },
          params: {
           projectToken: this.token,
          },
      });

      const { accessToken } = data;
      return new ProjectAccount(accessToken);

    } catch (e) {
        console.log(e);
    }
  }

  private async checkIsStorageExists(path: string): Promise<void> {
    try {
      await apiRequest({
        url: `/storages/path/${path}/exists`,
        method: 'GET',
        params: {
          projectToken: this.token,
        },
      });
    } catch (e) {
      throw new Error(e.response.data.message.message);
    }
  }

  async getPublicStorage(path: string): Promise<PublicStorage> {
    await this.checkIsStorageExists(path);
    return new PublicStorage(path, this.token);
  }

  async getProtectedStorage(path: string, projectAccount: ProjectAccount): Promise<ProtectedStorage> {
    await this.checkIsStorageExists(path);
    return new ProtectedStorage(path, projectAccount.getToken());
  }

}