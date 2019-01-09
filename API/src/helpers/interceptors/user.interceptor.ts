import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientsStoreService } from '../../components/core/services/clients-store.service';
import { WsException } from '@nestjs/websockets';
import { Messages } from '../enums/messages.enum';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private readonly clientsStoreService: ClientsStoreService) {}

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Start interceptor');
    const socketContext = context.switchToWs();
    const client = socketContext.getClient();
    const socket = this.clientsStoreService.getSocketById(client.client.id);
    console.log('Inside interceptor', socket);
    if(!socket) {
      throw new WsException(Messages.SOCKET_NOT_FOUND);
    }

    console.log('After interceptor');

    client.user = socket.user;
    return call$;
  }
}