import { IUser } from '@bit/alan18081.astra-storage.common.dist/entities';

export interface Socket {
  id: string;
  socket: any;
  user: IUser;
}