import { IUser } from '@astra/common/entities';

export interface Socket {
  id: string;
  socket: any;
  user: IUser;
}