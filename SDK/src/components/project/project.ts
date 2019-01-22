import { Storage } from '../storage/storage';
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
      console.log(e);
    }
  }

  async login(email: string, password: string): Promise<ProjectAccount> {
    try {
      const { data } = await apiRequest({
         url: '/auth/loginProjectAccount',
         method: 'POST',
          data: {
           email,
           password,
          },
          params: {
           projectToken: this.token,
          },
      });

      const { token } = data;
      return new ProjectAccount(token);

    } catch (e) {
        console.log(e);
    }
  }

  async getPublicStorage(path: string): Promise<PublicStorage> {
    return null;
  }

  async getProtectedStorage(path: string, projectAccount: ProjectAccount): Promise<ProtectedStorage> {
    return null;
  }

}