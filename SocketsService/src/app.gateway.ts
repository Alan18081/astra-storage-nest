import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WsException } from '@nestjs/websockets';
import { createClientOptions } from '@astra/common/helpers';
import { CommunicationCodes, Messages, Queues, WsCodes } from '@astra/common/enums';
import { Client, ClientProxy } from '@nestjs/microservices';
import { ClientsStoreService } from './components/core/clients-store.service';

@WebSocketGateway(5001, { namespace: '/' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @Client(createClientOptions(Queues.AUTH_SERVICE))
  private readonly authClient: ClientProxy;

  constructor(
    private readonly clientsStoreService: ClientsStoreService,
  ) {}

  async handleConnection(client: any) {
    try {
      const { token } = client.handshake.query;

      if (!token) {
        client.emit(WsCodes.AUTH_PROJECT_ERROR, new WsException(Messages.INVALID_TOKEN));
        return;
      }

      const user = await this.authClient
        .send({ cmd: CommunicationCodes.AUTH_PROJECT_BY_TOKEN }, { token })
        .toPromise();

      if (!user) {
        client.emit(WsCodes.AUTH_PROJECT_ERROR, new WsException(Messages.USER_NOT_FOUND));
        return;
      }

      this.clientsStoreService.addSocket({
        id: client.id,
        socket: client,
        user,
      });

      client.emit(WsCodes.CONNECTED);
    } catch (e) {
      client.emit(WsCodes.SERVER_ERROR, new WsException(Messages.INTERNAL_SERVER_ERROR));
    }
  }

  async handleDisconnect(client: any) {
    try {
      this.clientsStoreService.removeSocket(client.id);
    } catch (e) {
      client.emit(WsCodes.SERVER_ERROR, new WsException(Messages.INTERNAL_SERVER_ERROR));
    }
  }

}