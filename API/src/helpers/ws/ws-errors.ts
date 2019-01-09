import { Messages } from '../enums/messages.enum';

export const SERVER_ERROR = 'SERVER_ERROR';
export const AUTH_ERROR = 'AUTH_ERROR';

export class WsError {
  error: string;

  constructor(message: Messages) {
    this.error = message;
  }

}
