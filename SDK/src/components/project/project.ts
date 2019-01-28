import { ProjectAccount } from '../project-account/project-account';
import { apiRequest } from '../../helpers/api-request';
import { PublicStorage } from '../storage/public-storage';
import { ProtectedStorage } from '../storage/protected-storage';
import { StorageType, WsCodes } from '@astra/common/enums';
import { Observable } from 'rxjs';
import * as SocketIOClient from 'socket.io-client';
import { Action } from '@astra/common/interfaces';

export class Project {

  constructor(
    private readonly token: string,
    private readonly socket: SocketIOClient.Socket,
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
      throw new Error(e.response.data.message.message);
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
      throw new Error(e.response.data.message.message);
    }
  }

  private async checkIsStorageExists(path: string, typeId: StorageType): Promise<void> {
    try {
      await apiRequest({
        url: `/storages/path/${path}/exists/${typeId}`,
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
    await this.checkIsStorageExists(path, StorageType.FREE);
    return new PublicStorage(path, this.token);
  }

  async getProtectedStorage(path: string, projectAccount: ProjectAccount): Promise<ProtectedStorage> {
    await this.checkIsStorageExists(path, StorageType.PROTECTED);
    return new ProtectedStorage(path, projectAccount.getToken());
  }

  subscribeToStorageChanges(path: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(WsCodes.DATA_CHANGED, (payload: Action) => {
        observer.next(payload);
      });
    });
  }

}