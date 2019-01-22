import { Storage } from '../storage/storage';
import { ProjectAccount } from '../project-account/project-account';
import { apiRequest } from '../../helpers/api-request';

export class Project {

  constructor(
    private readonly token: string,
  ) {}

  async register(login: string, email: string, password: string): Promise<void> {
    try {
      await apiRequest({
        url: '/projectAccounts/create'
      });
    } catch (e) {

    }
  }

  async login(email: string, password: string): Promise<ProjectAccount> {
    return null;
  }

  async getStorage(path: string): Promise<Storage> {
    return null;
  }

}